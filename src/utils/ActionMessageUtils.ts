import { ActionMessage } from "../proto/padlocal_pb";
import * as pb from "../proto/padlocal_pb";
import { Message } from "google-protobuf";

/**
 * FIXME: figure out proper ts protobuf reflection to optimize this
 */
const payloadCaseCtorMap = new Map<ActionMessage.PayloadCase, new () => any>([
  [ActionMessage.PayloadCase.WECHATREQUEST, pb.WeChatRequest],
  [ActionMessage.PayloadCase.WECHATRESPONSE, pb.WeChatResponse],
  [ActionMessage.PayloadCase.WECHATSTREAMREQUEST, pb.WeChatStreamRequest],
  [ActionMessage.PayloadCase.WECHATSTREAMRESPONSE, pb.WeChatStreamResponse],
  [ActionMessage.PayloadCase.WECHATSTREAMRESPONSEREPLY, pb.WeChatStreamResponseReply],
  [ActionMessage.PayloadCase.SYSTEMEVENTREQUEST, pb.SystemEventRequest],
  [ActionMessage.PayloadCase.SYSTEMEVENTRESPONSE, pb.SystemEventResponse],
  [ActionMessage.PayloadCase.LONGLINKINITREQUEST, pb.LongLinkInitRequest],
  [ActionMessage.PayloadCase.LONGLINKINITRESPONSE, pb.LongLinkInitResponse],
  [ActionMessage.PayloadCase.LONGLINKPACKREQUEST, pb.LongLinkPackRequest],
  [ActionMessage.PayloadCase.LONGLINKPACKRESPONSE, pb.LongLinkPackResponse],
  [ActionMessage.PayloadCase.LONGLINKUNPACKREQUEST, pb.LongLinkUnpackRequest],
  [ActionMessage.PayloadCase.LONGLINKUNPACKRESPONSE, pb.LongLinkUnpackResponse],
  [ActionMessage.PayloadCase.LONGLINKHEARTBEATREQUEST, pb.LongLinkHeartBeatRequest],
  [ActionMessage.PayloadCase.LONGLINKHEARTBEATRESPONSE, pb.LongLinkHeartBeatResponse],
  [ActionMessage.PayloadCase.SYNCREQUEST, pb.SyncRequest],
  [ActionMessage.PayloadCase.SYNCRESPONSE, pb.SyncResponse],
  [ActionMessage.PayloadCase.SYNCEVENT, pb.SyncEvent],
  [ActionMessage.PayloadCase.LOGINREQUEST, pb.LoginRequest],
  [ActionMessage.PayloadCase.LOGINUPDATEEVENT, pb.LoginUpdateEvent],
  [ActionMessage.PayloadCase.LOGINRESPONSE, pb.LoginResponse],
  [ActionMessage.PayloadCase.LOGOUTREQUEST, pb.LogoutRequest],
  [ActionMessage.PayloadCase.LOGOUTRESPONSE, pb.LogoutResponse],
  [ActionMessage.PayloadCase.SENDTEXTMESSAGEREQUEST, pb.SendTextMessageRequest],
  [ActionMessage.PayloadCase.SENDTEXTMESSAGERESPONSE, pb.SendTextMessageResponse],
  [ActionMessage.PayloadCase.SENDIMAGEMESSAGEREQUEST, pb.SendImageMessageRequest],
  [ActionMessage.PayloadCase.SENDIMAGEMESSAGERESPONSE, pb.SendImageMessageResponse],
  [ActionMessage.PayloadCase.SENDAPPMESSAGEREQUEST, pb.SendAppMessageRequest],
  [ActionMessage.PayloadCase.SENDAPPMESSAGERESPONSE, pb.SendAppMessageResponse],
  [ActionMessage.PayloadCase.GETMESSAGEIMAGEREQUEST, pb.GetMessageImageRequest],
  [ActionMessage.PayloadCase.GETMESSAGEIMAGERESPONSE, pb.GetMessageImageResponse],
  [ActionMessage.PayloadCase.GETMESSAGEVOICEREQUEST, pb.GetMessageVoiceRequest],
  [ActionMessage.PayloadCase.GETMESSAGEVOICERESPONSE, pb.GetMessageVoiceResponse],
  [ActionMessage.PayloadCase.GETMESSAGEVIDEOTHUMBREQUEST, pb.GetMessageVideoThumbRequest],
  [ActionMessage.PayloadCase.GETMESSAGEVIDEOTHUMBRESPONSE, pb.GetMessageVideoThumbResponse],
  [ActionMessage.PayloadCase.GETMESSAGEVIDEOREQUEST, pb.GetMessageVideoRequest],
  [ActionMessage.PayloadCase.GETMESSAGEVIDEORESPONSE, pb.GetMessageVideoResponse],
  [ActionMessage.PayloadCase.GETMESSAGEATTACHREQUEST, pb.GetMessageAttachRequest],
  [ActionMessage.PayloadCase.GETMESSAGEATTACHRESPONSE, pb.GetMessageAttachResponse],
  [ActionMessage.PayloadCase.GETMESSAGEATTACHTHUMBREQUEST, pb.GetMessageAttachThumbRequest],
  [ActionMessage.PayloadCase.GETMESSAGEATTACHTHUMBRESPONSE, pb.GetMessageAttachThumbResponse],
  [ActionMessage.PayloadCase.FORWARDMESSAGEREQUEST, pb.ForwardMessageRequest],
  [ActionMessage.PayloadCase.FORWARDMESSAGERESPONSE, pb.ForwardMessageResponse],
  [ActionMessage.PayloadCase.SYNCCONTACTREQUEST, pb.SyncContactRequest],
  [ActionMessage.PayloadCase.SYNCCONTACTRESPONSE, pb.SyncContactResponse],
  [ActionMessage.PayloadCase.ACCEPTUSERREQUEST, pb.AcceptUserRequest],
  [ActionMessage.PayloadCase.ACCEPTUSERRESPONSE, pb.AcceptUserResponse],
  [ActionMessage.PayloadCase.ADDCONTACTREQUEST, pb.AddContactRequest],
  [ActionMessage.PayloadCase.ADDCONTACTRESPONSE, pb.AddContactResponse],
  [ActionMessage.PayloadCase.DELETECONTACTREQUEST, pb.DeleteContactRequest],
  [ActionMessage.PayloadCase.DELETECONTACTRESPONSE, pb.DeleteContactResponse],
  [ActionMessage.PayloadCase.GETCONTACTREQUEST, pb.GetContactRequest],
  [ActionMessage.PayloadCase.GETCONTACTRESPONSE, pb.GetContactResponse],
  [ActionMessage.PayloadCase.GETCONTACTQRCODEREQUEST, pb.GetContactQRCodeRequest],
  [ActionMessage.PayloadCase.GETCONTACTQRCODERESPONSE, pb.GetContactQRCodeResponse],
  [ActionMessage.PayloadCase.SEARCHCONTACTREQUEST, pb.SearchContactRequest],
  [ActionMessage.PayloadCase.SEARCHCONTACTRESPONSE, pb.SearchContactResponse],
  [ActionMessage.PayloadCase.CREATECHATROOMREQUEST, pb.CreateChatRoomRequest],
  [ActionMessage.PayloadCase.CREATECHATROOMRESPONSE, pb.CreateChatRoomResponse],
  [ActionMessage.PayloadCase.GETCHATROOMMEMBERSREQUEST, pb.GetChatRoomMembersRequest],
  [ActionMessage.PayloadCase.GETCHATROOMMEMBERSRESPONSE, pb.GetChatRoomMembersResponse],
  [ActionMessage.PayloadCase.GETCHATROOMQRCODEREQUEST, pb.GetChatRoomQrCodeRequest],
  [ActionMessage.PayloadCase.GETCHATROOMQRCODERESPONSE, pb.GetChatRoomQrCodeResponse],
  [ActionMessage.PayloadCase.GETCHATROOMMEMBERREQUEST, pb.GetChatRoomMemberRequest],
  [ActionMessage.PayloadCase.GETCHATROOMMEMBERRESPONSE, pb.GetChatRoomMemberResponse],
  [ActionMessage.PayloadCase.SETCHATROOMANNOUNCEMENTREQUEST, pb.SetChatRoomAnnouncementRequest],
  [ActionMessage.PayloadCase.SETCHATROOMANNOUNCEMENTRESPONSE, pb.SetChatRoomAnnouncementResponse],
  [ActionMessage.PayloadCase.ADDCHATROOMMEMBERREQUEST, pb.AddChatRoomMemberRequest],
  [ActionMessage.PayloadCase.ADDCHATROOMMEMBERRESPONSE, pb.AddChatRoomMemberResponse],
  [ActionMessage.PayloadCase.INVITECHATROOMMEMBERREQUEST, pb.InviteChatRoomMemberRequest],
  [ActionMessage.PayloadCase.INVITECHATROOMMEMBERRESPONSE, pb.InviteChatRoomMemberResponse],
  [ActionMessage.PayloadCase.DELETECHATROOMMEMBERREQUEST, pb.DeleteChatRoomMemberRequest],
  [ActionMessage.PayloadCase.DELETECHATROOMMEMBERRESPONSE, pb.DeleteChatRoomMemberResponse],
  [ActionMessage.PayloadCase.SETCHATROOMNAMEREQUEST, pb.SetChatRoomNameRequest],
  [ActionMessage.PayloadCase.SETCHATROOMNAMERESPONSE, pb.SetChatRoomNameResponse],
  [ActionMessage.PayloadCase.ADDLABELREQUEST, pb.AddLabelRequest],
  [ActionMessage.PayloadCase.ADDLABELRESPONSE, pb.AddLabelResponse],
  [ActionMessage.PayloadCase.REMOVELABELREQUEST, pb.RemoveLabelRequest],
  [ActionMessage.PayloadCase.REMOVELABELRESPONSE, pb.RemoveLabelResponse],
  [ActionMessage.PayloadCase.GETLABELLISTREQUEST, pb.GetLabelListRequest],
  [ActionMessage.PayloadCase.GETLABELLISTRESPONSE, pb.GetLabelListResponse],
  [ActionMessage.PayloadCase.SETCONTACTLABELREQUEST, pb.SetContactLabelRequest],
  [ActionMessage.PayloadCase.SETCONTACTLABELRESPONSE, pb.SetContactLabelResponse],
  [ActionMessage.PayloadCase.SNSSENDMOMENTREQUEST, pb.SnsSendMomentRequest],
  [ActionMessage.PayloadCase.SNSSENDMOMENTRESPONSE, pb.SnsSendMomentResponse],
  [ActionMessage.PayloadCase.SNSFORWARDMOMENTREQUEST, pb.SnsForwardMomentRequest],
  [ActionMessage.PayloadCase.SNSFORWARDMOMENTRESPONSE, pb.SnsForwardMomentResponse],
  [ActionMessage.PayloadCase.SNSGETUSERPAGEREQUEST, pb.SnsGetUserPageRequest],
  [ActionMessage.PayloadCase.SNSGETUSERPAGERESPONSE, pb.SnsGetUserPageResponse],
  [ActionMessage.PayloadCase.SNSGETTIMELINEREQUEST, pb.SnsGetTimelineRequest],
  [ActionMessage.PayloadCase.SNSGETTIMELINERESPONSE, pb.SnsGetTimelineResponse],
  [ActionMessage.PayloadCase.SNSGETMOMENTREQUEST, pb.SnsGetMomentRequest],
  [ActionMessage.PayloadCase.SNSGETMOMENTRESPONSE, pb.SnsGetMomentResponse],
  [ActionMessage.PayloadCase.SNSSENDCOMMENTREQUEST, pb.SnsSendCommentRequest],
  [ActionMessage.PayloadCase.SNSSENDCOMMENTRESPONSE, pb.SnsSendCommentResponse],
  [ActionMessage.PayloadCase.SNSUPLOADIMAGEREQUEST, pb.SnsUploadImageRequest],
  [ActionMessage.PayloadCase.SNSUPLOADIMAGERESPONSE, pb.SnsUploadImageResponse],
  [ActionMessage.PayloadCase.SNSLIKEMOMENTREQUEST, pb.SnsLikeMomentRequest],
  [ActionMessage.PayloadCase.SNSLIKEMOMENTRESPONSE, pb.SnsLikeMomentResponse],
  [ActionMessage.PayloadCase.SNSUNLIKEMOMENTREQUEST, pb.SnsUnlikeMomentRequest],
  [ActionMessage.PayloadCase.SNSUNLIKEMOMENTRESPONSE, pb.SnsUnlikeMomentResponse],
  [ActionMessage.PayloadCase.SNSREMOVEMOMENTCOMMENTREQUEST, pb.SnsRemoveMomentCommentRequest],
  [ActionMessage.PayloadCase.SNSREMOVEMOMENTCOMMENTRESPONSE, pb.SnsRemoveMomentCommentResponse],
  [ActionMessage.PayloadCase.SNSMAKEMOMENTPRIVATEREQUEST, pb.SnsMakeMomentPrivateRequest],
  [ActionMessage.PayloadCase.SNSMAKEMOMENTPRIVATERESPONSE, pb.SnsMakeMomentPrivateResponse],
  [ActionMessage.PayloadCase.SNSMAKEMOMENTPUBLICREQUEST, pb.SnsMakeMomentPublicRequest],
  [ActionMessage.PayloadCase.SNSMAKEMOMENTPUBLICRESPONSE, pb.SnsMakeMomentPublicResponse],
  [ActionMessage.PayloadCase.SNSREMOVEMOMENTREQUEST, pb.SnsRemoveMomentRequest],
  [ActionMessage.PayloadCase.SNSREMOVEMOMENTRESPONSE, pb.SnsRemoveMomentResponse],
  [ActionMessage.PayloadCase.UPDATESELFNICKNAMEREQUEST, pb.UpdateSelfNickNameRequest],
  [ActionMessage.PayloadCase.UPDATESELFNICKNAMERESPONSE, pb.UpdateSelfNickNameResponse],
  [ActionMessage.PayloadCase.UPDATESELFSIGNATUREREQUEST, pb.UpdateSelfSignatureRequest],
  [ActionMessage.PayloadCase.UPDATESELFSIGNATURERESPONSE, pb.UpdateSelfSignatureResponse],
  [ActionMessage.PayloadCase.ZOMBIETESTREQUEST, pb.ZombieTestRequest],
  [ActionMessage.PayloadCase.ZOMBIETESTRESPONSE, pb.ZombieTestResponse],
  [ActionMessage.PayloadCase.UPDATECONTACTREMARKREQUEST, pb.UpdateContactRemarkRequest],
  [ActionMessage.PayloadCase.UPDATECONTACTREMARKRESPONSE, pb.UpdateContactRemarkResponse],
  [ActionMessage.PayloadCase.REVOKEMESSAGEREQUEST, pb.RevokeMessageRequest],
  [ActionMessage.PayloadCase.REVOKEMESSAGERESPONSE, pb.RevokeMessageResponse],
  [ActionMessage.PayloadCase.QUITCHATROOMREQUEST, pb.QuitChatRoomRequest],
  [ActionMessage.PayloadCase.QUITCHATROOMRESPONSE, pb.QuitChatRoomResponse],
  [ActionMessage.PayloadCase.SENDCONTACTCARDMESSAGEREQUEST, pb.SendContactCardMessageRequest],
  [ActionMessage.PayloadCase.SENDCONTACTCARDMESSAGERESPONSE, pb.SendContactCardMessageResponse],
  [ActionMessage.PayloadCase.SENDVOICEMESSAGEREQUEST, pb.SendVoiceMessageRequest],
  [ActionMessage.PayloadCase.SENDVOICEMESSAGERESPONSE, pb.SendVoiceMessageResponse],
  [ActionMessage.PayloadCase.SENDVIDEOMESSAGEREQUEST, pb.SendVideoMessageRequest],
  [ActionMessage.PayloadCase.SENDVIDEOMESSAGERESPONSE, pb.SendVideoMessageResponse],
  [ActionMessage.PayloadCase.SENDFILEMESSAGEREQUEST, pb.SendFileMessageRequest],
  [ActionMessage.PayloadCase.SENDFILEMESSAGERESPONSE, pb.SendFileMessageResponse],
  [ActionMessage.PayloadCase.GETMESSAGEMINIPROGRAMTHUMBREQUEST, pb.GetMessageMiniProgramThumbRequest],
  [ActionMessage.PayloadCase.GETMESSAGEMINIPROGRAMTHUMBRESPONSE, pb.GetMessageMiniProgramThumbResponse],
  [ActionMessage.PayloadCase.GETENCRYPTEDFILEREQUEST, pb.GetEncryptedFileRequest],
  [ActionMessage.PayloadCase.GETENCRYPTEDFILERESPONSE, pb.GetEncryptedFileResponse],
]);

const findPayloadCase = <T extends Message>(payload: T): ActionMessage.PayloadCase => {
  for (const [payloadCase, objClass] of payloadCaseCtorMap.entries()) {
    if (payload instanceof objClass) {
      return payloadCase;
    }
  }

  return ActionMessage.PayloadCase.PAYLOAD_NOT_SET;
};

const oneOfGroup = Object.keys(ActionMessage.PayloadCase)
  .filter((k) => k !== "PAYLOAD_NOT_SET")
  .map((k) => parseInt(ActionMessage.PayloadCase[k as any], 10));

export function getPayload<T extends Message>(actionMessage: ActionMessage): T {
  const payload = actionMessage.getPayloadCase();
  return Message.getWrapperField(actionMessage, payloadCaseCtorMap.get(payload)!, payload);
}

export function setPayload<T extends Message>(actionMessage: ActionMessage, payload: T) {
  const payloadCase = findPayloadCase(payload);
  Message.setOneofWrapperField(actionMessage, payloadCase, oneOfGroup, payload);
}
