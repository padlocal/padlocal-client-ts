import * as pb from "./proto/padlocal_pb";
import { Bytes } from "./utils/ByteUtils";
import { downloadFile, prepareImageUpload } from "./utils/FileUtils";
import { PadLocalClientPlugin } from "./PadLocalClientPlugin";
import { PadLocalClient } from "./PadLocalClient";

function checkRequiredField(field: any, fieldName: string) {
  if (!field) {
    throw new Error(`${fieldName} is required`);
  }
}

export class PadLocalClientApi extends PadLocalClientPlugin {
  private _revokeMessageSeq: number;

  constructor(client: PadLocalClient) {
    super(client);

    this._revokeMessageSeq = 0;
  }

  async login(loginPolicy: pb.LoginPolicy, callback: LoginCallback): Promise<void> {
    const loginRequest = new pb.LoginRequest();
    loginRequest.setPolicy(loginPolicy);

    // 10 min timeout
    const request = this.client.createRequest({
      requestTimeout: 10 * 60 * 1000,
    });

    request.onMessageCallback = (actionMessage: pb.ActionMessage) => {
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

          callback.onLoginSuccess(this.client.selfContact!);
        } else if (loginUpdateEvent.getStatus() === pb.LoginStatus.SYNC) {
          callback.onSync(loginUpdateEvent.getSyncevent()!);
        }
      }
    };

    await request.request(loginRequest);
  }

  async logout(): Promise<pb.LogoutResponse> {
    return this.client.request(new pb.LogoutRequest());
  }

  async sync(): Promise<pb.SyncEvent> {
    const response: pb.SyncResponse = await this.client.request(new pb.SyncRequest());
    return response.getPayload()!;
  }

  /**
   * @param toUserName
   * @param text
   * @param atList
   * @param idempotentId: id used to forbidden idempotent problem caused by retry.
   * @return
   */
  async sendTextMessage(
    idempotentId: string,
    toUserName: string,
    text: string,
    atList?: string[]
  ): Promise<pb.SendTextMessageResponse> {
    checkRequiredField(idempotentId, "idempotentId");
    checkRequiredField(toUserName, "toUserName");
    checkRequiredField(text, "text");

    const sendTextMessageRequest = new pb.SendTextMessageRequest();
    sendTextMessageRequest.setTousername(toUserName).setContent(text);

    if (atList) {
      sendTextMessageRequest.setAtList(atList);
    }

    return await this.client.request(sendTextMessageRequest, {
      idempotentId,
    });
  }

  /**
   * @param toUserName
   * @param image
   * @param idempotentId: id used to forbidden idempotent problem caused by retry.
   * @return
   */
  async sendImageMessage(idempotentId: string, toUserName: string, image: Bytes): Promise<pb.SendImageMessageResponse> {
    checkRequiredField(idempotentId, "idempotentId");
    checkRequiredField(toUserName, "toUserName");
    checkRequiredField(image.length, "image");

    const imageUpload = await prepareImageUpload(image);

    const request = this.client.createRequest({
      idempotentId,
    });

    request.extraData = {
      fileUploadStreamHandlerParams: {
        aesKey: imageUpload.aesKey,
        dataBag: imageUpload.dataBag,
      },
    };

    return await request.request(
      new pb.SendImageMessageRequest().setTousername(toUserName).setImageparams(imageUpload.params)
    );
  }

  /**
   *
   * @param idempotentId
   * @param toUserName
   * @param voice
   * @param voiceLength: voice length show to receiver, in milliseconds
   */
  async sendVoiceMessage(
    idempotentId: string,
    toUserName: string,
    voice: Bytes,
    voiceLength: number
  ): Promise<pb.SendVoiceMessageResponse> {
    checkRequiredField(idempotentId, "idempotentId");
    checkRequiredField(toUserName, "toUserName");
    checkRequiredField(voice.length, "voice");
    checkRequiredField(voiceLength, "voiceLength");

    return await this.client.request(
      new pb.SendVoiceMessageRequest().setTousername(toUserName).setVoice(voice).setVoicelength(voiceLength),
      {
        idempotentId,
      }
    );
  }

  async sendVideoMessage(idempotentId: string, toUserName: string, video: Bytes): Promise<pb.SendVideoMessageResponse> {
    checkRequiredField(idempotentId, "idempotentId");
    checkRequiredField(toUserName, "toUserName");
    checkRequiredField(video.length, "video");

    return await this.client.request(new pb.SendVideoMessageRequest().setTousername(toUserName).setVideo(video), {
      idempotentId,
    });
  }

  async sendFileMessage(
    idempotentId: string,
    toUserName: string,
    file: Bytes,
    fileName: string
  ): Promise<pb.SendFileMessageResponse> {
    checkRequiredField(idempotentId, "idempotentId");
    checkRequiredField(toUserName, "toUserName");
    checkRequiredField(file.length, "file");
    checkRequiredField(fileName, "fileName");

    return await this.client.request(
      new pb.SendFileMessageRequest().setTousername(toUserName).setFile(file).setFilename(fileName),
      {
        idempotentId,
      }
    );
  }

  /**
   * @param idempotentId: id used to forbidden idempotent problem caused by retry.
   * @param toUserName
   * @param link
   * @return
   */
  async sendMessageLink(
    idempotentId: string,
    toUserName: string,
    link: pb.AppMessageLink
  ): Promise<pb.SendAppMessageResponse> {
    checkRequiredField(idempotentId, "idempotentId");
    checkRequiredField(toUserName, "toUserName");

    return await this.client.request(new pb.SendAppMessageRequest().setTousername(toUserName).setLink(link), {
      idempotentId,
    });
  }

  async sendMessageMiniProgram(
    idempotentId: string,
    toUserName: string,
    miniProgram: pb.AppMessageMiniProgram
  ): Promise<pb.SendAppMessageResponse> {
    checkRequiredField(idempotentId, "idempotentId");
    checkRequiredField(toUserName, "toUserName");

    return await this.client.request(
      new pb.SendAppMessageRequest().setTousername(toUserName).setMiniprogram(miniProgram),
      {
        idempotentId,
      }
    );
  }

  async sendContactCardMessage(
    idempotentId: string,
    toUserName: string,
    contact: pb.Contact
  ): Promise<pb.SendContactCardMessageResponse> {
    checkRequiredField(idempotentId, "idempotentId");
    checkRequiredField(toUserName, "toUserName");

    return await this.client.request(
      new pb.SendContactCardMessageRequest().setTousername(toUserName).setContact(contact),
      {
        idempotentId,
      }
    );
  }

  async sendMessageEmoji(
    idempotentId: string,
    toUserName: string,
    md5: string,
    len: number,
    type?: number,
    gameExt?: string
  ): Promise<pb.SendEmojiMessageResponse> {
    const request = new pb.SendEmojiMessageRequest().setTousername(toUserName).setMd5(md5).setLen(len);

    if (type != undefined) {
      request.setType(type);
    }

    if (gameExt != undefined) {
      request.setGameext(gameExt);
    }

    return await this.client.request(request, {
      idempotentId,
    });
  }

  async forwardMessage(
    idempotentId: string,
    toUserName: string,
    messageContent: string,
    messageType: number,
    messageToUserName: string
  ): Promise<pb.ForwardMessageResponse> {
    checkRequiredField(idempotentId, "idempotentId");
    checkRequiredField(toUserName, "toUserName");
    checkRequiredField(messageContent, "messageContent");
    checkRequiredField(messageToUserName, "messageToUserName");

    return await this.client.request(
      new pb.ForwardMessageRequest()
        .setTousername(toUserName)
        .setMessagetype(messageType)
        .setMessagecontent(messageContent)
        .setMessagetousername(messageToUserName),
      {
        idempotentId,
      }
    );
  }

  async getMessageImage(
    messageContent: string,
    messageToUserName: string,
    imageType: pb.ImageType
  ): Promise<GetMessageImageResult> {
    checkRequiredField(messageContent, "messageContent");
    checkRequiredField(messageToUserName, "messageToUserName");

    const request = this.client.createRequest();
    const response: pb.GetMessageImageResponse = await request.request(
      new pb.GetMessageImageRequest()
        .setImagetype(imageType)
        .setMessagecontent(messageContent)
        .setMessagetousername(messageToUserName)
    );

    const imageData: Bytes = await downloadFile(response.getFiledownloadrequest()!, request.traceId);

    return {
      imageType: response.getImagetype(),
      imageData,
    };
  }

  async getMessageVoice(messageId: string, messageContent: string, messageToUserName: string): Promise<Bytes> {
    checkRequiredField(messageId, "messageId");
    checkRequiredField(messageContent, "messageContent");
    checkRequiredField(messageToUserName, "messageToUserName");

    const response: pb.GetMessageVoiceResponse = await this.client.request(
      new pb.GetMessageVoiceRequest()
        .setMessageid(messageId)
        .setMessagecontent(messageContent)
        .setMessagetousername(messageToUserName)
    );

    return Buffer.from(response.getVoice());
  }

  async getMessageVideoThumb(messageContent: string, messageToUserName: string): Promise<Bytes> {
    checkRequiredField(messageContent, "messageContent");
    checkRequiredField(messageToUserName, "messageToUserName");

    const request = this.client.createRequest();
    const response: pb.GetMessageVideoThumbResponse = await request.request(
      new pb.GetMessageVideoThumbRequest().setMessagecontent(messageContent).setMessagetousername(messageToUserName)
    );

    return downloadFile(response.getFiledownloadrequest()!, request.traceId);
  }

  async getMessageVideo(messageContent: string, messageToUserName: string): Promise<Bytes> {
    checkRequiredField(messageContent, "messageContent");
    checkRequiredField(messageToUserName, "messageToUserName");

    const request = this.client.createRequest();
    const response: pb.GetMessageVideoResponse = await request.request(
      new pb.GetMessageVideoRequest().setMessagecontent(messageContent).setMessagetousername(messageToUserName)
    );

    return downloadFile(response.getFiledownloadrequest()!, request.traceId);
  }

  async getMessageAttach(messageContent: string, messageToUserName: string): Promise<Bytes> {
    checkRequiredField(messageContent, "messageContent");
    checkRequiredField(messageToUserName, "messageToUserName");

    const request = this.client.createRequest();
    const response: pb.GetMessageAttachResponse = await request.request(
      new pb.GetMessageAttachRequest().setMessagecontent(messageContent).setMessagetousername(messageToUserName)
    );
    return downloadFile(response.getFiledownloadrequest()!, request.traceId);
  }

  async getMessageAttachThumb(messageContent: string, messageToUserName: string): Promise<Bytes> {
    checkRequiredField(messageContent, "messageContent");
    checkRequiredField(messageToUserName, "messageToUserName");

    const request = this.client.createRequest();
    const response: pb.GetMessageAttachThumbResponse = await request.request(
      new pb.GetMessageAttachThumbRequest().setMessagecontent(messageContent).setMessagetousername(messageToUserName)
    );
    return downloadFile(response.getFiledownloadrequest()!, request.traceId);
  }

  async getMessageMiniProgramThumb(messageContent: string, messageToUserName: string): Promise<Bytes> {
    checkRequiredField(messageContent, "messageContent");
    checkRequiredField(messageToUserName, "messageToUserName");

    const request = this.client.createRequest();
    const response: pb.GetMessageMiniProgramThumbResponse = await request.request(
      new pb.GetMessageMiniProgramThumbRequest()
        .setMessagecontent(messageContent)
        .setMessagetousername(messageToUserName)
    );
    return downloadFile(response.getFiledownloadrequest()!, request.traceId);
  }

  async getEncryptedFile(
    fileType: pb.EncryptedFileType,
    fileId: string,
    fileKey: Bytes,
    isChatRoomMessage?: boolean
  ): Promise<Bytes> {
    checkRequiredField(fileId, "fileId");
    checkRequiredField(fileKey.length, "fileKey");

    const getEncryptedFileRequest = new pb.GetEncryptedFileRequest()
      .setFileid(fileId)
      .setFilekey(fileKey)
      .setFiletype(fileType);

    if (isChatRoomMessage !== undefined) {
      getEncryptedFileRequest.setIschatroommessage(isChatRoomMessage);
    }

    const request = this.client.createRequest();

    const response: pb.GetEncryptedFileResponse = await request.request(getEncryptedFileRequest);
    return downloadFile(response.getFiledownloadrequest()!, request.traceId);
  }

  async revokeMessage(
    msgId: string,
    fromUserName: string,
    toUserName: string,
    messageRevokeInfo: pb.MessageRevokeInfo
  ): Promise<void> {
    checkRequiredField(msgId, "msgId");
    checkRequiredField(fromUserName, "fromUserName");
    checkRequiredField(toUserName, "toUserName");

    const request = new pb.RevokeMessageRequest()
      .setMsgid(msgId)
      .setMessagerevokeinfo(messageRevokeInfo)
      .setFromusername(fromUserName)
      .setTousername(toUserName)
      .setRevokeseq(this._revokeMessageSeq++);
    await this.client.request(request);
  }

  /**
   * sync contact is very costly, may be last for minutes, so use wisely.
   * @param callback
   */
  async syncContact(callback: SyncContactCallback): Promise<void> {
    // 10 min timeout
    const request = this.client.createRequest({
      requestTimeout: 10 * 60 * 1000,
    });

    request.onMessageCallback = (actionMessage: pb.ActionMessage) => {
      if (actionMessage.getPayloadCase() === pb.ActionMessage.PayloadCase.SYNCEVENT) {
        const syncEvent = actionMessage.getSyncevent()!;
        callback.onSync(syncEvent.getContactList());
      }
    };

    await request.request(new pb.SyncContactRequest());
  }

  async acceptUser(userName: string, ticket: string, stranger?: string): Promise<void> {
    checkRequiredField(userName, "userName");
    checkRequiredField(ticket, "ticket");

    const request = new pb.AcceptUserRequest().setUsername(userName).setTicket(ticket);
    if (stranger) {
      request.setStranger(stranger);
    }

    await this.client.request(request);
  }

  async addContact(stranger: string, ticket: string, scene: pb.AddContactScene, hello: string): Promise<void> {
    checkRequiredField(stranger, "stranger");
    checkRequiredField(ticket, "ticket");

    await this.client.request(
      new pb.AddContactRequest().setStranger(stranger).setTicket(ticket).setScene(scene).setContent(hello)
    );
  }

  async deleteContact(userName: string): Promise<void> {
    checkRequiredField(userName, "userName");

    await this.client.request(new pb.DeleteContactRequest().setUsername(userName));
  }

  async getContact(userName: string, ticket?: string): Promise<pb.Contact> {
    checkRequiredField(userName, "userName");

    const request = new pb.GetContactRequest().setUsername(userName);
    if (ticket) {
      request.setTicket(ticket);
    }

    const response: pb.GetContactResponse = await this.client.request(request);
    return response.getContact()!;
  }

  async getContactQRCode(userName: string, style: number): Promise<pb.GetContactQRCodeResponse> {
    checkRequiredField(userName, "userName");

    return this.client.request(new pb.GetContactQRCodeRequest().setUsername(userName).setStyle(style));
  }

  async searchContact(userName: string): Promise<pb.SearchContactResponse> {
    checkRequiredField(userName, "userName");

    return this.client.request(new pb.SearchContactRequest().setUsername(userName));
  }

  async updateSelfNickName(nickName: string): Promise<void> {
    checkRequiredField(nickName, "nickName");

    await this.client.request(new pb.UpdateSelfNickNameRequest().setNickname(nickName));
  }

  async updateSelfSignature(signature: string): Promise<void> {
    await this.client.request(new pb.UpdateSelfSignatureRequest().setSignature(signature));
  }

  async zombieTest(userName: string): Promise<pb.ZombieStatue> {
    checkRequiredField(userName, "userName");

    const response: pb.ZombieTestResponse = await this.client.request(new pb.ZombieTestRequest().setUsername(userName));
    return response.getZombiestatues();
  }

  async updateContactRemark(userName: string, remark: string): Promise<void> {
    checkRequiredField(userName, "userName");

    await this.client.request(new pb.UpdateContactRemarkRequest().setUsername(userName).setRemark(remark));
  }

  /**
   *
   * @param userNameList
   * @param idempotentId: id used to forbidden idempotent problem caused by retry.
   * @return
   */
  async createChatRoom(idempotentId: string, userNameList: string[]): Promise<pb.CreateChatRoomResponse> {
    checkRequiredField(idempotentId, "idempotentId");
    checkRequiredField(userNameList.length, "userNameList");

    return this.client.request(new pb.CreateChatRoomRequest().setUsernamesList(userNameList), {
      idempotentId,
    });
  }

  async getChatRoomMembers(roomId: string): Promise<pb.ChatRoomMember[]> {
    checkRequiredField(roomId, "roomId");

    const response: pb.GetChatRoomMembersResponse = await this.client.request(
      new pb.GetChatRoomMembersRequest().setRoomid(roomId)
    );
    return response.getMemberList();
  }

  async getChatRoomQrCode(roomId: string): Promise<pb.GetChatRoomQrCodeResponse> {
    checkRequiredField(roomId, "roomId");

    return this.client.request(new pb.GetChatRoomQrCodeRequest().setRoomid(roomId));
  }

  async getChatRoomMember(roomId: string, userName: string): Promise<pb.Contact> {
    checkRequiredField(roomId, "roomId");
    checkRequiredField(userName, "userName");

    const response: pb.GetChatRoomMemberResponse = await this.client.request(
      new pb.GetChatRoomMemberRequest().setRoomid(roomId).setUsername(userName)
    );
    return response.getContact()!;
  }

  async getChatRoomAnnouncement(roomId: string): Promise<string> {
    checkRequiredField(roomId, "roomId");

    const response: pb.GetChatRoomAnnouncementResponse = await this.client.request(
      new pb.GetChatRoomAnnouncementRequest().setRoomid(roomId)
    );

    return response.getAnnouncement();
  }

  async setChatRoomAnnouncement(roomId: string, announcement: string): Promise<void> {
    checkRequiredField(roomId, "roomId");

    await this.client.request(new pb.SetChatRoomAnnouncementRequest().setRoomid(roomId).setAnnouncement(announcement));
  }

  async addChatRoomMember(roomId: string, userName: string): Promise<void> {
    checkRequiredField(roomId, "roomId");
    checkRequiredField(userName, "userName");

    await this.client.request(new pb.AddChatRoomMemberRequest().setRoomid(roomId).setUsername(userName));
  }

  async inviteChatRoomMember(roomId: string, userName: string): Promise<void> {
    checkRequiredField(roomId, "roomId");
    checkRequiredField(userName, "userName");

    await this.client.request(new pb.InviteChatRoomMemberRequest().setRoomid(roomId).setUsername(userName));
  }

  async deleteChatRoomMember(roomId: string, userName: string): Promise<void> {
    checkRequiredField(roomId, "roomId");
    checkRequiredField(userName, "userName");

    await this.client.request(new pb.DeleteChatRoomMemberRequest().setRoomid(roomId).setUsername(userName));
  }

  async setChatRoomName(roomId: string, name: string): Promise<void> {
    checkRequiredField(roomId, "roomId");

    await this.client.request(new pb.SetChatRoomNameRequest().setRoomid(roomId).setName(name));
  }

  async quitChatRoom(roomId: string): Promise<void> {
    checkRequiredField(roomId, "roomId");

    await this.client.request(new pb.QuitChatRoomRequest().setRoomid(roomId));
  }

  async getLabelList(): Promise<pb.Label[]> {
    const response: pb.GetLabelListResponse = await this.client.request(new pb.GetLabelListRequest());
    return response.getLabelList();
  }

  async addLabel(label: string): Promise<number> {
    checkRequiredField(label, "label");

    const response: pb.AddLabelResponse = await this.client.request(new pb.AddLabelRequest().setLabel(label));
    return response.getLabelid();
  }

  async removeLabel(labelId: number): Promise<void> {
    await this.client.request(new pb.RemoveLabelRequest().setLabelid(labelId));
  }

  async setContactLabel(userName: string, labelIdList: number[]): Promise<void> {
    checkRequiredField(userName, "userName");

    await this.client.request(new pb.SetContactLabelRequest().setUsername(userName).setLabelidList(labelIdList));
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

    const response: pb.SnsGetTimelineResponse = await this.client.request(request);
    return response.getMomentList();
  }

  async snsGetUserPage(userName: string, maxId?: string): Promise<pb.SnsMoment[]> {
    checkRequiredField(userName, "userName");

    const request = new pb.SnsGetUserPageRequest().setUsername(userName);

    if (maxId !== undefined) {
      request.setMaxid(maxId);
    }

    const response: pb.SnsGetUserPageResponse = await this.client.request(request);
    return response.getMomentList();
  }

  async snsGetMoment(momentId: string): Promise<pb.SnsMoment> {
    checkRequiredField(momentId, "momentId");

    const response: pb.SnsGetMomentResponse = await this.client.request(
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
    checkRequiredField(idempotentId, "idempotentId");

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

    const response: pb.SnsSendMomentResponse = await this.client.request(request, {
      idempotentId,
    });
    return response.getMoment()!;
  }

  async snsForwardMoment(
    idempotentId: string,
    momentContentXml: string,
    options?: pb.SnsSendMomentOptions
  ): Promise<pb.SnsMoment> {
    checkRequiredField(idempotentId, "idempotentId");
    checkRequiredField(momentContentXml, "momentContentXml");

    const request = new pb.SnsForwardMomentRequest().setMomentcontentxml(momentContentXml);

    if (options) {
      request.setOptions(options);
    }

    const response: pb.SnsForwardMomentResponse = await this.client.request(request, {
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
    checkRequiredField(idempotentId, "idempotentId");
    checkRequiredField(momentId, "momentId");
    checkRequiredField(momentOwnerUserName, "momentOwnerUserName");
    checkRequiredField(commentText, "commentText");

    const request = new pb.SnsSendCommentRequest()
      .setMomentid(momentId)
      .setMomentownerusername(momentOwnerUserName)
      .setCommenttext(commentText);

    if (replyTo) {
      request.setReplyto(replyTo);
    }

    const response: pb.SnsSendCommentResponse = await this.client.request(request, {
      idempotentId,
    });
    return response.getMoment()!;
  }

  async snsUploadImage(image: Bytes, description?: string): Promise<pb.SnsUploadImageResponse> {
    const request = new pb.SnsUploadImageRequest().setImage(image);

    if (description) {
      request.setDescription(description);
    }

    return this.client.request(request);
  }

  async snsLikeMoment(momentId: string, momentOwnerUserName: string): Promise<pb.SnsMoment> {
    checkRequiredField(momentId, "momentId");
    checkRequiredField(momentOwnerUserName, "momentOwnerUserName");

    const response: pb.SnsLikeMomentResponse = await this.client.request(
      new pb.SnsLikeMomentRequest().setMomentid(momentId).setMomentownerusername(momentOwnerUserName)
    );
    return response.getMoment()!;
  }

  async snsUnlikeMoment(momentId: string): Promise<void> {
    checkRequiredField(momentId, "momentId");

    await this.client.request(new pb.SnsUnlikeMomentRequest().setMomentid(momentId));
  }

  async snsRemoveMomentComment(momentId: string, commentId: string): Promise<void> {
    checkRequiredField(momentId, "momentId");
    checkRequiredField(commentId, "commentId");

    await this.client.request(new pb.SnsRemoveMomentCommentRequest().setMomentid(momentId).setCommentid(commentId));
  }

  async snsMakeMomentPrivate(momentId: string): Promise<void> {
    checkRequiredField(momentId, "momentId");

    await this.client.request(new pb.SnsMakeMomentPrivateRequest().setMomentid(momentId));
  }

  async snsMakeMomentPublic(momentId: string): Promise<void> {
    checkRequiredField(momentId, "momentId");

    await this.client.request(new pb.SnsMakeMomentPublicRequest().setMomentid(momentId));
  }

  async snsRemoveMoment(momentId: string): Promise<void> {
    checkRequiredField(momentId, "momentId");

    await this.client.request(new pb.SnsRemoveMomentRequest().setMomentid(momentId));
  }
}

export interface LoginCallback {
  onLoginStart(loginType: pb.LoginType): void;

  onOneClickEvent(oneClickEvent: pb.QRCodeEvent): void;

  onQrCodeEvent(qrCodeEvent: pb.QRCodeEvent): void;

  onLoginSuccess(contact: pb.Contact): void;

  onSync(syncEvent: pb.SyncEvent): void;
}

export interface SyncContactCallback {
  onSync(contactList: pb.Contact[]): void;
}

export interface GetMessageImageResult {
  readonly imageType: pb.ImageType;
  readonly imageData: Bytes;
}
