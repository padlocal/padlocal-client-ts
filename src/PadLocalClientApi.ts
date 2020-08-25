import * as pb from "./proto/padlocal_pb";
import { Bytes } from "./utils/ByteUtils";
import { requestFileAndUnpack } from "./utils/FileUtils";
import { PadLocalClientPlugin } from "./PadLocalClientPlugin";
import { Contact, ZombieStatue, ZombieTestResponse } from "./proto/padlocal_pb";

export class PadLocalClientApi extends PadLocalClientPlugin {
  async login(loginPolicy: pb.LoginPolicy, callback: LoginCallback): Promise<void> {
    const request = new pb.LoginRequest();
    request.setPolicy(loginPolicy);

    // 10 min timeout
    const grpcClient = this.client.createGrpcClient({
      requestTimeout: 10 * 60 * 1000,
    });

    grpcClient.onMessageCallback = (actionMessage: pb.ActionMessage) => {
      if (actionMessage.getPayloadCase() === pb.ActionMessage.PayloadCase.LOGINUPDATEEVENT) {
        const loginUpdateEvent = actionMessage.getLoginupdateevent()!;
        if (loginUpdateEvent.getStatus() === pb.LoginStatus.START) {
          callback.onLoginStart(loginUpdateEvent.getLogintype());
        } else if (loginUpdateEvent.getStatus() === pb.LoginStatus.ONE_CLICK_EVENT) {
          callback.onOneClickEvent(loginUpdateEvent.getQrcodeevent()!);
        } else if (loginUpdateEvent.getStatus() === pb.LoginStatus.QRCODE_EVENT) {
          callback.onQrCodeEvent(loginUpdateEvent.getQrcodeevent()!);
        } else if (loginUpdateEvent.getStatus() === pb.LoginStatus.AUTH_SUCCESS) {
          const authInfo = loginUpdateEvent.getAuthinfo()!;

          this.client.selfContact = authInfo.getSelfcontact();
          this.client.updateLongLinkHost(authInfo.getLonglinkhost()!);

          callback.onLoginSuccess(this.client.selfContact!);
        } else if (loginUpdateEvent.getStatus() === pb.LoginStatus.SYNC) {
          callback.onSync(loginUpdateEvent.getSyncevent()!);
        }
      }
    };

    await grpcClient.request(request);

    // start long link  after login successfully
    this.client.getLongLinkProxy(true).then();
  }

  async logout(): Promise<pb.LogoutResponse> {
    return this.client.grpcRequest(new pb.LogoutRequest());
  }

  async sendLongLinkHeartBeat(heartBeatSeq: number): Promise<pb.LongLinkHeartBeatResponse> {
    const request = new pb.LongLinkHeartBeatRequest();
    request.setHeartbeatseq(heartBeatSeq);

    return this.client.grpcRequest(new pb.LongLinkHeartBeatRequest().setHeartbeatseq(heartBeatSeq), {
      requestTimeout: 3000, // longlink heart beat require more instantly
    });
  }

  async sync(): Promise<pb.SyncEvent> {
    const response: pb.SyncResponse = await this.client.grpcRequest(new pb.SyncRequest());
    return response.getPayload()!;
  }

  /**
   * @param toUserName
   * @param text
   * @param atList
   * @param idempotentId: id used to forbidden idempotent problem caused by retry.
   * @return
   */
  async sendTextMessage(idempotentId: string, toUserName: string, text: string, atList?: string[]): Promise<string> {
    const sendTextMessageRequest = new pb.SendTextMessageRequest();
    sendTextMessageRequest.setTousername(toUserName).setContent(text);

    if (atList) {
      sendTextMessageRequest.setAtList(atList);
    }

    const response: pb.SendTextMessageResponse = await this.client.grpcRequest(sendTextMessageRequest, {
      idempotentId,
    });

    return response.getMsgid();
  }

  /**
   * @param toUserName
   * @param image
   * @param idempotentId: id used to forbidden idempotent problem caused by retry.
   * @return
   */
  async sendImageMessage(idempotentId: string, toUserName: string, image: Bytes): Promise<string> {
    const response: pb.SendImageMessageResponse = await this.client.grpcRequest(
      new pb.SendImageMessageRequest().setTousername(toUserName).setImage(image),
      {
        idempotentId,
      }
    );

    return response.getMsgid();
  }

  /**
   * @param idempotentId: id used to forbidden idempotent problem caused by retry.
   * @param toUserName
   * @param link
   * @return
   */
  async sendAppMessageLink(idempotentId: string, toUserName: string, link: pb.AppMessageLink): Promise<string> {
    const response: pb.SendAppMessageResponse = await this.client.grpcRequest(
      new pb.SendAppMessageRequest().setTousername(toUserName).setLink(link),
      {
        idempotentId,
      }
    );

    return response.getMsgid();
  }

  async sendAppMessageMiniProgram(
    idempotentId: string,
    toUserName: string,
    miniProgram: pb.AppMessageMiniProgram
  ): Promise<string> {
    const response: pb.SendAppMessageResponse = await this.client.grpcRequest(
      new pb.SendAppMessageRequest().setTousername(toUserName).setMiniprogram(miniProgram),
      {
        idempotentId,
      }
    );

    return response.getMsgid();
  }

  async forwardMessage(
    idempotentId: string,
    toUserName: string,
    messageContent: string,
    messageType: number,
    messageToUserName: string
  ): Promise<string> {
    const response: pb.ForwardMessageResponse = await this.client.grpcRequest(
      new pb.ForwardMessageRequest()
        .setTousername(toUserName)
        .setMessagetype(messageType)
        .setMessagecontent(messageContent)
        .setMessagetousername(messageToUserName),
      {
        idempotentId,
      }
    );
    return response.getMsgid();
  }

  async getMessageImage(
    messageContent: string,
    messageToUserName: string,
    imageType: pb.ImageType
  ): Promise<GetMessageImageResult> {
    const grpcClient = this.client.createGrpcClient();
    const response: pb.GetMessageImageResponse = await grpcClient.request(
      new pb.GetMessageImageRequest()
        .setImagetype(imageType)
        .setMessagecontent(messageContent)
        .setMessagetousername(messageToUserName)
    );

    const imageData: Bytes = await requestFileAndUnpack(response.getFilerequest()!, grpcClient.traceId);

    return {
      imageType: response.getImagetype(),
      imageData,
    };
  }

  async getMessageVoice(messageId: string, messageContent: string, messageToUserName: string): Promise<Bytes> {
    const response: pb.GetMessageVoiceResponse = await this.client.grpcRequest(
      new pb.GetMessageVoiceRequest()
        .setMessageid(messageId)
        .setMessagecontent(messageContent)
        .setMessagetousername(messageToUserName)
    );

    return Buffer.from(response.getVoice());
  }

  async getMessageVideoThumb(messageContent: string, messageToUserName: string): Promise<Bytes> {
    const grpcClient = this.client.createGrpcClient();
    const response: pb.GetMessageVideoThumbResponse = await grpcClient.request(
      new pb.GetMessageVideoThumbRequest().setMessagecontent(messageContent).setMessagetousername(messageToUserName)
    );

    return requestFileAndUnpack(response.getFilerequest()!, grpcClient.traceId);
  }

  async getMessageVideo(messageContent: string, messageToUserName: string): Promise<Bytes> {
    const grpcClient = this.client.createGrpcClient();
    const response: pb.GetMessageVideoResponse = await grpcClient.request(
      new pb.GetMessageVideoRequest().setMessagecontent(messageContent).setMessagetousername(messageToUserName)
    );

    return requestFileAndUnpack(response.getFilerequest()!, grpcClient.traceId);
  }

  async getMessageAttach(messageContent: string, messageToUserName: string): Promise<Bytes> {
    const grpcClient = this.client.createGrpcClient();
    const response: pb.GetMessageAttachResponse = await grpcClient.request(
      new pb.GetMessageAttachRequest().setMessagecontent(messageContent).setMessagetousername(messageToUserName)
    );
    return requestFileAndUnpack(response.getFilerequest()!, grpcClient.traceId);
  }

  async getMessageAttachThumb(messageContent: string, messageToUserName: string): Promise<Bytes> {
    const grpcClient = this.client.createGrpcClient();
    const response: pb.GetMessageAttachThumbResponse = await grpcClient.request(
      new pb.GetMessageAttachThumbRequest().setMessagecontent(messageContent).setMessagetousername(messageToUserName)
    );
    return requestFileAndUnpack(response.getFilerequest()!, grpcClient.traceId);
  }

  /**
   * sync contact is very costly, may be last for minutes, so use wisely.
   * @param callback
   */
  async syncContact(callback: SyncContactCallback): Promise<void> {
    // 10 min timeout
    const grpcClient = this.client.createGrpcClient({
      requestTimeout: 10 * 60 * 1000,
    });

    grpcClient.onMessageCallback = (actionMessage: pb.ActionMessage) => {
      if (actionMessage.getPayloadCase() === pb.ActionMessage.PayloadCase.SYNCEVENT) {
        const syncEvent = actionMessage.getSyncevent()!;
        callback.onSync(syncEvent.getContactList());
      }
    };

    await grpcClient.request(new pb.SyncContactRequest());
  }

  async acceptUser(stranger: string, ticket: string): Promise<void> {
    await this.client.grpcRequest(new pb.AcceptUserRequest().setStranger(stranger).setTicket(ticket));
  }

  async addContact(stranger: string, ticket: string, scene: pb.AddContactScene, hello: string): Promise<void> {
    await this.client.grpcRequest(
      new pb.AddContactRequest().setStranger(stranger).setTicket(ticket).setScene(scene).setContent(hello)
    );
  }

  async deleteContact(userName: string): Promise<void> {
    await this.client.grpcRequest(new pb.DeleteContactRequest().setUsername(userName));
  }

  async getContact(userName: string): Promise<pb.Contact> {
    const response: pb.GetContactResponse = await this.client.grpcRequest(
      new pb.GetContactRequest().setUsername(userName)
    );
    return response.getContact()!;
  }

  async getContactQRCode(userName: string, style: number): Promise<pb.GetContactQRCodeResponse> {
    return this.client.grpcRequest(new pb.GetContactQRCodeRequest().setUsername(userName).setStyle(style));
  }

  async searchContact(userName: string): Promise<pb.SearchContactResponse> {
    return this.client.grpcRequest(new pb.SearchContactRequest().setUsername(userName));
  }

  async updateSelfNickName(nickName: string): Promise<void> {
    await this.client.grpcRequest(new pb.UpdateSelfNickNameRequest().setNickname(nickName));
  }

  async updateSelfSignature(signature: string): Promise<void> {
    await this.client.grpcRequest(new pb.UpdateSelfSignatureRequest().setSignature(signature));
  }

  async zombieTest(userName: string): Promise<ZombieStatue> {
    const response: ZombieTestResponse = await this.client.grpcRequest(
      new pb.ZombieTestRequest().setUsername(userName)
    );
    return response.getZombiestatues();
  }

  async updateContactRemark(userName: string, remark: string): Promise<void> {
    await this.client.grpcRequest(new pb.UpdateContactRemarkRequest().setUsername(userName).setRemark(remark));
  }

  /**
   *
   * @param userNameList
   * @param idempotentId: id used to forbidden idempotent problem caused by retry.
   * @return
   */
  async createChatRoom(idempotentId: string, userNameList: string[]): Promise<pb.CreateChatRoomResponse> {
    return this.client.grpcRequest(new pb.CreateChatRoomRequest().setUsernamesList(userNameList), {
      idempotentId,
    });
  }

  async getChatRoomMembers(roomId: string): Promise<pb.ChatRoomMember[]> {
    const response: pb.GetChatRoomMembersResponse = await this.client.grpcRequest(
      new pb.GetChatRoomMembersRequest().setRoomid(roomId)
    );
    return response.getMemberList();
  }

  async getChatRoomQrCode(roomId: string): Promise<pb.GetChatRoomQrCodeResponse> {
    return this.client.grpcRequest(new pb.GetChatRoomQrCodeRequest().setRoomid(roomId));
  }

  async getChatRoomMember(roomId: string, userName: string): Promise<pb.Contact> {
    const response: pb.GetChatRoomMemberResponse = await this.client.grpcRequest(
      new pb.GetChatRoomMemberRequest().setRoomid(roomId).setUsername(userName)
    );
    return response.getContact()!;
  }

  async setChatRoomAnnouncement(roomId: string, announcement: string): Promise<void> {
    await this.client.grpcRequest(
      new pb.SetChatRoomAnnouncementRequest().setRoomid(roomId).setAnnouncement(announcement)
    );
  }

  async addChatRoomMember(roomId: string, userName: string): Promise<void> {
    await this.client.grpcRequest(new pb.AddChatRoomMemberRequest().setRoomid(roomId).setUsername(userName));
  }

  async inviteChatRoomMember(roomId: string, userName: string): Promise<void> {
    await this.client.grpcRequest(new pb.InviteChatRoomMemberRequest().setRoomid(roomId).setUsername(userName));
  }

  async deleteChatRoomMember(roomId: string, userName: string): Promise<void> {
    await this.client.grpcRequest(new pb.DeleteChatRoomMemberRequest().setRoomid(roomId).setUsername(userName));
  }

  async setChatRoomName(roomId: string, name: string): Promise<void> {
    await this.client.grpcRequest(new pb.SetChatRoomNameRequest().setRoomid(roomId).setName(name));
  }

  async getLabelList(): Promise<pb.Label[]> {
    const response: pb.GetLabelListResponse = await this.client.grpcRequest(new pb.GetLabelListRequest());
    return response.getLabelList();
  }

  async addLabel(label: string): Promise<number> {
    const response: pb.AddLabelResponse = await this.client.grpcRequest(new pb.AddLabelRequest().setLabel(label));
    return response.getLabelid();
  }

  async removeLabel(labelId: number): Promise<void> {
    await this.client.grpcRequest(new pb.RemoveLabelRequest().setLabelid(labelId));
  }

  async setContactLabel(userName: string, labelIdList: number[]): Promise<void> {
    await this.client.grpcRequest(new pb.SetContactLabelRequest().setUsername(userName).setLabelidList(labelIdList));
  }

  /**
   * @param maxId: 0 for the first page
   * @return
   */
  async snsGetTimeline(maxId?: string): Promise<pb.SnsMoment[]> {
    const request = new pb.SnsGetTimelineRequest();
    if (maxId !== undefined) {
      request.setMaxid(maxId);
    }

    const response: pb.SnsGetTimelineResponse = await this.client.grpcRequest(request);
    return response.getMomentList();
  }

  async snsGetUserPage(userName: string, maxId?: string): Promise<pb.SnsMoment[]> {
    const request = new pb.SnsGetUserPageRequest().setUsername(userName);

    if (maxId !== undefined) {
      request.setMaxid(maxId);
    }

    const response: pb.SnsGetUserPageResponse = await this.client.grpcRequest(request);
    return response.getMomentList();
  }

  async snsGetMoment(momentId: string): Promise<pb.SnsMoment> {
    const response: pb.SnsGetMomentResponse = await this.client.grpcRequest(
      new pb.SnsGetMomentRequest().setMomentid(momentId)
    );
    return response.getMoment()!;
  }

  /**
   *
   * @param idempotentId: id used to forbidden idempotent problem caused by retry.
   * @param payload
   * @param options
   * @return
   */
  async snsSendMoment(
    idempotentId: string,
    payload: pb.SnsSendMomentText | pb.SnsSendMomentImages | pb.SnsSendMomentUrl,
    options?: pb.SnsSendMomentOptions
  ): Promise<pb.SnsMoment> {
    const request = new pb.SnsSendMomentRequest();
    if (options) {
      request.setOptions(options);
    }

    if (payload instanceof pb.SnsSendMomentText) {
      request.setText(payload);
    } else if (payload instanceof pb.SnsSendMomentImages) {
      request.setImages(payload);
    } else {
      request.setUrl(payload);
    }

    const response: pb.SnsSendMomentResponse = await this.client.grpcRequest(request, {
      idempotentId,
    });
    return response.getMoment()!;
  }

  async snsForwardMoment(
    idempotentId: string,
    momentContentXml: string,
    options?: pb.SnsSendMomentOptions
  ): Promise<pb.SnsMoment> {
    const request = new pb.SnsForwardMomentRequest().setMomentcontentxml(momentContentXml);

    if (options) {
      request.setOptions(options);
    }

    const response: pb.SnsForwardMomentResponse = await this.client.grpcRequest(request, {
      idempotentId,
    });

    return response.getMoment()!;
  }

  /**
   *
   * @param momentId
   * @param idempotentId: id used to forbidden idempotent problem caused by retry.
   * @param momentOwnerUserName
   * @param commentText
   * @param replyTo
   * @return
   */
  async snsSendComment(
    idempotentId: string,
    momentId: string,
    momentOwnerUserName: string,
    commentText: string,
    replyTo?: pb.SnsSendCommentReplyTo
  ): Promise<pb.SnsMoment> {
    const request = new pb.SnsSendCommentRequest()
      .setMomentid(momentId)
      .setMomentownerusername(momentOwnerUserName)
      .setCommenttext(commentText);

    if (replyTo) {
      request.setReplyto(replyTo);
    }

    const response: pb.SnsSendCommentResponse = await this.client.grpcRequest(request, {
      idempotentId,
    });
    return response.getMoment()!;
  }

  async snsUploadImage(image: Bytes, description?: string): Promise<pb.SnsUploadImageResponse> {
    const request = new pb.SnsUploadImageRequest().setImage(image);

    if (description) {
      request.setDescription(description);
    }

    return this.client.grpcRequest(request);
  }

  async snsLikeMoment(momentId: string, momentOwnerUserName: string): Promise<pb.SnsMoment> {
    const response: pb.SnsLikeMomentResponse = await this.client.grpcRequest(
      new pb.SnsLikeMomentRequest().setMomentid(momentId).setMomentownerusername(momentOwnerUserName)
    );
    return response.getMoment()!;
  }

  async snsUnlikeMoment(momentId: string): Promise<void> {
    await this.client.grpcRequest(new pb.SnsUnlikeMomentRequest().setMomentid(momentId));
  }

  async snsRemoveMomentComment(momentId: string, commentId: string): Promise<void> {
    await this.client.grpcRequest(new pb.SnsRemoveMomentCommentRequest().setMomentid(momentId).setCommentid(commentId));
  }

  async snsMakeMomentPrivate(momentId: string): Promise<void> {
    await this.client.grpcRequest(new pb.SnsMakeMomentPrivateRequest().setMomentid(momentId));
  }

  async snsMakeMomentPublic(momentId: string): Promise<void> {
    await this.client.grpcRequest(new pb.SnsMakeMomentPublicRequest().setMomentid(momentId));
  }

  async snsRemoveMoment(momentId: string): Promise<void> {
    await this.client.grpcRequest(new pb.SnsRemoveMomentRequest().setMomentid(momentId));
  }
}

export interface LoginCallback {
  onLoginStart(loginType: pb.LoginType): void;

  onOneClickEvent(oneClickEvent: pb.QRCodeEvent): void;

  onQrCodeEvent(qrCodeEvent: pb.QRCodeEvent): void;

  onLoginSuccess(contact: Contact): void;

  onSync(syncEvent: pb.SyncEvent): void;
}

export interface SyncContactCallback {
  onSync(contactList: pb.Contact[]): void;
}

export interface GetMessageImageResult {
  readonly imageType: pb.ImageType;
  readonly imageData: Bytes;
}
