import { ActionMessage } from "../proto/padlocal_pb";
import * as padlocal from "../proto/padlocal_pb";
import { Message } from "google-protobuf";

export namespace ActionMessageUtils {
    /**
     * FIXME: figure out proper ts protobuf reflection to optimize this
     */
    const payloadCaseCtorMap = new Map<ActionMessage.PayloadCase, { new(): any }>([
        [ActionMessage.PayloadCase.WECHATREQUEST, padlocal.WeChatRequest],
        [ActionMessage.PayloadCase.WECHATRESPONSE, padlocal.WeChatResponse],
        [ActionMessage.PayloadCase.LONGLINKUNPACKREQUEST, padlocal.LongLinkUnpackRequest],
        [ActionMessage.PayloadCase.LONGLINKUNPACKRESPONSE, padlocal.LongLinkUnpackResponse],
        [ActionMessage.PayloadCase.LOGINREQUEST, padlocal.LoginRequest],
        [ActionMessage.PayloadCase.LOGINUPDATEEVENT, padlocal.LoginUpdateEvent],
        [ActionMessage.PayloadCase.LOGINRESPONSE, padlocal.LoginResponse],
        [ActionMessage.PayloadCase.LOGOUTREQUEST, padlocal.LogoutRequest],
        [ActionMessage.PayloadCase.LOGOUTRESPONSE, padlocal.LogoutResponse],
        [ActionMessage.PayloadCase.LONGLINKHEARTBEATREQUEST, padlocal.LongLinkHeartBeatRequest],
        [ActionMessage.PayloadCase.LONGLINKHEARTBEATRESPONSE, padlocal.LongLinkHeartBeatResponse],
        [ActionMessage.PayloadCase.SENDTEXTMESSAGEREQUEST, padlocal.SendTextMessageRequest],
        [ActionMessage.PayloadCase.SENDTEXTMESSAGERESPONSE, padlocal.SendTextMessageResponse],
        [ActionMessage.PayloadCase.SENDIMAGEMESSAGEREQUEST, padlocal.SendImageMessageRequest],
        [ActionMessage.PayloadCase.SENDIMAGEMESSAGERESPONSE, padlocal.SendImageMessageResponse],
        [ActionMessage.PayloadCase.SENDAPPMESSAGEREQUEST, padlocal.SendAppMessageRequest],
        [ActionMessage.PayloadCase.SENDAPPMESSAGERESPONSE, padlocal.SendAppMessageResponse],
        [ActionMessage.PayloadCase.ACCEPTUSERREQUEST, padlocal.AcceptUserRequest],
        [ActionMessage.PayloadCase.ACCEPTUSERRESPONSE, padlocal.AcceptUserResponse],
        [ActionMessage.PayloadCase.ADDCONTACTREQUEST, padlocal.AddContactRequest],
        [ActionMessage.PayloadCase.ADDCONTACTRESPONSE, padlocal.AddContactResponse],
        [ActionMessage.PayloadCase.DELETECONTACTREQUEST, padlocal.DeleteContactRequest],
        [ActionMessage.PayloadCase.DELETECONTACTRESPONSE, padlocal.DeleteContactResponse],
        [ActionMessage.PayloadCase.GETCONTACTREQUEST, padlocal.GetContactRequest],
        [ActionMessage.PayloadCase.GETCONTACTRESPONSE, padlocal.GetContactResponse],
        [ActionMessage.PayloadCase.GETCONTACTQRCODEREQUEST, padlocal.GetContactQRCodeRequest],
        [ActionMessage.PayloadCase.GETCONTACTQRCODERESPONSE, padlocal.GetContactQRCodeResponse],
        [ActionMessage.PayloadCase.SEARCHCONTACTREQUEST, padlocal.SearchContactRequest],
        [ActionMessage.PayloadCase.SEARCHCONTACTRESPONSE, padlocal.SearchContactResponse],
        [ActionMessage.PayloadCase.CREATECHATROOMREQUEST, padlocal.CreateChatRoomRequest],
        [ActionMessage.PayloadCase.CREATECHATROOMRESPONSE, padlocal.CreateChatRoomResponse],
        [ActionMessage.PayloadCase.GETCHATROOMMEMBERSREQUEST, padlocal.GetChatRoomMembersRequest],
        [ActionMessage.PayloadCase.GETCHATROOMMEMBERSRESPONSE, padlocal.GetChatRoomMembersResponse],
        [ActionMessage.PayloadCase.GETCHATROOMQRCODEREQUEST, padlocal.GetChatRoomQrCodeRequest],
        [ActionMessage.PayloadCase.GETCHATROOMQRCODERESPONSE, padlocal.GetChatRoomQrCodeResponse],
        [ActionMessage.PayloadCase.GETCHATROOMMEMBERREQUEST, padlocal.GetChatRoomMemberRequest],
        [ActionMessage.PayloadCase.GETCHATROOMMEMBERRESPONSE, padlocal.GetChatRoomMemberResponse],
        [ActionMessage.PayloadCase.SETCHATROOMANNOUNCEMENTREQUEST, padlocal.SetChatRoomAnnouncementRequest],
        [ActionMessage.PayloadCase.SETCHATROOMANNOUNCEMENTRESPONSE, padlocal.SetChatRoomAnnouncementResponse],
        [ActionMessage.PayloadCase.ADDCHATROOMMEMBERREQUEST, padlocal.AddChatRoomMemberRequest],
        [ActionMessage.PayloadCase.ADDCHATROOMMEMBERRESPONSE, padlocal.AddChatRoomMemberResponse],
        [ActionMessage.PayloadCase.INVITECHATROOMMEMBERREQUEST, padlocal.InviteChatRoomMemberRequest],
        [ActionMessage.PayloadCase.INVITECHATROOMMEMBERRESPONSE, padlocal.InviteChatRoomMemberResponse],
        [ActionMessage.PayloadCase.DELETECHATROOMMEMBERREQUEST, padlocal.DeleteChatRoomMemberRequest],
        [ActionMessage.PayloadCase.DELETECHATROOMMEMBERRESPONSE, padlocal.DeleteChatRoomMemberResponse],
        [ActionMessage.PayloadCase.SETCHATROOMNAMEREQUEST, padlocal.SetChatRoomNameRequest],
        [ActionMessage.PayloadCase.SETCHATROOMNAMERESPONSE, padlocal.SetChatRoomNameResponse],
        [ActionMessage.PayloadCase.SNSSENDMOMENTREQUEST, padlocal.SnsSendMomentRequest],
        [ActionMessage.PayloadCase.SNSSENDMOMENTRESPONSE, padlocal.SnsSendMomentResponse],
        [ActionMessage.PayloadCase.SNSGETUSERPAGEREQUEST, padlocal.SnsGetUserPageRequest],
        [ActionMessage.PayloadCase.SNSGETUSERPAGERESPONSE, padlocal.SnsGetUserPageResponse],
        [ActionMessage.PayloadCase.SNSSENDCOMMENTREQUEST, padlocal.SnsSendCommentRequest],
        [ActionMessage.PayloadCase.SNSSENDCOMMENTRESPONSE, padlocal.SnsSendCommentResponse],
        [ActionMessage.PayloadCase.SNSUPLOADIMAGEREQUEST, padlocal.SnsUploadImageRequest],
        [ActionMessage.PayloadCase.SNSUPLOADIMAGERESPONSE, padlocal.SnsUploadImageResponse],
        [ActionMessage.PayloadCase.SNSGETTIMELINEREQUEST, padlocal.SnsGetTimelineRequest],
        [ActionMessage.PayloadCase.SNSGETTIMELINERESPONSE, padlocal.SnsGetTimelineResponse],
        [ActionMessage.PayloadCase.SNSGETMOMENTREQUEST, padlocal.SnsGetMomentRequest],
        [ActionMessage.PayloadCase.SNSGETMOMENTRESPONSE, padlocal.SnsGetMomentResponse],
        [ActionMessage.PayloadCase.SNSLIKEMOMENTREQUEST, padlocal.SnsLikeMomentRequest],
        [ActionMessage.PayloadCase.SNSLIKEMOMENTRESPONSE, padlocal.SnsLikeMomentResponse],
        [ActionMessage.PayloadCase.SNSUNLIKEMOMENTREQUEST, padlocal.SnsUnlikeMomentRequest],
        [ActionMessage.PayloadCase.SNSUNLIKEMOMENTRESPONSE, padlocal.SnsUnlikeMomentResponse],
        [ActionMessage.PayloadCase.SNSREMOVEMOMENTCOMMENTREQUEST, padlocal.SnsRemoveMomentCommentRequest],
        [ActionMessage.PayloadCase.SNSREMOVEMOMENTCOMMENTRESPONSE, padlocal.SnsRemoveMomentCommentResponse],
        [ActionMessage.PayloadCase.SNSMAKEMOMENTPRIVATEREQUEST, padlocal.SnsMakeMomentPrivateRequest],
        [ActionMessage.PayloadCase.SNSMAKEMOMENTPRIVATERESPONSE, padlocal.SnsMakeMomentPrivateResponse],
        [ActionMessage.PayloadCase.SNSMAKEMOMENTPUBLICREQUEST, padlocal.SnsMakeMomentPublicRequest],
        [ActionMessage.PayloadCase.SNSMAKEMOMENTPUBLICRESPONSE, padlocal.SnsMakeMomentPublicResponse],
        [ActionMessage.PayloadCase.SNSREMOVEMOMENTREQUEST, padlocal.SnsRemoveMomentRequest],
        [ActionMessage.PayloadCase.SNSREMOVEMOMENTRESPONSE, padlocal.SnsRemoveMomentResponse],
        [ActionMessage.PayloadCase.ADDLABELREQUEST, padlocal.AddLabelRequest],
        [ActionMessage.PayloadCase.ADDLABELRESPONSE, padlocal.AddLabelResponse],
        [ActionMessage.PayloadCase.REMOVELABELREQUEST, padlocal.RemoveLabelRequest],
        [ActionMessage.PayloadCase.REMOVELABELRESPONSE, padlocal.RemoveLabelResponse],
        [ActionMessage.PayloadCase.GETLABELLISTREQUEST, padlocal.GetLabelListRequest],
        [ActionMessage.PayloadCase.GETLABELLISTRESPONSE, padlocal.GetLabelListResponse],
        [ActionMessage.PayloadCase.SETCONTACTLABELREQUEST, padlocal.SetContactLabelRequest],
        [ActionMessage.PayloadCase.SETCONTACTLABELRESPONSE, padlocal.SetContactLabelResponse],
        [ActionMessage.PayloadCase.SYSTEMEVENTREQUEST, padlocal.SystemEventRequest],
        [ActionMessage.PayloadCase.SYSTEMEVENTRESPONSE, padlocal.SystemEventResponse],
        [ActionMessage.PayloadCase.SYNCREQUEST, padlocal.SyncRequest],
        [ActionMessage.PayloadCase.SYNCRESPONSE, padlocal.SyncResponse],
        [ActionMessage.PayloadCase.GETMESSAGEIMAGEREQUEST, padlocal.GetMessageImageRequest],
        [ActionMessage.PayloadCase.GETMESSAGEIMAGERESPONSE, padlocal.GetMessageImageResponse],
        [ActionMessage.PayloadCase.SYNCCONTACTREQUEST, padlocal.SyncContactRequest],
        [ActionMessage.PayloadCase.SYNCCONTACTRESPONSE, padlocal.SyncContactResponse],
        [ActionMessage.PayloadCase.SYNCEVENT, padlocal.SyncEvent],
        [ActionMessage.PayloadCase.GETMESSAGEVOICEREQUEST, padlocal.GetMessageVoiceRequest],
        [ActionMessage.PayloadCase.GETMESSAGEVOICERESPONSE, padlocal.GetMessageVoiceResponse],
        [ActionMessage.PayloadCase.GETMESSAGEVIDEOTHUMBREQUEST, padlocal.GetMessageVideoThumbRequest],
        [ActionMessage.PayloadCase.GETMESSAGEVIDEOTHUMBRESPONSE, padlocal.GetMessageVideoThumbResponse],
        [ActionMessage.PayloadCase.GETMESSAGEVIDEOREQUEST, padlocal.GetMessageVideoRequest],
        [ActionMessage.PayloadCase.GETMESSAGEVIDEORESPONSE, padlocal.GetMessageVideoResponse],
        [ActionMessage.PayloadCase.GETMESSAGEFILEREQUEST, padlocal.GetMessageFileRequest],
        [ActionMessage.PayloadCase.GETMESSAGEFILERESPONSE, padlocal.GetMessageFileResponse],
        [ActionMessage.PayloadCase.FORWARDMESSAGEREQUEST, padlocal.ForwardMessageRequest],
        [ActionMessage.PayloadCase.FORWARDMESSAGERESPONSE, padlocal.ForwardMessageResponse],
    ]);

    const findPayloadCase = <T extends Message>(payload: T): ActionMessage.PayloadCase => {
        for (const [payloadCase, objClass] of payloadCaseCtorMap.entries()) {
            if (payload instanceof objClass) {
                return payloadCase;
            }
        }

        return ActionMessage.PayloadCase.PAYLOAD_NOT_SET;
    }

    const oneOfGroup = Object.keys(ActionMessage.PayloadCase)
        .filter(k => k !== 'PAYLOAD_NOT_SET')
        .map(k => parseInt(ActionMessage.PayloadCase[k as any]));

    export function getPayload<T extends Message>(actionMessage: ActionMessage): T {
        const payload = actionMessage.getPayloadCase();
        return Message.getWrapperField(actionMessage, payloadCaseCtorMap.get(payload)!, payload);
    }

    export function setPayload<T extends Message>(actionMessag: ActionMessage, paylaod: T) {
        const payloadCase = findPayloadCase(paylaod);
        Message.setOneofWrapperField(actionMessag, payloadCase, oneOfGroup, paylaod);
    }
}

