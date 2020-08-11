import VError from "verror";
import { LoginPolicy, LoginRequest, ActionMessage, LoginStatus, LogoutResponse, LogoutRequest, LongLinkHeartBeatResponse, LongLinkHeartBeatRequest, SyncEvent, SyncRequest, SyncResponse, SendTextMessageRequest, SendTextMessageResponse, SendImageMessageRequest, SendImageMessageResponse, AppMessageLink, SendAppMessageRequest, SendAppMessageResponse, AppMessageMiniProgram, Message, ForwardMessageResponse, ForwardMessageRequest, AcceptUserRequest, AddContactScene, AddContactRequest, DeleteContactRequest, Contact, GetContactResponse, GetContactRequest, GetContactQRCodeResponse, GetContactQRCodeRequest, SearchContactResponse, SearchContactRequest, CreateChatRoomResponse, CreateChatRoomRequest, ChatRoomMember, GetChatRoomMembersRequest, GetChatRoomMembersResponse, GetChatRoomQrCodeResponse, GetChatRoomQrCodeRequest, GetChatRoomMemberResponse, GetChatRoomMemberRequest, SetChatRoomAnnouncementRequest, AddChatRoomMemberRequest, InviteChatRoomMemberRequest, DeleteChatRoomMemberRequest, SetChatRoomNameRequest, Label, GetLabelListResponse, GetLabelListRequest, Moment, SnsSendMomentResponse, SnsSendMomentRequest, SnsGetUserPageResponse, SnsGetUserPageRequest, SnsSendCommentResponse, SnsSendCommentRequest, SnsUploadImageResponse, SnsUploadImageRequest, SnsGetTimelineResponse, SnsGetTimelineRequest, SnsGetMomentResponse, SnsGetMomentRequest, SnsLikeMomentResponse, SnsLikeMomentRequest, SnsUnlikeMomentRequest, SnsRemoveMomentCommentRequest, SnsMakeMomentPrivateRequest, SnsMakeMomentPublicRequest, SnsRemoveMomentRequest, AddLabelResponse, AddLabelRequest, RemoveLabelRequest, SetContactLabelRequest, ImageType, LoginType, QRCodeEvent, GetMessageImageResponse, GetMessageImageRequest, GetMessageVoiceRequest, GetMessageVoiceResponse, GetMessageVideoThumbResponse, GetMessageVideoThumbRequest, GetMessageVideoResponse, GetMessageVideoRequest, GetMessageFileResponse, GetMessageFileRequest, SyncContactRequest } from "./proto/padlocal_pb";
import { Bytes, ByteUtils } from "./utils/ByteUtils";
import { CdnUtils } from "./wechat/CdnUtils";
import { PadLocalClientPlugin } from "./PadLocalClientPlugin";

export class PadLocalClientApi extends PadLocalClientPlugin {
    async login(loginPolicy: LoginPolicy, callback: PadLocalClientApi.LoginCallback): Promise<void> {
        const request = new LoginRequest();
        request.setPolicy(loginPolicy);

        // 10 min timeout
        const grpcClient = this.client.createGrpcClient({ requestTimeout: 10 * 60 * 1000 });

        grpcClient.onMessageCallback = (actionMessage: ActionMessage) => {
            if (actionMessage.getPayloadCase() == ActionMessage.PayloadCase.LOGINUPDATEEVENT) {
                const loginUpdateEvent = actionMessage.getLoginupdateevent()!;
                if (loginUpdateEvent.getStatus() == LoginStatus.START) {
                    callback.onLoginStart(loginUpdateEvent.getLogintype());
                }
                else if (loginUpdateEvent.getStatus() == LoginStatus.ONE_CLICK_EVENT) {
                    callback.onOneClickEvent(loginUpdateEvent.getQrcodeevent()!);
                }
                else if (loginUpdateEvent.getStatus() == LoginStatus.QRCODE_EVENT) {
                    callback.onQrCodeEvent(loginUpdateEvent.getQrcodeevent()!);
                }
                else if (loginUpdateEvent.getStatus() == LoginStatus.AUTH_SUCCESS) {
                    const authInfo = loginUpdateEvent.getAuthinfo()!;

                    this.client.selfContact = authInfo.getSelfcontact();
                    this.client.updateLongLinkHost(authInfo.getLonglinkhost()!);
                }
                else if (loginUpdateEvent.getStatus() == LoginStatus.SYNC) {
                    callback.onSync(loginUpdateEvent.getSyncevent()!);
                }
            }
        }

        await grpcClient.request(request);

        // start long link  after login successfullly
        this.client.getLongLinkProxy(true);
    }

    async logout(): Promise<LogoutResponse> {
        return this.client.grpcRequest(new LogoutRequest());
    }

    async sendLongLinkHeartBeat(heartBeatSeq: number): Promise<LongLinkHeartBeatResponse> {
        const request = new LongLinkHeartBeatRequest();
        request.setHeartbeatseq(heartBeatSeq);

        return this.client.grpcRequest(
            new LongLinkHeartBeatRequest().setHeartbeatseq(heartBeatSeq),
            {
                requestTimeout: 3000 // longlink heart beat require more instancy
            }
        );
    }

    async sync(): Promise<SyncEvent> {
        const response: SyncResponse = await this.client.grpcRequest(new SyncRequest());
        return response.getPayload()!;
    }

    /**
     * @param toUserName
     * @param text
     * @param atList
     * @param idempotentId: id used to forbidden idempotent problem caused by retry.
     * @return
     */
    async sendTextMessage(idempotentId: string, toUserName: string, text: string, atList?: Array<string>): Promise<string> {
        const sendTextMessageRequest = new SendTextMessageRequest();
        sendTextMessageRequest.setTousername(toUserName).setContent(text);

        if (atList) {
            sendTextMessageRequest.setAtList(atList);
        }

        const response: SendTextMessageResponse = await this.client.grpcRequest(
            sendTextMessageRequest,
            {
                idempotentId
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
        const response: SendImageMessageResponse = await this.client.grpcRequest(
            new SendImageMessageRequest()
                .setTousername(toUserName)
                .setImage(image),
            {
                idempotentId
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
    async sendAppMessageLink(idempotentId: string, toUserName: string, link: AppMessageLink): Promise<string> {
        const response: SendAppMessageResponse = await this.client.grpcRequest(
            new SendAppMessageRequest()
                .setTousername(toUserName)
                .setLink(link),
            {
                idempotentId
            }
        );

        return response.getMsgid();
    }

    async sendAppMessageMiniProgram(idempotentId: string, toUserName: string, miniProgram: AppMessageMiniProgram): Promise<string> {
        const response: SendAppMessageResponse = await this.client.grpcRequest(
            new SendAppMessageRequest()
                .setTousername(toUserName)
                .setMiniprogram(miniProgram),
            {
                idempotentId
            }
        );

        return response.getMsgid();
    }

    async forwardMessage(idempotentId: string, toUserName: string, message: Message): Promise<string> {
        const response: ForwardMessageResponse = await this.client.grpcRequest(
            new ForwardMessageRequest()
                .setTousername(toUserName)
                .setMessage(message),
            {
                idempotentId
            }
        );
        return response.getMsgid();
    }

    async acceptUser(stranger: string, ticket: string): Promise<void> {
        await this.client.grpcRequest(
            new AcceptUserRequest()
                .setStranger(stranger)
                .setTicket(ticket)
        );
    }

    async addContact(stranger: string, ticket: string, scene: AddContactScene, hello: string): Promise<void> {
        await this.client.grpcRequest(
            new AddContactRequest()
                .setStranger(stranger)
                .setTicket(ticket)
                .setScene(scene)
                .setContent(hello)
        );
    }

    async deleteContact(userName: string): Promise<void> {
        await this.client.grpcRequest(
            new DeleteContactRequest()
                .setUsername(userName)
        );
    }

    async getContact(userName: string): Promise<Contact> {
        const response: GetContactResponse = await this.client.grpcRequest(
            new GetContactRequest()
                .setUsername(userName)
        );
        return response.getContact()!;
    }

    async getContactQRCode(userName: string, style: number): Promise<GetContactQRCodeResponse> {
        return this.client.grpcRequest(
            new GetContactQRCodeRequest()
                .setUsername(userName)
                .setStyle(style)
        );
    }

    async searchContact(userName: string): Promise<SearchContactResponse> {
        return await this.client.grpcRequest(
            new SearchContactRequest()
                .setUsername(userName)
        );
    }

    /**
     *
     * @param userNameList
     * @param idempotentId: id used to forbidden idempotent problem caused by retry.
     * @return
     */
    async createChatRoom(idempotentId: string, userNameList: Array<string>): Promise<CreateChatRoomResponse> {
        return await this.client.grpcRequest(
            new CreateChatRoomRequest()
                .setUsernamesList(userNameList),
            {
                idempotentId
            }
        );
    }

    async getChatRoomMembers(roomId: string): Promise<Array<ChatRoomMember>> {
        const response: GetChatRoomMembersResponse = await this.client.grpcRequest(
            new GetChatRoomMembersRequest()
                .setRoomid(roomId)
        );
        return response.getMemberList();
    }

    async getChatRoomQrCode(roomId: string): Promise<GetChatRoomQrCodeResponse> {
        return await this.client.grpcRequest(
            new GetChatRoomQrCodeRequest()
                .setRoomid(roomId)
        );
    }

    async getChatRoomMember(roomId: string, userName: string): Promise<Contact> {
        const response: GetChatRoomMemberResponse = await this.client.grpcRequest(
            new GetChatRoomMemberRequest()
                .setRoomid(roomId)
                .setUsername(userName)
        );
        return response.getContact()!;
    }

    async setChatRoomAnnouncement(roomId: string, announcement: string): Promise<void> {
        await this.client.grpcRequest(
            new SetChatRoomAnnouncementRequest()
                .setRoomid(roomId)
                .setAnnouncement(announcement)
        );
    }

    async addChatRoomMember(roomId: string, userName: string): Promise<void> {
        await this.client.grpcRequest(
            new AddChatRoomMemberRequest()
                .setRoomid(roomId)
                .setUsername(userName)
        );
    }

    async inviteChatRoomMember(roomId: string, userName: string): Promise<void> {
        await this.client.grpcRequest(
            new InviteChatRoomMemberRequest()
                .setRoomid(roomId)
                .setUsername(userName)
        );
    }

    async deleteChatRoomMember(roomId: string, userName: string): Promise<void> {
        await this.client.grpcRequest(
            new DeleteChatRoomMemberRequest()
                .setRoomid(roomId)
                .setUsername(userName)
        );
    }

    async setChatRoomName(roomId: string, name: string): Promise<void> {
        await this.client.grpcRequest(
            new SetChatRoomNameRequest()
                .setRoomid(roomId)
                .setName(name)
        );
    }

    async getLabelList(): Promise<Array<Label>> {
        const response: GetLabelListResponse = await this.client.grpcRequest(
            new GetLabelListRequest()
        );
        return response.getLabelList();
    }

    /**
     *
     * @param momentXML
     * @param idempotentId: id used to forbidden idempotent problem caused by retry.
     * @return
     */
    async snsSendMoment(idempotentId: string, momentXML: string): Promise<Moment> {
        const response: SnsSendMomentResponse = await this.client.grpcRequest(
            new SnsSendMomentRequest()
                .setPayloadxml(momentXML),
            {
                idempotentId
            }
        );
        return response.getMoment()!;
    }

    async snsGetUserPage(userName: string, maxId: number): Promise<Array<Moment>> {
        const response: SnsGetUserPageResponse = await this.client.grpcRequest(
            new SnsGetUserPageRequest()
                .setUsername(userName)
                .setMaxid(maxId),
        );
        return response.getMomentList();
    }

    /**
     *
     * @param userName
     * @param momentId
     * @param text
     * @param idempotentId: id used to forbidden idempotent problem caused by retry.
     * @return
     */
    async snsSendComment(idempotentId: string, userName: string, momentId: string, text: string): Promise<Moment> {
        const response: SnsSendCommentResponse = await this.client.grpcRequest(
            new SnsSendCommentRequest()
                .setUsername(userName)
                .setMomentid(momentId)
                .setText(text),
            {
                idempotentId
            }
        );
        return response.getMoment()!;
    }

    async snsUploadImage(image: Bytes): Promise<SnsUploadImageResponse> {
        return await this.client.grpcRequest(
            new SnsUploadImageRequest()
                .setImage(image)
        );
    }

    /**
     * @param maxId: 0 for the first page
     * @return
     */
    async snsGetTimeline(maxId: number): Promise<Array<Moment>> {
        const response: SnsGetTimelineResponse = await this.client.grpcRequest(
            new SnsGetTimelineRequest()
                .setMaxid(maxId)
        );
        return response.getMomentList();
    }

    async snsGetMoment(momentId: string): Promise<Moment> {
        const response: SnsGetMomentResponse = await this.client.grpcRequest(
            new SnsGetMomentRequest()
                .setMomentid(momentId),
        );
        return response.getMoment()!;
    }

    async snsLikeMoment(momentId: string, toUserName: string): Promise<Moment> {
        const response: SnsLikeMomentResponse = await this.client.grpcRequest(
            new SnsLikeMomentRequest()
                .setMomentid(momentId)
                .setUsername(toUserName)
        );
        return response.getMoment()!;
    }

    async snsUnlikeMoment(momentId: string): Promise<void> {
        await this.client.grpcRequest(
            new SnsUnlikeMomentRequest()
                .setMomentid(momentId)
        );
    }

    async snsRemoveMomentComment(momentId: string, commentId: string): Promise<void> {
        await this.client.grpcRequest(
            new SnsRemoveMomentCommentRequest()
                .setMomentid(momentId)
                .setCommentid(commentId)
        );
    }

    async snsMakeMomentPrivate(momentId: string): Promise<void> {
        await this.client.grpcRequest(
            new SnsMakeMomentPrivateRequest()
                .setMomentid(momentId)
        );
    }

    async snsMakeMomentPublic(momentId: string): Promise<void> {
        await this.client.grpcRequest(
            new SnsMakeMomentPublicRequest()
                .setMomentid(momentId)
        );
    }

    async snsRemoveMoment(momentId: string): Promise<void> {
        await this.client.grpcRequest(
            new SnsRemoveMomentRequest()
                .setMomentid(momentId)
        );
    }

    async addLabel(label: string): Promise<number> {
        const response: AddLabelResponse = await this.client.grpcRequest(
            new AddLabelRequest()
                .setLabel(label)
        );
        return response.getLabelid();
    }

    async removeLabel(labelId: number): Promise<void> {
        await this.client.grpcRequest(
            new RemoveLabelRequest()
                .setLabelid(labelId)
        );
    }

    async setContactLabel(userName: string, labelIdList: Array<number>): Promise<void> {
        await this.client.grpcRequest(
            new SetContactLabelRequest()
                .setUsername(userName)
                .setLabelidList(labelIdList)
        );
    }

    async getMessageImage(m: Message, imageType: ImageType): Promise<PadLocalClientApi.GetMessageImageResult> {
        if (m.getType() != 3) {
            throw new PadLocalClientApi.ForbiddenError("message type is not image");
        }

        // make a copy, and make sure to clear embedded image data, to save bandwidth
        // TODO: protobuf javascript doesn't support clear field ???
        const message = Message.clone(m).setBinarypayload(ByteUtils.newBytes());

        const grpcClient = this.client.createGrpcClient();
        const response: GetMessageImageResponse = await grpcClient.request(
            new GetMessageImageRequest()
                .setMessage(message)
                .setImagetype(imageType)
        );

        const imageData: Bytes = await CdnUtils.requestCdnAndUnpack(response.getCdnrequest()!, grpcClient.traceId);

        return {
            imageType: response.getImagetype(),
            imageData: imageData
        };
    }

    async getMessageVoice(message: Message): Promise<Bytes> {
        if (message.getType() != 34) {
            throw new PadLocalClientApi.ForbiddenError("message type is not audio");
        }

        if (message.getBinarypayload().length > 0) {
            throw new PadLocalClientApi.ForbiddenError("audio data is already embedded in message");
        }

        const response: GetMessageVoiceResponse = await this.client.grpcRequest(
            new GetMessageVoiceRequest()
                .setMessage(message)
        );

        return Buffer.from(response.getVoice());
    }

    async getMessageVideoThumb(message: Message): Promise<Bytes> {
        if (message.getType() != 43) {
            throw new PadLocalClientApi.ForbiddenError("message type is not video");
        }

        const grpcClient = this.client.createGrpcClient();
        const response: GetMessageVideoThumbResponse = await grpcClient.request(
            new GetMessageVideoThumbRequest()
                .setMessage(message)
        );

        return await CdnUtils.requestCdnAndUnpack(response.getCdnrequest()!, grpcClient.traceId);
    }

    async getMessageVideo(message: Message): Promise<Bytes> {
        if (message.getType() != 43) {
            throw new PadLocalClientApi.ForbiddenError("message type is not video");
        }

        const grpcClient = this.client.createGrpcClient();
        const response: GetMessageVideoResponse = await grpcClient.request(
            new GetMessageVideoRequest()
                .setMessage(message)
        );

        return CdnUtils.requestCdnAndUnpack(response.getCdnrequest()!, grpcClient.traceId);
    }

    async getMessageFile(message: Message): Promise<Bytes> {
        if (message.getType() != 49) {
            throw new PadLocalClientApi.ForbiddenError("message type is not file");
        }

        const grpcClient = this.client.createGrpcClient();
        const response: GetMessageFileResponse = await grpcClient.request(
            new GetMessageFileRequest()
                .setMessage(message)
        );

        return CdnUtils.requestCdnAndUnpack(response.getCdnrequest()!, grpcClient.traceId);
    }

    /**
     * sync contact is very costy, may be last for minutes, so use wiselly.
     * @param callback 
     */
    async syncContact(callback: PadLocalClientApi.SyncContactCallback): Promise<void> {
        // 10 min timeout
        const grpcClient = this.client.createGrpcClient({ requestTimeout: 10 * 60 * 1000 });

        grpcClient.onMessageCallback = (actionMessage: ActionMessage) => {
            if (actionMessage.getPayloadCase() == ActionMessage.PayloadCase.SYNCEVENT) {
                const syncEvent = actionMessage.getSyncevent()!;
                callback.onSync(syncEvent.getContactList());
            }
        };

        await grpcClient.request(new SyncContactRequest());
    }
}

export namespace PadLocalClientApi {
    export class ForbiddenError extends VError {
    }

    export interface LoginCallback {
        onLoginStart(loginType: LoginType): void;
        onOneClickEvent(oneClickEvent: QRCodeEvent): void;
        onQrCodeEvent(qrCodeEvent: QRCodeEvent): void;
        onSync(syncEvent: SyncEvent): void;
    }

    export interface SyncContactCallback {
        onSync(contactList: Array<Contact>): void;
    }

    export interface GetMessageImageResult {
        readonly imageType: ImageType;
        readonly imageData: Bytes;
    }
}