// package: padlocal
// file: padlocal.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ActionMessageHeader extends jspb.Message { 
    getSeq(): number;
    setSeq(value: number): ActionMessageHeader;
    getAck(): number;
    setAck(value: number): ActionMessageHeader;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ActionMessageHeader.AsObject;
    static toObject(includeInstance: boolean, msg: ActionMessageHeader): ActionMessageHeader.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ActionMessageHeader, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ActionMessageHeader;
    static deserializeBinaryFromReader(message: ActionMessageHeader, reader: jspb.BinaryReader): ActionMessageHeader;
}

export namespace ActionMessageHeader {
    export type AsObject = {
        seq: number,
        ack: number,
    }
}

export class ActionMessage extends jspb.Message { 

    hasHeader(): boolean;
    clearHeader(): void;
    getHeader(): ActionMessageHeader | undefined;
    setHeader(value?: ActionMessageHeader): ActionMessage;

    hasWechatrequest(): boolean;
    clearWechatrequest(): void;
    getWechatrequest(): WeChatRequest | undefined;
    setWechatrequest(value?: WeChatRequest): ActionMessage;

    hasWechatresponse(): boolean;
    clearWechatresponse(): void;
    getWechatresponse(): WeChatResponse | undefined;
    setWechatresponse(value?: WeChatResponse): ActionMessage;

    hasWechatstreamrequest(): boolean;
    clearWechatstreamrequest(): void;
    getWechatstreamrequest(): WeChatStreamRequest | undefined;
    setWechatstreamrequest(value?: WeChatStreamRequest): ActionMessage;

    hasWechatstreamresponse(): boolean;
    clearWechatstreamresponse(): void;
    getWechatstreamresponse(): WeChatStreamResponse | undefined;
    setWechatstreamresponse(value?: WeChatStreamResponse): ActionMessage;

    hasWechatstreamresponsereply(): boolean;
    clearWechatstreamresponsereply(): void;
    getWechatstreamresponsereply(): WeChatStreamResponseReply | undefined;
    setWechatstreamresponsereply(value?: WeChatStreamResponseReply): ActionMessage;

    hasSystemeventrequest(): boolean;
    clearSystemeventrequest(): void;
    getSystemeventrequest(): SystemEventRequest | undefined;
    setSystemeventrequest(value?: SystemEventRequest): ActionMessage;

    hasSystemeventresponse(): boolean;
    clearSystemeventresponse(): void;
    getSystemeventresponse(): SystemEventResponse | undefined;
    setSystemeventresponse(value?: SystemEventResponse): ActionMessage;

    hasLonglinkinitrequest(): boolean;
    clearLonglinkinitrequest(): void;
    getLonglinkinitrequest(): LongLinkInitRequest | undefined;
    setLonglinkinitrequest(value?: LongLinkInitRequest): ActionMessage;

    hasLonglinkinitresponse(): boolean;
    clearLonglinkinitresponse(): void;
    getLonglinkinitresponse(): LongLinkInitResponse | undefined;
    setLonglinkinitresponse(value?: LongLinkInitResponse): ActionMessage;

    hasLonglinkpackrequest(): boolean;
    clearLonglinkpackrequest(): void;
    getLonglinkpackrequest(): LongLinkPackRequest | undefined;
    setLonglinkpackrequest(value?: LongLinkPackRequest): ActionMessage;

    hasLonglinkpackresponse(): boolean;
    clearLonglinkpackresponse(): void;
    getLonglinkpackresponse(): LongLinkPackResponse | undefined;
    setLonglinkpackresponse(value?: LongLinkPackResponse): ActionMessage;

    hasLonglinkunpackrequest(): boolean;
    clearLonglinkunpackrequest(): void;
    getLonglinkunpackrequest(): LongLinkUnpackRequest | undefined;
    setLonglinkunpackrequest(value?: LongLinkUnpackRequest): ActionMessage;

    hasLonglinkunpackresponse(): boolean;
    clearLonglinkunpackresponse(): void;
    getLonglinkunpackresponse(): LongLinkUnpackResponse | undefined;
    setLonglinkunpackresponse(value?: LongLinkUnpackResponse): ActionMessage;

    hasLonglinkheartbeatrequest(): boolean;
    clearLonglinkheartbeatrequest(): void;
    getLonglinkheartbeatrequest(): LongLinkHeartBeatRequest | undefined;
    setLonglinkheartbeatrequest(value?: LongLinkHeartBeatRequest): ActionMessage;

    hasLonglinkheartbeatresponse(): boolean;
    clearLonglinkheartbeatresponse(): void;
    getLonglinkheartbeatresponse(): LongLinkHeartBeatResponse | undefined;
    setLonglinkheartbeatresponse(value?: LongLinkHeartBeatResponse): ActionMessage;

    hasSyncrequest(): boolean;
    clearSyncrequest(): void;
    getSyncrequest(): SyncRequest | undefined;
    setSyncrequest(value?: SyncRequest): ActionMessage;

    hasSyncresponse(): boolean;
    clearSyncresponse(): void;
    getSyncresponse(): SyncResponse | undefined;
    setSyncresponse(value?: SyncResponse): ActionMessage;

    hasSyncevent(): boolean;
    clearSyncevent(): void;
    getSyncevent(): SyncEvent | undefined;
    setSyncevent(value?: SyncEvent): ActionMessage;

    hasLoginrequest(): boolean;
    clearLoginrequest(): void;
    getLoginrequest(): LoginRequest | undefined;
    setLoginrequest(value?: LoginRequest): ActionMessage;

    hasLoginupdateevent(): boolean;
    clearLoginupdateevent(): void;
    getLoginupdateevent(): LoginUpdateEvent | undefined;
    setLoginupdateevent(value?: LoginUpdateEvent): ActionMessage;

    hasLoginresponse(): boolean;
    clearLoginresponse(): void;
    getLoginresponse(): LoginResponse | undefined;
    setLoginresponse(value?: LoginResponse): ActionMessage;

    hasLogoutrequest(): boolean;
    clearLogoutrequest(): void;
    getLogoutrequest(): LogoutRequest | undefined;
    setLogoutrequest(value?: LogoutRequest): ActionMessage;

    hasLogoutresponse(): boolean;
    clearLogoutresponse(): void;
    getLogoutresponse(): LogoutResponse | undefined;
    setLogoutresponse(value?: LogoutResponse): ActionMessage;

    hasSendtextmessagerequest(): boolean;
    clearSendtextmessagerequest(): void;
    getSendtextmessagerequest(): SendTextMessageRequest | undefined;
    setSendtextmessagerequest(value?: SendTextMessageRequest): ActionMessage;

    hasSendtextmessageresponse(): boolean;
    clearSendtextmessageresponse(): void;
    getSendtextmessageresponse(): SendTextMessageResponse | undefined;
    setSendtextmessageresponse(value?: SendTextMessageResponse): ActionMessage;

    hasSendimagemessagerequest(): boolean;
    clearSendimagemessagerequest(): void;
    getSendimagemessagerequest(): SendImageMessageRequest | undefined;
    setSendimagemessagerequest(value?: SendImageMessageRequest): ActionMessage;

    hasSendimagemessageresponse(): boolean;
    clearSendimagemessageresponse(): void;
    getSendimagemessageresponse(): SendImageMessageResponse | undefined;
    setSendimagemessageresponse(value?: SendImageMessageResponse): ActionMessage;

    hasSendappmessagerequest(): boolean;
    clearSendappmessagerequest(): void;
    getSendappmessagerequest(): SendAppMessageRequest | undefined;
    setSendappmessagerequest(value?: SendAppMessageRequest): ActionMessage;

    hasSendappmessageresponse(): boolean;
    clearSendappmessageresponse(): void;
    getSendappmessageresponse(): SendAppMessageResponse | undefined;
    setSendappmessageresponse(value?: SendAppMessageResponse): ActionMessage;

    hasGetmessageimagerequest(): boolean;
    clearGetmessageimagerequest(): void;
    getGetmessageimagerequest(): GetMessageImageRequest | undefined;
    setGetmessageimagerequest(value?: GetMessageImageRequest): ActionMessage;

    hasGetmessageimageresponse(): boolean;
    clearGetmessageimageresponse(): void;
    getGetmessageimageresponse(): GetMessageImageResponse | undefined;
    setGetmessageimageresponse(value?: GetMessageImageResponse): ActionMessage;

    hasGetmessagevoicerequest(): boolean;
    clearGetmessagevoicerequest(): void;
    getGetmessagevoicerequest(): GetMessageVoiceRequest | undefined;
    setGetmessagevoicerequest(value?: GetMessageVoiceRequest): ActionMessage;

    hasGetmessagevoiceresponse(): boolean;
    clearGetmessagevoiceresponse(): void;
    getGetmessagevoiceresponse(): GetMessageVoiceResponse | undefined;
    setGetmessagevoiceresponse(value?: GetMessageVoiceResponse): ActionMessage;

    hasGetmessagevideothumbrequest(): boolean;
    clearGetmessagevideothumbrequest(): void;
    getGetmessagevideothumbrequest(): GetMessageVideoThumbRequest | undefined;
    setGetmessagevideothumbrequest(value?: GetMessageVideoThumbRequest): ActionMessage;

    hasGetmessagevideothumbresponse(): boolean;
    clearGetmessagevideothumbresponse(): void;
    getGetmessagevideothumbresponse(): GetMessageVideoThumbResponse | undefined;
    setGetmessagevideothumbresponse(value?: GetMessageVideoThumbResponse): ActionMessage;

    hasGetmessagevideorequest(): boolean;
    clearGetmessagevideorequest(): void;
    getGetmessagevideorequest(): GetMessageVideoRequest | undefined;
    setGetmessagevideorequest(value?: GetMessageVideoRequest): ActionMessage;

    hasGetmessagevideoresponse(): boolean;
    clearGetmessagevideoresponse(): void;
    getGetmessagevideoresponse(): GetMessageVideoResponse | undefined;
    setGetmessagevideoresponse(value?: GetMessageVideoResponse): ActionMessage;

    hasGetmessageattachrequest(): boolean;
    clearGetmessageattachrequest(): void;
    getGetmessageattachrequest(): GetMessageAttachRequest | undefined;
    setGetmessageattachrequest(value?: GetMessageAttachRequest): ActionMessage;

    hasGetmessageattachresponse(): boolean;
    clearGetmessageattachresponse(): void;
    getGetmessageattachresponse(): GetMessageAttachResponse | undefined;
    setGetmessageattachresponse(value?: GetMessageAttachResponse): ActionMessage;

    hasForwardmessagerequest(): boolean;
    clearForwardmessagerequest(): void;
    getForwardmessagerequest(): ForwardMessageRequest | undefined;
    setForwardmessagerequest(value?: ForwardMessageRequest): ActionMessage;

    hasForwardmessageresponse(): boolean;
    clearForwardmessageresponse(): void;
    getForwardmessageresponse(): ForwardMessageResponse | undefined;
    setForwardmessageresponse(value?: ForwardMessageResponse): ActionMessage;

    hasGetmessageattachthumbrequest(): boolean;
    clearGetmessageattachthumbrequest(): void;
    getGetmessageattachthumbrequest(): GetMessageAttachThumbRequest | undefined;
    setGetmessageattachthumbrequest(value?: GetMessageAttachThumbRequest): ActionMessage;

    hasGetmessageattachthumbresponse(): boolean;
    clearGetmessageattachthumbresponse(): void;
    getGetmessageattachthumbresponse(): GetMessageAttachThumbResponse | undefined;
    setGetmessageattachthumbresponse(value?: GetMessageAttachThumbResponse): ActionMessage;

    hasRevokemessagerequest(): boolean;
    clearRevokemessagerequest(): void;
    getRevokemessagerequest(): RevokeMessageRequest | undefined;
    setRevokemessagerequest(value?: RevokeMessageRequest): ActionMessage;

    hasRevokemessageresponse(): boolean;
    clearRevokemessageresponse(): void;
    getRevokemessageresponse(): RevokeMessageResponse | undefined;
    setRevokemessageresponse(value?: RevokeMessageResponse): ActionMessage;

    hasSendcontactcardmessagerequest(): boolean;
    clearSendcontactcardmessagerequest(): void;
    getSendcontactcardmessagerequest(): SendContactCardMessageRequest | undefined;
    setSendcontactcardmessagerequest(value?: SendContactCardMessageRequest): ActionMessage;

    hasSendcontactcardmessageresponse(): boolean;
    clearSendcontactcardmessageresponse(): void;
    getSendcontactcardmessageresponse(): SendContactCardMessageResponse | undefined;
    setSendcontactcardmessageresponse(value?: SendContactCardMessageResponse): ActionMessage;

    hasSendvoicemessagerequest(): boolean;
    clearSendvoicemessagerequest(): void;
    getSendvoicemessagerequest(): SendVoiceMessageRequest | undefined;
    setSendvoicemessagerequest(value?: SendVoiceMessageRequest): ActionMessage;

    hasSendvoicemessageresponse(): boolean;
    clearSendvoicemessageresponse(): void;
    getSendvoicemessageresponse(): SendVoiceMessageResponse | undefined;
    setSendvoicemessageresponse(value?: SendVoiceMessageResponse): ActionMessage;

    hasSendvideomessagerequest(): boolean;
    clearSendvideomessagerequest(): void;
    getSendvideomessagerequest(): SendVideoMessageRequest | undefined;
    setSendvideomessagerequest(value?: SendVideoMessageRequest): ActionMessage;

    hasSendvideomessageresponse(): boolean;
    clearSendvideomessageresponse(): void;
    getSendvideomessageresponse(): SendVideoMessageResponse | undefined;
    setSendvideomessageresponse(value?: SendVideoMessageResponse): ActionMessage;

    hasSendfilemessagerequest(): boolean;
    clearSendfilemessagerequest(): void;
    getSendfilemessagerequest(): SendFileMessageRequest | undefined;
    setSendfilemessagerequest(value?: SendFileMessageRequest): ActionMessage;

    hasSendfilemessageresponse(): boolean;
    clearSendfilemessageresponse(): void;
    getSendfilemessageresponse(): SendFileMessageResponse | undefined;
    setSendfilemessageresponse(value?: SendFileMessageResponse): ActionMessage;

    hasGetmessageminiprogramthumbrequest(): boolean;
    clearGetmessageminiprogramthumbrequest(): void;
    getGetmessageminiprogramthumbrequest(): GetMessageMiniProgramThumbRequest | undefined;
    setGetmessageminiprogramthumbrequest(value?: GetMessageMiniProgramThumbRequest): ActionMessage;

    hasGetmessageminiprogramthumbresponse(): boolean;
    clearGetmessageminiprogramthumbresponse(): void;
    getGetmessageminiprogramthumbresponse(): GetMessageMiniProgramThumbResponse | undefined;
    setGetmessageminiprogramthumbresponse(value?: GetMessageMiniProgramThumbResponse): ActionMessage;

    hasGetencryptedfilerequest(): boolean;
    clearGetencryptedfilerequest(): void;
    getGetencryptedfilerequest(): GetEncryptedFileRequest | undefined;
    setGetencryptedfilerequest(value?: GetEncryptedFileRequest): ActionMessage;

    hasGetencryptedfileresponse(): boolean;
    clearGetencryptedfileresponse(): void;
    getGetencryptedfileresponse(): GetEncryptedFileResponse | undefined;
    setGetencryptedfileresponse(value?: GetEncryptedFileResponse): ActionMessage;

    hasSendemojimessagerequest(): boolean;
    clearSendemojimessagerequest(): void;
    getSendemojimessagerequest(): SendEmojiMessageRequest | undefined;
    setSendemojimessagerequest(value?: SendEmojiMessageRequest): ActionMessage;

    hasSendemojimessageresponse(): boolean;
    clearSendemojimessageresponse(): void;
    getSendemojimessageresponse(): SendEmojiMessageResponse | undefined;
    setSendemojimessageresponse(value?: SendEmojiMessageResponse): ActionMessage;

    hasSynccontactrequest(): boolean;
    clearSynccontactrequest(): void;
    getSynccontactrequest(): SyncContactRequest | undefined;
    setSynccontactrequest(value?: SyncContactRequest): ActionMessage;

    hasSynccontactresponse(): boolean;
    clearSynccontactresponse(): void;
    getSynccontactresponse(): SyncContactResponse | undefined;
    setSynccontactresponse(value?: SyncContactResponse): ActionMessage;

    hasAcceptuserrequest(): boolean;
    clearAcceptuserrequest(): void;
    getAcceptuserrequest(): AcceptUserRequest | undefined;
    setAcceptuserrequest(value?: AcceptUserRequest): ActionMessage;

    hasAcceptuserresponse(): boolean;
    clearAcceptuserresponse(): void;
    getAcceptuserresponse(): AcceptUserResponse | undefined;
    setAcceptuserresponse(value?: AcceptUserResponse): ActionMessage;

    hasAddcontactrequest(): boolean;
    clearAddcontactrequest(): void;
    getAddcontactrequest(): AddContactRequest | undefined;
    setAddcontactrequest(value?: AddContactRequest): ActionMessage;

    hasAddcontactresponse(): boolean;
    clearAddcontactresponse(): void;
    getAddcontactresponse(): AddContactResponse | undefined;
    setAddcontactresponse(value?: AddContactResponse): ActionMessage;

    hasDeletecontactrequest(): boolean;
    clearDeletecontactrequest(): void;
    getDeletecontactrequest(): DeleteContactRequest | undefined;
    setDeletecontactrequest(value?: DeleteContactRequest): ActionMessage;

    hasDeletecontactresponse(): boolean;
    clearDeletecontactresponse(): void;
    getDeletecontactresponse(): DeleteContactResponse | undefined;
    setDeletecontactresponse(value?: DeleteContactResponse): ActionMessage;

    hasGetcontactrequest(): boolean;
    clearGetcontactrequest(): void;
    getGetcontactrequest(): GetContactRequest | undefined;
    setGetcontactrequest(value?: GetContactRequest): ActionMessage;

    hasGetcontactresponse(): boolean;
    clearGetcontactresponse(): void;
    getGetcontactresponse(): GetContactResponse | undefined;
    setGetcontactresponse(value?: GetContactResponse): ActionMessage;

    hasGetcontactqrcoderequest(): boolean;
    clearGetcontactqrcoderequest(): void;
    getGetcontactqrcoderequest(): GetContactQRCodeRequest | undefined;
    setGetcontactqrcoderequest(value?: GetContactQRCodeRequest): ActionMessage;

    hasGetcontactqrcoderesponse(): boolean;
    clearGetcontactqrcoderesponse(): void;
    getGetcontactqrcoderesponse(): GetContactQRCodeResponse | undefined;
    setGetcontactqrcoderesponse(value?: GetContactQRCodeResponse): ActionMessage;

    hasSearchcontactrequest(): boolean;
    clearSearchcontactrequest(): void;
    getSearchcontactrequest(): SearchContactRequest | undefined;
    setSearchcontactrequest(value?: SearchContactRequest): ActionMessage;

    hasSearchcontactresponse(): boolean;
    clearSearchcontactresponse(): void;
    getSearchcontactresponse(): SearchContactResponse | undefined;
    setSearchcontactresponse(value?: SearchContactResponse): ActionMessage;

    hasUpdateselfnicknamerequest(): boolean;
    clearUpdateselfnicknamerequest(): void;
    getUpdateselfnicknamerequest(): UpdateSelfNickNameRequest | undefined;
    setUpdateselfnicknamerequest(value?: UpdateSelfNickNameRequest): ActionMessage;

    hasUpdateselfnicknameresponse(): boolean;
    clearUpdateselfnicknameresponse(): void;
    getUpdateselfnicknameresponse(): UpdateSelfNickNameResponse | undefined;
    setUpdateselfnicknameresponse(value?: UpdateSelfNickNameResponse): ActionMessage;

    hasUpdateselfsignaturerequest(): boolean;
    clearUpdateselfsignaturerequest(): void;
    getUpdateselfsignaturerequest(): UpdateSelfSignatureRequest | undefined;
    setUpdateselfsignaturerequest(value?: UpdateSelfSignatureRequest): ActionMessage;

    hasUpdateselfsignatureresponse(): boolean;
    clearUpdateselfsignatureresponse(): void;
    getUpdateselfsignatureresponse(): UpdateSelfSignatureResponse | undefined;
    setUpdateselfsignatureresponse(value?: UpdateSelfSignatureResponse): ActionMessage;

    hasZombietestrequest(): boolean;
    clearZombietestrequest(): void;
    getZombietestrequest(): ZombieTestRequest | undefined;
    setZombietestrequest(value?: ZombieTestRequest): ActionMessage;

    hasZombietestresponse(): boolean;
    clearZombietestresponse(): void;
    getZombietestresponse(): ZombieTestResponse | undefined;
    setZombietestresponse(value?: ZombieTestResponse): ActionMessage;

    hasUpdatecontactremarkrequest(): boolean;
    clearUpdatecontactremarkrequest(): void;
    getUpdatecontactremarkrequest(): UpdateContactRemarkRequest | undefined;
    setUpdatecontactremarkrequest(value?: UpdateContactRemarkRequest): ActionMessage;

    hasUpdatecontactremarkresponse(): boolean;
    clearUpdatecontactremarkresponse(): void;
    getUpdatecontactremarkresponse(): UpdateContactRemarkResponse | undefined;
    setUpdatecontactremarkresponse(value?: UpdateContactRemarkResponse): ActionMessage;

    hasCreatechatroomrequest(): boolean;
    clearCreatechatroomrequest(): void;
    getCreatechatroomrequest(): CreateChatRoomRequest | undefined;
    setCreatechatroomrequest(value?: CreateChatRoomRequest): ActionMessage;

    hasCreatechatroomresponse(): boolean;
    clearCreatechatroomresponse(): void;
    getCreatechatroomresponse(): CreateChatRoomResponse | undefined;
    setCreatechatroomresponse(value?: CreateChatRoomResponse): ActionMessage;

    hasGetchatroommembersrequest(): boolean;
    clearGetchatroommembersrequest(): void;
    getGetchatroommembersrequest(): GetChatRoomMembersRequest | undefined;
    setGetchatroommembersrequest(value?: GetChatRoomMembersRequest): ActionMessage;

    hasGetchatroommembersresponse(): boolean;
    clearGetchatroommembersresponse(): void;
    getGetchatroommembersresponse(): GetChatRoomMembersResponse | undefined;
    setGetchatroommembersresponse(value?: GetChatRoomMembersResponse): ActionMessage;

    hasGetchatroomqrcoderequest(): boolean;
    clearGetchatroomqrcoderequest(): void;
    getGetchatroomqrcoderequest(): GetChatRoomQrCodeRequest | undefined;
    setGetchatroomqrcoderequest(value?: GetChatRoomQrCodeRequest): ActionMessage;

    hasGetchatroomqrcoderesponse(): boolean;
    clearGetchatroomqrcoderesponse(): void;
    getGetchatroomqrcoderesponse(): GetChatRoomQrCodeResponse | undefined;
    setGetchatroomqrcoderesponse(value?: GetChatRoomQrCodeResponse): ActionMessage;

    hasGetchatroommemberrequest(): boolean;
    clearGetchatroommemberrequest(): void;
    getGetchatroommemberrequest(): GetChatRoomMemberRequest | undefined;
    setGetchatroommemberrequest(value?: GetChatRoomMemberRequest): ActionMessage;

    hasGetchatroommemberresponse(): boolean;
    clearGetchatroommemberresponse(): void;
    getGetchatroommemberresponse(): GetChatRoomMemberResponse | undefined;
    setGetchatroommemberresponse(value?: GetChatRoomMemberResponse): ActionMessage;

    hasSetchatroomannouncementrequest(): boolean;
    clearSetchatroomannouncementrequest(): void;
    getSetchatroomannouncementrequest(): SetChatRoomAnnouncementRequest | undefined;
    setSetchatroomannouncementrequest(value?: SetChatRoomAnnouncementRequest): ActionMessage;

    hasSetchatroomannouncementresponse(): boolean;
    clearSetchatroomannouncementresponse(): void;
    getSetchatroomannouncementresponse(): SetChatRoomAnnouncementResponse | undefined;
    setSetchatroomannouncementresponse(value?: SetChatRoomAnnouncementResponse): ActionMessage;

    hasAddchatroommemberrequest(): boolean;
    clearAddchatroommemberrequest(): void;
    getAddchatroommemberrequest(): AddChatRoomMemberRequest | undefined;
    setAddchatroommemberrequest(value?: AddChatRoomMemberRequest): ActionMessage;

    hasAddchatroommemberresponse(): boolean;
    clearAddchatroommemberresponse(): void;
    getAddchatroommemberresponse(): AddChatRoomMemberResponse | undefined;
    setAddchatroommemberresponse(value?: AddChatRoomMemberResponse): ActionMessage;

    hasDeletechatroommemberrequest(): boolean;
    clearDeletechatroommemberrequest(): void;
    getDeletechatroommemberrequest(): DeleteChatRoomMemberRequest | undefined;
    setDeletechatroommemberrequest(value?: DeleteChatRoomMemberRequest): ActionMessage;

    hasDeletechatroommemberresponse(): boolean;
    clearDeletechatroommemberresponse(): void;
    getDeletechatroommemberresponse(): DeleteChatRoomMemberResponse | undefined;
    setDeletechatroommemberresponse(value?: DeleteChatRoomMemberResponse): ActionMessage;

    hasSetchatroomnamerequest(): boolean;
    clearSetchatroomnamerequest(): void;
    getSetchatroomnamerequest(): SetChatRoomNameRequest | undefined;
    setSetchatroomnamerequest(value?: SetChatRoomNameRequest): ActionMessage;

    hasSetchatroomnameresponse(): boolean;
    clearSetchatroomnameresponse(): void;
    getSetchatroomnameresponse(): SetChatRoomNameResponse | undefined;
    setSetchatroomnameresponse(value?: SetChatRoomNameResponse): ActionMessage;

    hasQuitchatroomrequest(): boolean;
    clearQuitchatroomrequest(): void;
    getQuitchatroomrequest(): QuitChatRoomRequest | undefined;
    setQuitchatroomrequest(value?: QuitChatRoomRequest): ActionMessage;

    hasQuitchatroomresponse(): boolean;
    clearQuitchatroomresponse(): void;
    getQuitchatroomresponse(): QuitChatRoomResponse | undefined;
    setQuitchatroomresponse(value?: QuitChatRoomResponse): ActionMessage;

    hasGetchatroomannouncementrequest(): boolean;
    clearGetchatroomannouncementrequest(): void;
    getGetchatroomannouncementrequest(): GetChatRoomAnnouncementRequest | undefined;
    setGetchatroomannouncementrequest(value?: GetChatRoomAnnouncementRequest): ActionMessage;

    hasGetchatroomannouncementresponse(): boolean;
    clearGetchatroomannouncementresponse(): void;
    getGetchatroomannouncementresponse(): GetChatRoomAnnouncementResponse | undefined;
    setGetchatroomannouncementresponse(value?: GetChatRoomAnnouncementResponse): ActionMessage;

    hasAcceptchatroominvitationrequest(): boolean;
    clearAcceptchatroominvitationrequest(): void;
    getAcceptchatroominvitationrequest(): AcceptChatRoomInvitationRequest | undefined;
    setAcceptchatroominvitationrequest(value?: AcceptChatRoomInvitationRequest): ActionMessage;

    hasAcceptchatroominvitationresponse(): boolean;
    clearAcceptchatroominvitationresponse(): void;
    getAcceptchatroominvitationresponse(): AcceptChatRoomInvitationResponse | undefined;
    setAcceptchatroominvitationresponse(value?: AcceptChatRoomInvitationResponse): ActionMessage;

    hasAddlabelrequest(): boolean;
    clearAddlabelrequest(): void;
    getAddlabelrequest(): AddLabelRequest | undefined;
    setAddlabelrequest(value?: AddLabelRequest): ActionMessage;

    hasAddlabelresponse(): boolean;
    clearAddlabelresponse(): void;
    getAddlabelresponse(): AddLabelResponse | undefined;
    setAddlabelresponse(value?: AddLabelResponse): ActionMessage;

    hasRemovelabelrequest(): boolean;
    clearRemovelabelrequest(): void;
    getRemovelabelrequest(): RemoveLabelRequest | undefined;
    setRemovelabelrequest(value?: RemoveLabelRequest): ActionMessage;

    hasRemovelabelresponse(): boolean;
    clearRemovelabelresponse(): void;
    getRemovelabelresponse(): RemoveLabelResponse | undefined;
    setRemovelabelresponse(value?: RemoveLabelResponse): ActionMessage;

    hasGetlabellistrequest(): boolean;
    clearGetlabellistrequest(): void;
    getGetlabellistrequest(): GetLabelListRequest | undefined;
    setGetlabellistrequest(value?: GetLabelListRequest): ActionMessage;

    hasGetlabellistresponse(): boolean;
    clearGetlabellistresponse(): void;
    getGetlabellistresponse(): GetLabelListResponse | undefined;
    setGetlabellistresponse(value?: GetLabelListResponse): ActionMessage;

    hasSetcontactlabelrequest(): boolean;
    clearSetcontactlabelrequest(): void;
    getSetcontactlabelrequest(): SetContactLabelRequest | undefined;
    setSetcontactlabelrequest(value?: SetContactLabelRequest): ActionMessage;

    hasSetcontactlabelresponse(): boolean;
    clearSetcontactlabelresponse(): void;
    getSetcontactlabelresponse(): SetContactLabelResponse | undefined;
    setSetcontactlabelresponse(value?: SetContactLabelResponse): ActionMessage;

    hasSnssendmomentrequest(): boolean;
    clearSnssendmomentrequest(): void;
    getSnssendmomentrequest(): SnsSendMomentRequest | undefined;
    setSnssendmomentrequest(value?: SnsSendMomentRequest): ActionMessage;

    hasSnssendmomentresponse(): boolean;
    clearSnssendmomentresponse(): void;
    getSnssendmomentresponse(): SnsSendMomentResponse | undefined;
    setSnssendmomentresponse(value?: SnsSendMomentResponse): ActionMessage;

    hasSnsforwardmomentrequest(): boolean;
    clearSnsforwardmomentrequest(): void;
    getSnsforwardmomentrequest(): SnsForwardMomentRequest | undefined;
    setSnsforwardmomentrequest(value?: SnsForwardMomentRequest): ActionMessage;

    hasSnsforwardmomentresponse(): boolean;
    clearSnsforwardmomentresponse(): void;
    getSnsforwardmomentresponse(): SnsForwardMomentResponse | undefined;
    setSnsforwardmomentresponse(value?: SnsForwardMomentResponse): ActionMessage;

    hasSnsgetuserpagerequest(): boolean;
    clearSnsgetuserpagerequest(): void;
    getSnsgetuserpagerequest(): SnsGetUserPageRequest | undefined;
    setSnsgetuserpagerequest(value?: SnsGetUserPageRequest): ActionMessage;

    hasSnsgetuserpageresponse(): boolean;
    clearSnsgetuserpageresponse(): void;
    getSnsgetuserpageresponse(): SnsGetUserPageResponse | undefined;
    setSnsgetuserpageresponse(value?: SnsGetUserPageResponse): ActionMessage;

    hasSnsgettimelinerequest(): boolean;
    clearSnsgettimelinerequest(): void;
    getSnsgettimelinerequest(): SnsGetTimelineRequest | undefined;
    setSnsgettimelinerequest(value?: SnsGetTimelineRequest): ActionMessage;

    hasSnsgettimelineresponse(): boolean;
    clearSnsgettimelineresponse(): void;
    getSnsgettimelineresponse(): SnsGetTimelineResponse | undefined;
    setSnsgettimelineresponse(value?: SnsGetTimelineResponse): ActionMessage;

    hasSnsgetmomentrequest(): boolean;
    clearSnsgetmomentrequest(): void;
    getSnsgetmomentrequest(): SnsGetMomentRequest | undefined;
    setSnsgetmomentrequest(value?: SnsGetMomentRequest): ActionMessage;

    hasSnsgetmomentresponse(): boolean;
    clearSnsgetmomentresponse(): void;
    getSnsgetmomentresponse(): SnsGetMomentResponse | undefined;
    setSnsgetmomentresponse(value?: SnsGetMomentResponse): ActionMessage;

    hasSnssendcommentrequest(): boolean;
    clearSnssendcommentrequest(): void;
    getSnssendcommentrequest(): SnsSendCommentRequest | undefined;
    setSnssendcommentrequest(value?: SnsSendCommentRequest): ActionMessage;

    hasSnssendcommentresponse(): boolean;
    clearSnssendcommentresponse(): void;
    getSnssendcommentresponse(): SnsSendCommentResponse | undefined;
    setSnssendcommentresponse(value?: SnsSendCommentResponse): ActionMessage;

    hasSnsuploadimagerequest(): boolean;
    clearSnsuploadimagerequest(): void;
    getSnsuploadimagerequest(): SnsUploadImageRequest | undefined;
    setSnsuploadimagerequest(value?: SnsUploadImageRequest): ActionMessage;

    hasSnsuploadimageresponse(): boolean;
    clearSnsuploadimageresponse(): void;
    getSnsuploadimageresponse(): SnsUploadImageResponse | undefined;
    setSnsuploadimageresponse(value?: SnsUploadImageResponse): ActionMessage;

    hasSnslikemomentrequest(): boolean;
    clearSnslikemomentrequest(): void;
    getSnslikemomentrequest(): SnsLikeMomentRequest | undefined;
    setSnslikemomentrequest(value?: SnsLikeMomentRequest): ActionMessage;

    hasSnslikemomentresponse(): boolean;
    clearSnslikemomentresponse(): void;
    getSnslikemomentresponse(): SnsLikeMomentResponse | undefined;
    setSnslikemomentresponse(value?: SnsLikeMomentResponse): ActionMessage;

    hasSnsunlikemomentrequest(): boolean;
    clearSnsunlikemomentrequest(): void;
    getSnsunlikemomentrequest(): SnsUnlikeMomentRequest | undefined;
    setSnsunlikemomentrequest(value?: SnsUnlikeMomentRequest): ActionMessage;

    hasSnsunlikemomentresponse(): boolean;
    clearSnsunlikemomentresponse(): void;
    getSnsunlikemomentresponse(): SnsUnlikeMomentResponse | undefined;
    setSnsunlikemomentresponse(value?: SnsUnlikeMomentResponse): ActionMessage;

    hasSnsremovemomentcommentrequest(): boolean;
    clearSnsremovemomentcommentrequest(): void;
    getSnsremovemomentcommentrequest(): SnsRemoveMomentCommentRequest | undefined;
    setSnsremovemomentcommentrequest(value?: SnsRemoveMomentCommentRequest): ActionMessage;

    hasSnsremovemomentcommentresponse(): boolean;
    clearSnsremovemomentcommentresponse(): void;
    getSnsremovemomentcommentresponse(): SnsRemoveMomentCommentResponse | undefined;
    setSnsremovemomentcommentresponse(value?: SnsRemoveMomentCommentResponse): ActionMessage;

    hasSnsmakemomentprivaterequest(): boolean;
    clearSnsmakemomentprivaterequest(): void;
    getSnsmakemomentprivaterequest(): SnsMakeMomentPrivateRequest | undefined;
    setSnsmakemomentprivaterequest(value?: SnsMakeMomentPrivateRequest): ActionMessage;

    hasSnsmakemomentprivateresponse(): boolean;
    clearSnsmakemomentprivateresponse(): void;
    getSnsmakemomentprivateresponse(): SnsMakeMomentPrivateResponse | undefined;
    setSnsmakemomentprivateresponse(value?: SnsMakeMomentPrivateResponse): ActionMessage;

    hasSnsmakemomentpublicrequest(): boolean;
    clearSnsmakemomentpublicrequest(): void;
    getSnsmakemomentpublicrequest(): SnsMakeMomentPublicRequest | undefined;
    setSnsmakemomentpublicrequest(value?: SnsMakeMomentPublicRequest): ActionMessage;

    hasSnsmakemomentpublicresponse(): boolean;
    clearSnsmakemomentpublicresponse(): void;
    getSnsmakemomentpublicresponse(): SnsMakeMomentPublicResponse | undefined;
    setSnsmakemomentpublicresponse(value?: SnsMakeMomentPublicResponse): ActionMessage;

    hasSnsremovemomentrequest(): boolean;
    clearSnsremovemomentrequest(): void;
    getSnsremovemomentrequest(): SnsRemoveMomentRequest | undefined;
    setSnsremovemomentrequest(value?: SnsRemoveMomentRequest): ActionMessage;

    hasSnsremovemomentresponse(): boolean;
    clearSnsremovemomentresponse(): void;
    getSnsremovemomentresponse(): SnsRemoveMomentResponse | undefined;
    setSnsremovemomentresponse(value?: SnsRemoveMomentResponse): ActionMessage;

    getPayloadCase(): ActionMessage.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ActionMessage.AsObject;
    static toObject(includeInstance: boolean, msg: ActionMessage): ActionMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ActionMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ActionMessage;
    static deserializeBinaryFromReader(message: ActionMessage, reader: jspb.BinaryReader): ActionMessage;
}

export namespace ActionMessage {
    export type AsObject = {
        header?: ActionMessageHeader.AsObject,
        wechatrequest?: WeChatRequest.AsObject,
        wechatresponse?: WeChatResponse.AsObject,
        wechatstreamrequest?: WeChatStreamRequest.AsObject,
        wechatstreamresponse?: WeChatStreamResponse.AsObject,
        wechatstreamresponsereply?: WeChatStreamResponseReply.AsObject,
        systemeventrequest?: SystemEventRequest.AsObject,
        systemeventresponse?: SystemEventResponse.AsObject,
        longlinkinitrequest?: LongLinkInitRequest.AsObject,
        longlinkinitresponse?: LongLinkInitResponse.AsObject,
        longlinkpackrequest?: LongLinkPackRequest.AsObject,
        longlinkpackresponse?: LongLinkPackResponse.AsObject,
        longlinkunpackrequest?: LongLinkUnpackRequest.AsObject,
        longlinkunpackresponse?: LongLinkUnpackResponse.AsObject,
        longlinkheartbeatrequest?: LongLinkHeartBeatRequest.AsObject,
        longlinkheartbeatresponse?: LongLinkHeartBeatResponse.AsObject,
        syncrequest?: SyncRequest.AsObject,
        syncresponse?: SyncResponse.AsObject,
        syncevent?: SyncEvent.AsObject,
        loginrequest?: LoginRequest.AsObject,
        loginupdateevent?: LoginUpdateEvent.AsObject,
        loginresponse?: LoginResponse.AsObject,
        logoutrequest?: LogoutRequest.AsObject,
        logoutresponse?: LogoutResponse.AsObject,
        sendtextmessagerequest?: SendTextMessageRequest.AsObject,
        sendtextmessageresponse?: SendTextMessageResponse.AsObject,
        sendimagemessagerequest?: SendImageMessageRequest.AsObject,
        sendimagemessageresponse?: SendImageMessageResponse.AsObject,
        sendappmessagerequest?: SendAppMessageRequest.AsObject,
        sendappmessageresponse?: SendAppMessageResponse.AsObject,
        getmessageimagerequest?: GetMessageImageRequest.AsObject,
        getmessageimageresponse?: GetMessageImageResponse.AsObject,
        getmessagevoicerequest?: GetMessageVoiceRequest.AsObject,
        getmessagevoiceresponse?: GetMessageVoiceResponse.AsObject,
        getmessagevideothumbrequest?: GetMessageVideoThumbRequest.AsObject,
        getmessagevideothumbresponse?: GetMessageVideoThumbResponse.AsObject,
        getmessagevideorequest?: GetMessageVideoRequest.AsObject,
        getmessagevideoresponse?: GetMessageVideoResponse.AsObject,
        getmessageattachrequest?: GetMessageAttachRequest.AsObject,
        getmessageattachresponse?: GetMessageAttachResponse.AsObject,
        forwardmessagerequest?: ForwardMessageRequest.AsObject,
        forwardmessageresponse?: ForwardMessageResponse.AsObject,
        getmessageattachthumbrequest?: GetMessageAttachThumbRequest.AsObject,
        getmessageattachthumbresponse?: GetMessageAttachThumbResponse.AsObject,
        revokemessagerequest?: RevokeMessageRequest.AsObject,
        revokemessageresponse?: RevokeMessageResponse.AsObject,
        sendcontactcardmessagerequest?: SendContactCardMessageRequest.AsObject,
        sendcontactcardmessageresponse?: SendContactCardMessageResponse.AsObject,
        sendvoicemessagerequest?: SendVoiceMessageRequest.AsObject,
        sendvoicemessageresponse?: SendVoiceMessageResponse.AsObject,
        sendvideomessagerequest?: SendVideoMessageRequest.AsObject,
        sendvideomessageresponse?: SendVideoMessageResponse.AsObject,
        sendfilemessagerequest?: SendFileMessageRequest.AsObject,
        sendfilemessageresponse?: SendFileMessageResponse.AsObject,
        getmessageminiprogramthumbrequest?: GetMessageMiniProgramThumbRequest.AsObject,
        getmessageminiprogramthumbresponse?: GetMessageMiniProgramThumbResponse.AsObject,
        getencryptedfilerequest?: GetEncryptedFileRequest.AsObject,
        getencryptedfileresponse?: GetEncryptedFileResponse.AsObject,
        sendemojimessagerequest?: SendEmojiMessageRequest.AsObject,
        sendemojimessageresponse?: SendEmojiMessageResponse.AsObject,
        synccontactrequest?: SyncContactRequest.AsObject,
        synccontactresponse?: SyncContactResponse.AsObject,
        acceptuserrequest?: AcceptUserRequest.AsObject,
        acceptuserresponse?: AcceptUserResponse.AsObject,
        addcontactrequest?: AddContactRequest.AsObject,
        addcontactresponse?: AddContactResponse.AsObject,
        deletecontactrequest?: DeleteContactRequest.AsObject,
        deletecontactresponse?: DeleteContactResponse.AsObject,
        getcontactrequest?: GetContactRequest.AsObject,
        getcontactresponse?: GetContactResponse.AsObject,
        getcontactqrcoderequest?: GetContactQRCodeRequest.AsObject,
        getcontactqrcoderesponse?: GetContactQRCodeResponse.AsObject,
        searchcontactrequest?: SearchContactRequest.AsObject,
        searchcontactresponse?: SearchContactResponse.AsObject,
        updateselfnicknamerequest?: UpdateSelfNickNameRequest.AsObject,
        updateselfnicknameresponse?: UpdateSelfNickNameResponse.AsObject,
        updateselfsignaturerequest?: UpdateSelfSignatureRequest.AsObject,
        updateselfsignatureresponse?: UpdateSelfSignatureResponse.AsObject,
        zombietestrequest?: ZombieTestRequest.AsObject,
        zombietestresponse?: ZombieTestResponse.AsObject,
        updatecontactremarkrequest?: UpdateContactRemarkRequest.AsObject,
        updatecontactremarkresponse?: UpdateContactRemarkResponse.AsObject,
        createchatroomrequest?: CreateChatRoomRequest.AsObject,
        createchatroomresponse?: CreateChatRoomResponse.AsObject,
        getchatroommembersrequest?: GetChatRoomMembersRequest.AsObject,
        getchatroommembersresponse?: GetChatRoomMembersResponse.AsObject,
        getchatroomqrcoderequest?: GetChatRoomQrCodeRequest.AsObject,
        getchatroomqrcoderesponse?: GetChatRoomQrCodeResponse.AsObject,
        getchatroommemberrequest?: GetChatRoomMemberRequest.AsObject,
        getchatroommemberresponse?: GetChatRoomMemberResponse.AsObject,
        setchatroomannouncementrequest?: SetChatRoomAnnouncementRequest.AsObject,
        setchatroomannouncementresponse?: SetChatRoomAnnouncementResponse.AsObject,
        addchatroommemberrequest?: AddChatRoomMemberRequest.AsObject,
        addchatroommemberresponse?: AddChatRoomMemberResponse.AsObject,
        deletechatroommemberrequest?: DeleteChatRoomMemberRequest.AsObject,
        deletechatroommemberresponse?: DeleteChatRoomMemberResponse.AsObject,
        setchatroomnamerequest?: SetChatRoomNameRequest.AsObject,
        setchatroomnameresponse?: SetChatRoomNameResponse.AsObject,
        quitchatroomrequest?: QuitChatRoomRequest.AsObject,
        quitchatroomresponse?: QuitChatRoomResponse.AsObject,
        getchatroomannouncementrequest?: GetChatRoomAnnouncementRequest.AsObject,
        getchatroomannouncementresponse?: GetChatRoomAnnouncementResponse.AsObject,
        acceptchatroominvitationrequest?: AcceptChatRoomInvitationRequest.AsObject,
        acceptchatroominvitationresponse?: AcceptChatRoomInvitationResponse.AsObject,
        addlabelrequest?: AddLabelRequest.AsObject,
        addlabelresponse?: AddLabelResponse.AsObject,
        removelabelrequest?: RemoveLabelRequest.AsObject,
        removelabelresponse?: RemoveLabelResponse.AsObject,
        getlabellistrequest?: GetLabelListRequest.AsObject,
        getlabellistresponse?: GetLabelListResponse.AsObject,
        setcontactlabelrequest?: SetContactLabelRequest.AsObject,
        setcontactlabelresponse?: SetContactLabelResponse.AsObject,
        snssendmomentrequest?: SnsSendMomentRequest.AsObject,
        snssendmomentresponse?: SnsSendMomentResponse.AsObject,
        snsforwardmomentrequest?: SnsForwardMomentRequest.AsObject,
        snsforwardmomentresponse?: SnsForwardMomentResponse.AsObject,
        snsgetuserpagerequest?: SnsGetUserPageRequest.AsObject,
        snsgetuserpageresponse?: SnsGetUserPageResponse.AsObject,
        snsgettimelinerequest?: SnsGetTimelineRequest.AsObject,
        snsgettimelineresponse?: SnsGetTimelineResponse.AsObject,
        snsgetmomentrequest?: SnsGetMomentRequest.AsObject,
        snsgetmomentresponse?: SnsGetMomentResponse.AsObject,
        snssendcommentrequest?: SnsSendCommentRequest.AsObject,
        snssendcommentresponse?: SnsSendCommentResponse.AsObject,
        snsuploadimagerequest?: SnsUploadImageRequest.AsObject,
        snsuploadimageresponse?: SnsUploadImageResponse.AsObject,
        snslikemomentrequest?: SnsLikeMomentRequest.AsObject,
        snslikemomentresponse?: SnsLikeMomentResponse.AsObject,
        snsunlikemomentrequest?: SnsUnlikeMomentRequest.AsObject,
        snsunlikemomentresponse?: SnsUnlikeMomentResponse.AsObject,
        snsremovemomentcommentrequest?: SnsRemoveMomentCommentRequest.AsObject,
        snsremovemomentcommentresponse?: SnsRemoveMomentCommentResponse.AsObject,
        snsmakemomentprivaterequest?: SnsMakeMomentPrivateRequest.AsObject,
        snsmakemomentprivateresponse?: SnsMakeMomentPrivateResponse.AsObject,
        snsmakemomentpublicrequest?: SnsMakeMomentPublicRequest.AsObject,
        snsmakemomentpublicresponse?: SnsMakeMomentPublicResponse.AsObject,
        snsremovemomentrequest?: SnsRemoveMomentRequest.AsObject,
        snsremovemomentresponse?: SnsRemoveMomentResponse.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        WECHATREQUEST = 10,
        WECHATRESPONSE = 11,
        WECHATSTREAMREQUEST = 12,
        WECHATSTREAMRESPONSE = 13,
        WECHATSTREAMRESPONSEREPLY = 14,
        SYSTEMEVENTREQUEST = 15,
        SYSTEMEVENTRESPONSE = 16,
        LONGLINKINITREQUEST = 80,
        LONGLINKINITRESPONSE = 81,
        LONGLINKPACKREQUEST = 82,
        LONGLINKPACKRESPONSE = 83,
        LONGLINKUNPACKREQUEST = 84,
        LONGLINKUNPACKRESPONSE = 85,
        LONGLINKHEARTBEATREQUEST = 86,
        LONGLINKHEARTBEATRESPONSE = 87,
        SYNCREQUEST = 100,
        SYNCRESPONSE = 101,
        SYNCEVENT = 102,
        LOGINREQUEST = 200,
        LOGINUPDATEEVENT = 201,
        LOGINRESPONSE = 202,
        LOGOUTREQUEST = 203,
        LOGOUTRESPONSE = 204,
        SENDTEXTMESSAGEREQUEST = 300,
        SENDTEXTMESSAGERESPONSE = 301,
        SENDIMAGEMESSAGEREQUEST = 302,
        SENDIMAGEMESSAGERESPONSE = 303,
        SENDAPPMESSAGEREQUEST = 304,
        SENDAPPMESSAGERESPONSE = 305,
        GETMESSAGEIMAGEREQUEST = 306,
        GETMESSAGEIMAGERESPONSE = 307,
        GETMESSAGEVOICEREQUEST = 308,
        GETMESSAGEVOICERESPONSE = 309,
        GETMESSAGEVIDEOTHUMBREQUEST = 310,
        GETMESSAGEVIDEOTHUMBRESPONSE = 311,
        GETMESSAGEVIDEOREQUEST = 312,
        GETMESSAGEVIDEORESPONSE = 313,
        GETMESSAGEATTACHREQUEST = 314,
        GETMESSAGEATTACHRESPONSE = 315,
        FORWARDMESSAGEREQUEST = 316,
        FORWARDMESSAGERESPONSE = 317,
        GETMESSAGEATTACHTHUMBREQUEST = 318,
        GETMESSAGEATTACHTHUMBRESPONSE = 319,
        REVOKEMESSAGEREQUEST = 320,
        REVOKEMESSAGERESPONSE = 321,
        SENDCONTACTCARDMESSAGEREQUEST = 322,
        SENDCONTACTCARDMESSAGERESPONSE = 323,
        SENDVOICEMESSAGEREQUEST = 324,
        SENDVOICEMESSAGERESPONSE = 325,
        SENDVIDEOMESSAGEREQUEST = 326,
        SENDVIDEOMESSAGERESPONSE = 327,
        SENDFILEMESSAGEREQUEST = 328,
        SENDFILEMESSAGERESPONSE = 329,
        GETMESSAGEMINIPROGRAMTHUMBREQUEST = 330,
        GETMESSAGEMINIPROGRAMTHUMBRESPONSE = 331,
        GETENCRYPTEDFILEREQUEST = 332,
        GETENCRYPTEDFILERESPONSE = 333,
        SENDEMOJIMESSAGEREQUEST = 334,
        SENDEMOJIMESSAGERESPONSE = 335,
        SYNCCONTACTREQUEST = 400,
        SYNCCONTACTRESPONSE = 401,
        ACCEPTUSERREQUEST = 402,
        ACCEPTUSERRESPONSE = 403,
        ADDCONTACTREQUEST = 404,
        ADDCONTACTRESPONSE = 405,
        DELETECONTACTREQUEST = 406,
        DELETECONTACTRESPONSE = 407,
        GETCONTACTREQUEST = 408,
        GETCONTACTRESPONSE = 409,
        GETCONTACTQRCODEREQUEST = 410,
        GETCONTACTQRCODERESPONSE = 411,
        SEARCHCONTACTREQUEST = 412,
        SEARCHCONTACTRESPONSE = 413,
        UPDATESELFNICKNAMEREQUEST = 414,
        UPDATESELFNICKNAMERESPONSE = 415,
        UPDATESELFSIGNATUREREQUEST = 416,
        UPDATESELFSIGNATURERESPONSE = 417,
        ZOMBIETESTREQUEST = 418,
        ZOMBIETESTRESPONSE = 419,
        UPDATECONTACTREMARKREQUEST = 420,
        UPDATECONTACTREMARKRESPONSE = 421,
        CREATECHATROOMREQUEST = 500,
        CREATECHATROOMRESPONSE = 501,
        GETCHATROOMMEMBERSREQUEST = 502,
        GETCHATROOMMEMBERSRESPONSE = 503,
        GETCHATROOMQRCODEREQUEST = 504,
        GETCHATROOMQRCODERESPONSE = 505,
        GETCHATROOMMEMBERREQUEST = 506,
        GETCHATROOMMEMBERRESPONSE = 507,
        SETCHATROOMANNOUNCEMENTREQUEST = 508,
        SETCHATROOMANNOUNCEMENTRESPONSE = 509,
        ADDCHATROOMMEMBERREQUEST = 510,
        ADDCHATROOMMEMBERRESPONSE = 511,
        DELETECHATROOMMEMBERREQUEST = 514,
        DELETECHATROOMMEMBERRESPONSE = 515,
        SETCHATROOMNAMEREQUEST = 516,
        SETCHATROOMNAMERESPONSE = 517,
        QUITCHATROOMREQUEST = 518,
        QUITCHATROOMRESPONSE = 519,
        GETCHATROOMANNOUNCEMENTREQUEST = 520,
        GETCHATROOMANNOUNCEMENTRESPONSE = 521,
        ACCEPTCHATROOMINVITATIONREQUEST = 522,
        ACCEPTCHATROOMINVITATIONRESPONSE = 523,
        ADDLABELREQUEST = 600,
        ADDLABELRESPONSE = 601,
        REMOVELABELREQUEST = 602,
        REMOVELABELRESPONSE = 603,
        GETLABELLISTREQUEST = 604,
        GETLABELLISTRESPONSE = 605,
        SETCONTACTLABELREQUEST = 606,
        SETCONTACTLABELRESPONSE = 607,
        SNSSENDMOMENTREQUEST = 700,
        SNSSENDMOMENTRESPONSE = 701,
        SNSFORWARDMOMENTREQUEST = 702,
        SNSFORWARDMOMENTRESPONSE = 703,
        SNSGETUSERPAGEREQUEST = 704,
        SNSGETUSERPAGERESPONSE = 705,
        SNSGETTIMELINEREQUEST = 706,
        SNSGETTIMELINERESPONSE = 707,
        SNSGETMOMENTREQUEST = 708,
        SNSGETMOMENTRESPONSE = 709,
        SNSSENDCOMMENTREQUEST = 710,
        SNSSENDCOMMENTRESPONSE = 711,
        SNSUPLOADIMAGEREQUEST = 712,
        SNSUPLOADIMAGERESPONSE = 713,
        SNSLIKEMOMENTREQUEST = 714,
        SNSLIKEMOMENTRESPONSE = 715,
        SNSUNLIKEMOMENTREQUEST = 716,
        SNSUNLIKEMOMENTRESPONSE = 717,
        SNSREMOVEMOMENTCOMMENTREQUEST = 718,
        SNSREMOVEMOMENTCOMMENTRESPONSE = 719,
        SNSMAKEMOMENTPRIVATEREQUEST = 720,
        SNSMAKEMOMENTPRIVATERESPONSE = 721,
        SNSMAKEMOMENTPUBLICREQUEST = 722,
        SNSMAKEMOMENTPUBLICRESPONSE = 723,
        SNSREMOVEMOMENTREQUEST = 724,
        SNSREMOVEMOMENTRESPONSE = 725,
    }

}

export class InitRequest extends jspb.Message { 
    getToken(): string;
    setToken(value: string): InitRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InitRequest.AsObject;
    static toObject(includeInstance: boolean, msg: InitRequest): InitRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InitRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InitRequest;
    static deserializeBinaryFromReader(message: InitRequest, reader: jspb.BinaryReader): InitRequest;
}

export namespace InitRequest {
    export type AsObject = {
        token: string,
    }
}

export class ServerInfo extends jspb.Message { 

    hasHost(): boolean;
    clearHost(): void;
    getHost(): Host | undefined;
    setHost(value?: Host): ServerInfo;
    getPdltoken(): string;
    setPdltoken(value: string): ServerInfo;
    getServerca(): Uint8Array | string;
    getServerca_asU8(): Uint8Array;
    getServerca_asB64(): string;
    setServerca(value: Uint8Array | string): ServerInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ServerInfo.AsObject;
    static toObject(includeInstance: boolean, msg: ServerInfo): ServerInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ServerInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ServerInfo;
    static deserializeBinaryFromReader(message: ServerInfo, reader: jspb.BinaryReader): ServerInfo;
}

export namespace ServerInfo {
    export type AsObject = {
        host?: Host.AsObject,
        pdltoken: string,
        serverca: Uint8Array | string,
    }
}

export class InitResponse extends jspb.Message { 

    hasServerinfo(): boolean;
    clearServerinfo(): void;
    getServerinfo(): ServerInfo | undefined;
    setServerinfo(value?: ServerInfo): InitResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InitResponse.AsObject;
    static toObject(includeInstance: boolean, msg: InitResponse): InitResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InitResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InitResponse;
    static deserializeBinaryFromReader(message: InitResponse, reader: jspb.BinaryReader): InitResponse;
}

export namespace InitResponse {
    export type AsObject = {
        serverinfo?: ServerInfo.AsObject,
    }
}

export class WeChatLongLinkRequest extends jspb.Message { 
    getMessageid(): string;
    setMessageid(value: string): WeChatLongLinkRequest;
    getLonglinkid(): string;
    setLonglinkid(value: string): WeChatLongLinkRequest;
    getInitphase(): boolean;
    setInitphase(value: boolean): WeChatLongLinkRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatLongLinkRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatLongLinkRequest): WeChatLongLinkRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatLongLinkRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatLongLinkRequest;
    static deserializeBinaryFromReader(message: WeChatLongLinkRequest, reader: jspb.BinaryReader): WeChatLongLinkRequest;
}

export namespace WeChatLongLinkRequest {
    export type AsObject = {
        messageid: string,
        longlinkid: string,
        initphase: boolean,
    }
}

export class WeChatLongLinkResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatLongLinkResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatLongLinkResponse): WeChatLongLinkResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatLongLinkResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatLongLinkResponse;
    static deserializeBinaryFromReader(message: WeChatLongLinkResponse, reader: jspb.BinaryReader): WeChatLongLinkResponse;
}

export namespace WeChatLongLinkResponse {
    export type AsObject = {
    }
}

export class WeChatShortLinkRequest extends jspb.Message { 

    hasHost(): boolean;
    clearHost(): void;
    getHost(): Host | undefined;
    setHost(value?: Host): WeChatShortLinkRequest;
    getPath(): string;
    setPath(value: string): WeChatShortLinkRequest;
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): WeChatShortLinkRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatShortLinkRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatShortLinkRequest): WeChatShortLinkRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatShortLinkRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatShortLinkRequest;
    static deserializeBinaryFromReader(message: WeChatShortLinkRequest, reader: jspb.BinaryReader): WeChatShortLinkRequest;
}

export namespace WeChatShortLinkRequest {
    export type AsObject = {
        host?: Host.AsObject,
        path: string,
        payload: Uint8Array | string,
    }
}

export class WeChatShortLinkResponse extends jspb.Message { 
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): WeChatShortLinkResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatShortLinkResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatShortLinkResponse): WeChatShortLinkResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatShortLinkResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatShortLinkResponse;
    static deserializeBinaryFromReader(message: WeChatShortLinkResponse, reader: jspb.BinaryReader): WeChatShortLinkResponse;
}

export namespace WeChatShortLinkResponse {
    export type AsObject = {
        payload: Uint8Array | string,
    }
}

export class WeChatHttpRequest extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): WeChatHttpRequest;
    getMethod(): string;
    setMethod(value: string): WeChatHttpRequest;

    getHeadersMap(): jspb.Map<string, string>;
    clearHeadersMap(): void;
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): WeChatHttpRequest;
    getTimeout(): number;
    setTimeout(value: number): WeChatHttpRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatHttpRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatHttpRequest): WeChatHttpRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatHttpRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatHttpRequest;
    static deserializeBinaryFromReader(message: WeChatHttpRequest, reader: jspb.BinaryReader): WeChatHttpRequest;
}

export namespace WeChatHttpRequest {
    export type AsObject = {
        url: string,
        method: string,

        headersMap: Array<[string, string]>,
        payload: Uint8Array | string,
        timeout: number,
    }
}

export class WeChatHttpResponse extends jspb.Message { 
    getStatuscode(): number;
    setStatuscode(value: number): WeChatHttpResponse;

    getHeadersMap(): jspb.Map<string, string>;
    clearHeadersMap(): void;
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): WeChatHttpResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatHttpResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatHttpResponse): WeChatHttpResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatHttpResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatHttpResponse;
    static deserializeBinaryFromReader(message: WeChatHttpResponse, reader: jspb.BinaryReader): WeChatHttpResponse;
}

export namespace WeChatHttpResponse {
    export type AsObject = {
        statuscode: number,

        headersMap: Array<[string, string]>,
        payload: Uint8Array | string,
    }
}

export class WeChatRequest extends jspb.Message { 

    hasLonglinkrequest(): boolean;
    clearLonglinkrequest(): void;
    getLonglinkrequest(): WeChatLongLinkRequest | undefined;
    setLonglinkrequest(value?: WeChatLongLinkRequest): WeChatRequest;

    hasShortlinkrequest(): boolean;
    clearShortlinkrequest(): void;
    getShortlinkrequest(): WeChatShortLinkRequest | undefined;
    setShortlinkrequest(value?: WeChatShortLinkRequest): WeChatRequest;

    hasHttprequest(): boolean;
    clearHttprequest(): void;
    getHttprequest(): WeChatHttpRequest | undefined;
    setHttprequest(value?: WeChatHttpRequest): WeChatRequest;

    getPayloadCase(): WeChatRequest.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatRequest): WeChatRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatRequest;
    static deserializeBinaryFromReader(message: WeChatRequest, reader: jspb.BinaryReader): WeChatRequest;
}

export namespace WeChatRequest {
    export type AsObject = {
        longlinkrequest?: WeChatLongLinkRequest.AsObject,
        shortlinkrequest?: WeChatShortLinkRequest.AsObject,
        httprequest?: WeChatHttpRequest.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        LONGLINKREQUEST = 10,
        SHORTLINKREQUEST = 11,
        HTTPREQUEST = 12,
    }

}

export class WeChatResponse extends jspb.Message { 

    hasLonglinkresponse(): boolean;
    clearLonglinkresponse(): void;
    getLonglinkresponse(): WeChatLongLinkResponse | undefined;
    setLonglinkresponse(value?: WeChatLongLinkResponse): WeChatResponse;

    hasShortlinkresponse(): boolean;
    clearShortlinkresponse(): void;
    getShortlinkresponse(): WeChatShortLinkResponse | undefined;
    setShortlinkresponse(value?: WeChatShortLinkResponse): WeChatResponse;

    hasHttpresponse(): boolean;
    clearHttpresponse(): void;
    getHttpresponse(): WeChatHttpResponse | undefined;
    setHttpresponse(value?: WeChatHttpResponse): WeChatResponse;

    getPayloadCase(): WeChatResponse.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatResponse): WeChatResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatResponse;
    static deserializeBinaryFromReader(message: WeChatResponse, reader: jspb.BinaryReader): WeChatResponse;
}

export namespace WeChatResponse {
    export type AsObject = {
        longlinkresponse?: WeChatLongLinkResponse.AsObject,
        shortlinkresponse?: WeChatShortLinkResponse.AsObject,
        httpresponse?: WeChatHttpResponse.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        LONGLINKRESPONSE = 10,
        SHORTLINKRESPONSE = 11,
        HTTPRESPONSE = 12,
    }

}

export class WeChatLongLinkStreamRequest extends jspb.Message { 
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): WeChatLongLinkStreamRequest;
    getLonglinkid(): string;
    setLonglinkid(value: string): WeChatLongLinkStreamRequest;
    getInitphase(): boolean;
    setInitphase(value: boolean): WeChatLongLinkStreamRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatLongLinkStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatLongLinkStreamRequest): WeChatLongLinkStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatLongLinkStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatLongLinkStreamRequest;
    static deserializeBinaryFromReader(message: WeChatLongLinkStreamRequest, reader: jspb.BinaryReader): WeChatLongLinkStreamRequest;
}

export namespace WeChatLongLinkStreamRequest {
    export type AsObject = {
        payload: Uint8Array | string,
        longlinkid: string,
        initphase: boolean,
    }
}

export class WeChatLongLinkStreamResponse extends jspb.Message { 
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): WeChatLongLinkStreamResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatLongLinkStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatLongLinkStreamResponse): WeChatLongLinkStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatLongLinkStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatLongLinkStreamResponse;
    static deserializeBinaryFromReader(message: WeChatLongLinkStreamResponse, reader: jspb.BinaryReader): WeChatLongLinkStreamResponse;
}

export namespace WeChatLongLinkStreamResponse {
    export type AsObject = {
        payload: Uint8Array | string,
    }
}

export class WeChatLongLinkStreamResponseReply extends jspb.Message { 
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): WeChatLongLinkStreamResponseReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatLongLinkStreamResponseReply.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatLongLinkStreamResponseReply): WeChatLongLinkStreamResponseReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatLongLinkStreamResponseReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatLongLinkStreamResponseReply;
    static deserializeBinaryFromReader(message: WeChatLongLinkStreamResponseReply, reader: jspb.BinaryReader): WeChatLongLinkStreamResponseReply;
}

export namespace WeChatLongLinkStreamResponseReply {
    export type AsObject = {
        payload: Uint8Array | string,
    }
}

export class WeChatSocketRequest extends jspb.Message { 

    hasHost(): boolean;
    clearHost(): void;
    getHost(): Host | undefined;
    setHost(value?: Host): WeChatSocketRequest;
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): WeChatSocketRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatSocketRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatSocketRequest): WeChatSocketRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatSocketRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatSocketRequest;
    static deserializeBinaryFromReader(message: WeChatSocketRequest, reader: jspb.BinaryReader): WeChatSocketRequest;
}

export namespace WeChatSocketRequest {
    export type AsObject = {
        host?: Host.AsObject,
        payload: Uint8Array | string,
    }
}

export class WeChatSocketResponse extends jspb.Message { 
    getSocketreset(): boolean;
    setSocketreset(value: boolean): WeChatSocketResponse;
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): WeChatSocketResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatSocketResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatSocketResponse): WeChatSocketResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatSocketResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatSocketResponse;
    static deserializeBinaryFromReader(message: WeChatSocketResponse, reader: jspb.BinaryReader): WeChatSocketResponse;
}

export namespace WeChatSocketResponse {
    export type AsObject = {
        socketreset: boolean,
        payload: Uint8Array | string,
    }
}

export class WeChatSocketResponseReply extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatSocketResponseReply.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatSocketResponseReply): WeChatSocketResponseReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatSocketResponseReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatSocketResponseReply;
    static deserializeBinaryFromReader(message: WeChatSocketResponseReply, reader: jspb.BinaryReader): WeChatSocketResponseReply;
}

export namespace WeChatSocketResponseReply {
    export type AsObject = {
    }
}

export class FileUploadDataMeta extends jspb.Message { 
    getSize(): number;
    setSize(value: number): FileUploadDataMeta;
    getMd5(): string;
    setMd5(value: string): FileUploadDataMeta;
    getChecksum(): number;
    setChecksum(value: number): FileUploadDataMeta;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileUploadDataMeta.AsObject;
    static toObject(includeInstance: boolean, msg: FileUploadDataMeta): FileUploadDataMeta.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileUploadDataMeta, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileUploadDataMeta;
    static deserializeBinaryFromReader(message: FileUploadDataMeta, reader: jspb.BinaryReader): FileUploadDataMeta;
}

export namespace FileUploadDataMeta {
    export type AsObject = {
        size: number,
        md5: string,
        checksum: number,
    }
}

export class FileUploadEncryptedDataMeta extends jspb.Message { 
    getSize(): number;
    setSize(value: number): FileUploadEncryptedDataMeta;
    getMd5(): string;
    setMd5(value: string): FileUploadEncryptedDataMeta;
    getChecksum(): number;
    setChecksum(value: number): FileUploadEncryptedDataMeta;
    getAeskey(): Uint8Array | string;
    getAeskey_asU8(): Uint8Array;
    getAeskey_asB64(): string;
    setAeskey(value: Uint8Array | string): FileUploadEncryptedDataMeta;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileUploadEncryptedDataMeta.AsObject;
    static toObject(includeInstance: boolean, msg: FileUploadEncryptedDataMeta): FileUploadEncryptedDataMeta.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileUploadEncryptedDataMeta, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileUploadEncryptedDataMeta;
    static deserializeBinaryFromReader(message: FileUploadEncryptedDataMeta, reader: jspb.BinaryReader): FileUploadEncryptedDataMeta;
}

export namespace FileUploadEncryptedDataMeta {
    export type AsObject = {
        size: number,
        md5: string,
        checksum: number,
        aeskey: Uint8Array | string,
    }
}

export class FileUploadImageMeta extends jspb.Message { 

    hasPlaindatameta(): boolean;
    clearPlaindatameta(): void;
    getPlaindatameta(): FileUploadDataMeta | undefined;
    setPlaindatameta(value?: FileUploadDataMeta): FileUploadImageMeta;

    hasEncrypteddatameta(): boolean;
    clearEncrypteddatameta(): void;
    getEncrypteddatameta(): FileUploadEncryptedDataMeta | undefined;
    setEncrypteddatameta(value?: FileUploadEncryptedDataMeta): FileUploadImageMeta;
    getWidth(): number;
    setWidth(value: number): FileUploadImageMeta;
    getHeight(): number;
    setHeight(value: number): FileUploadImageMeta;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileUploadImageMeta.AsObject;
    static toObject(includeInstance: boolean, msg: FileUploadImageMeta): FileUploadImageMeta.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileUploadImageMeta, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileUploadImageMeta;
    static deserializeBinaryFromReader(message: FileUploadImageMeta, reader: jspb.BinaryReader): FileUploadImageMeta;
}

export namespace FileUploadImageMeta {
    export type AsObject = {
        plaindatameta?: FileUploadDataMeta.AsObject,
        encrypteddatameta?: FileUploadEncryptedDataMeta.AsObject,
        width: number,
        height: number,
    }
}

export class FileUploadVideoMeta extends jspb.Message { 

    hasPlaindatameta(): boolean;
    clearPlaindatameta(): void;
    getPlaindatameta(): FileUploadDataMeta | undefined;
    setPlaindatameta(value?: FileUploadDataMeta): FileUploadVideoMeta;

    hasEncrypteddatameta(): boolean;
    clearEncrypteddatameta(): void;
    getEncrypteddatameta(): FileUploadEncryptedDataMeta | undefined;
    setEncrypteddatameta(value?: FileUploadEncryptedDataMeta): FileUploadVideoMeta;
    getDuration(): number;
    setDuration(value: number): FileUploadVideoMeta;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileUploadVideoMeta.AsObject;
    static toObject(includeInstance: boolean, msg: FileUploadVideoMeta): FileUploadVideoMeta.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileUploadVideoMeta, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileUploadVideoMeta;
    static deserializeBinaryFromReader(message: FileUploadVideoMeta, reader: jspb.BinaryReader): FileUploadVideoMeta;
}

export namespace FileUploadVideoMeta {
    export type AsObject = {
        plaindatameta?: FileUploadDataMeta.AsObject,
        encrypteddatameta?: FileUploadEncryptedDataMeta.AsObject,
        duration: number,
    }
}

export class FileUploadImageParams extends jspb.Message { 

    hasImagemeta(): boolean;
    clearImagemeta(): void;
    getImagemeta(): FileUploadImageMeta | undefined;
    setImagemeta(value?: FileUploadImageMeta): FileUploadImageParams;

    hasThumbimagemeta(): boolean;
    clearThumbimagemeta(): void;
    getThumbimagemeta(): FileUploadImageMeta | undefined;
    setThumbimagemeta(value?: FileUploadImageMeta): FileUploadImageParams;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileUploadImageParams.AsObject;
    static toObject(includeInstance: boolean, msg: FileUploadImageParams): FileUploadImageParams.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileUploadImageParams, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileUploadImageParams;
    static deserializeBinaryFromReader(message: FileUploadImageParams, reader: jspb.BinaryReader): FileUploadImageParams;
}

export namespace FileUploadImageParams {
    export type AsObject = {
        imagemeta?: FileUploadImageMeta.AsObject,
        thumbimagemeta?: FileUploadImageMeta.AsObject,
    }
}

export class FileUploadVideoParams extends jspb.Message { 

    hasVideometa(): boolean;
    clearVideometa(): void;
    getVideometa(): FileUploadVideoMeta | undefined;
    setVideometa(value?: FileUploadVideoMeta): FileUploadVideoParams;

    hasThumbimagemeta(): boolean;
    clearThumbimagemeta(): void;
    getThumbimagemeta(): FileUploadImageMeta | undefined;
    setThumbimagemeta(value?: FileUploadImageMeta): FileUploadVideoParams;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileUploadVideoParams.AsObject;
    static toObject(includeInstance: boolean, msg: FileUploadVideoParams): FileUploadVideoParams.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileUploadVideoParams, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileUploadVideoParams;
    static deserializeBinaryFromReader(message: FileUploadVideoParams, reader: jspb.BinaryReader): FileUploadVideoParams;
}

export namespace FileUploadVideoParams {
    export type AsObject = {
        videometa?: FileUploadVideoMeta.AsObject,
        thumbimagemeta?: FileUploadImageMeta.AsObject,
    }
}

export class FileUploadFileParams extends jspb.Message { 

    hasPlaindatameta(): boolean;
    clearPlaindatameta(): void;
    getPlaindatameta(): FileUploadDataMeta | undefined;
    setPlaindatameta(value?: FileUploadDataMeta): FileUploadFileParams;

    hasEncrypteddatameta(): boolean;
    clearEncrypteddatameta(): void;
    getEncrypteddatameta(): FileUploadEncryptedDataMeta | undefined;
    setEncrypteddatameta(value?: FileUploadEncryptedDataMeta): FileUploadFileParams;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileUploadFileParams.AsObject;
    static toObject(includeInstance: boolean, msg: FileUploadFileParams): FileUploadFileParams.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileUploadFileParams, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileUploadFileParams;
    static deserializeBinaryFromReader(message: FileUploadFileParams, reader: jspb.BinaryReader): FileUploadFileParams;
}

export namespace FileUploadFileParams {
    export type AsObject = {
        plaindatameta?: FileUploadDataMeta.AsObject,
        encrypteddatameta?: FileUploadEncryptedDataMeta.AsObject,
    }
}

export class FileUploadPayloadFragment extends jspb.Message { 

    hasBinary(): boolean;
    clearBinary(): void;
    getBinary(): Uint8Array | string;
    getBinary_asU8(): Uint8Array;
    getBinary_asB64(): string;
    setBinary(value: Uint8Array | string): FileUploadPayloadFragment;

    hasPlaceholderbinarymd5(): boolean;
    clearPlaceholderbinarymd5(): void;
    getPlaceholderbinarymd5(): string;
    setPlaceholderbinarymd5(value: string): FileUploadPayloadFragment;

    getPayloadCase(): FileUploadPayloadFragment.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileUploadPayloadFragment.AsObject;
    static toObject(includeInstance: boolean, msg: FileUploadPayloadFragment): FileUploadPayloadFragment.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileUploadPayloadFragment, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileUploadPayloadFragment;
    static deserializeBinaryFromReader(message: FileUploadPayloadFragment, reader: jspb.BinaryReader): FileUploadPayloadFragment;
}

export namespace FileUploadPayloadFragment {
    export type AsObject = {
        binary: Uint8Array | string,
        placeholderbinarymd5: string,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        BINARY = 1,
        PLACEHOLDERBINARYMD5 = 2,
    }

}

export class FileUploadPayload extends jspb.Message { 
    clearFragmentList(): void;
    getFragmentList(): Array<FileUploadPayloadFragment>;
    setFragmentList(value: Array<FileUploadPayloadFragment>): FileUploadPayload;
    addFragment(value?: FileUploadPayloadFragment, index?: number): FileUploadPayloadFragment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileUploadPayload.AsObject;
    static toObject(includeInstance: boolean, msg: FileUploadPayload): FileUploadPayload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileUploadPayload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileUploadPayload;
    static deserializeBinaryFromReader(message: FileUploadPayload, reader: jspb.BinaryReader): FileUploadPayload;
}

export namespace FileUploadPayload {
    export type AsObject = {
        fragmentList: Array<FileUploadPayloadFragment.AsObject>,
    }
}

export class WeChatFileUploadRequest extends jspb.Message { 

    hasHost(): boolean;
    clearHost(): void;
    getHost(): Host | undefined;
    setHost(value?: Host): WeChatFileUploadRequest;

    hasPayload(): boolean;
    clearPayload(): void;
    getPayload(): FileUploadPayload | undefined;
    setPayload(value?: FileUploadPayload): WeChatFileUploadRequest;
    clearRequireresponsefieldList(): void;
    getRequireresponsefieldList(): Array<string>;
    setRequireresponsefieldList(value: Array<string>): WeChatFileUploadRequest;
    addRequireresponsefield(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatFileUploadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatFileUploadRequest): WeChatFileUploadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatFileUploadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatFileUploadRequest;
    static deserializeBinaryFromReader(message: WeChatFileUploadRequest, reader: jspb.BinaryReader): WeChatFileUploadRequest;
}

export namespace WeChatFileUploadRequest {
    export type AsObject = {
        host?: Host.AsObject,
        payload?: FileUploadPayload.AsObject,
        requireresponsefieldList: Array<string>,
    }
}

export class WeChatFileUploadResponse extends jspb.Message { 

    getResponseMap(): jspb.Map<string, Uint8Array | string>;
    clearResponseMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatFileUploadResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatFileUploadResponse): WeChatFileUploadResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatFileUploadResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatFileUploadResponse;
    static deserializeBinaryFromReader(message: WeChatFileUploadResponse, reader: jspb.BinaryReader): WeChatFileUploadResponse;
}

export namespace WeChatFileUploadResponse {
    export type AsObject = {

        responseMap: Array<[string, Uint8Array | string]>,
    }
}

export class WeChatFileUploadResponseReply extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatFileUploadResponseReply.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatFileUploadResponseReply): WeChatFileUploadResponseReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatFileUploadResponseReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatFileUploadResponseReply;
    static deserializeBinaryFromReader(message: WeChatFileUploadResponseReply, reader: jspb.BinaryReader): WeChatFileUploadResponseReply;
}

export namespace WeChatFileUploadResponseReply {
    export type AsObject = {
    }
}

export class WeChatPushSubscribeRequest extends jspb.Message { 
    clearPushtypeList(): void;
    getPushtypeList(): Array<LongLinkMessagePushType>;
    setPushtypeList(value: Array<LongLinkMessagePushType>): WeChatPushSubscribeRequest;
    addPushtype(value: LongLinkMessagePushType, index?: number): LongLinkMessagePushType;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatPushSubscribeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatPushSubscribeRequest): WeChatPushSubscribeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatPushSubscribeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatPushSubscribeRequest;
    static deserializeBinaryFromReader(message: WeChatPushSubscribeRequest, reader: jspb.BinaryReader): WeChatPushSubscribeRequest;
}

export namespace WeChatPushSubscribeRequest {
    export type AsObject = {
        pushtypeList: Array<LongLinkMessagePushType>,
    }
}

export class WeChatPushSubscribeResponse extends jspb.Message { 
    clearMessageList(): void;
    getMessageList(): Array<LongLinkMessage>;
    setMessageList(value: Array<LongLinkMessage>): WeChatPushSubscribeResponse;
    addMessage(value?: LongLinkMessage, index?: number): LongLinkMessage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatPushSubscribeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatPushSubscribeResponse): WeChatPushSubscribeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatPushSubscribeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatPushSubscribeResponse;
    static deserializeBinaryFromReader(message: WeChatPushSubscribeResponse, reader: jspb.BinaryReader): WeChatPushSubscribeResponse;
}

export namespace WeChatPushSubscribeResponse {
    export type AsObject = {
        messageList: Array<LongLinkMessage.AsObject>,
    }
}

export class WeChatPushSubscribeResponseReply extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatPushSubscribeResponseReply.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatPushSubscribeResponseReply): WeChatPushSubscribeResponseReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatPushSubscribeResponseReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatPushSubscribeResponseReply;
    static deserializeBinaryFromReader(message: WeChatPushSubscribeResponseReply, reader: jspb.BinaryReader): WeChatPushSubscribeResponseReply;
}

export namespace WeChatPushSubscribeResponseReply {
    export type AsObject = {
    }
}

export class WeChatStreamRequest extends jspb.Message { 
    getEof(): boolean;
    setEof(value: boolean): WeChatStreamRequest;

    hasLonglinkrequest(): boolean;
    clearLonglinkrequest(): void;
    getLonglinkrequest(): WeChatLongLinkStreamRequest | undefined;
    setLonglinkrequest(value?: WeChatLongLinkStreamRequest): WeChatStreamRequest;

    hasSocketrequest(): boolean;
    clearSocketrequest(): void;
    getSocketrequest(): WeChatSocketRequest | undefined;
    setSocketrequest(value?: WeChatSocketRequest): WeChatStreamRequest;

    hasPushsubscriberequest(): boolean;
    clearPushsubscriberequest(): void;
    getPushsubscriberequest(): WeChatPushSubscribeRequest | undefined;
    setPushsubscriberequest(value?: WeChatPushSubscribeRequest): WeChatStreamRequest;

    hasFileuploadrequest(): boolean;
    clearFileuploadrequest(): void;
    getFileuploadrequest(): WeChatFileUploadRequest | undefined;
    setFileuploadrequest(value?: WeChatFileUploadRequest): WeChatStreamRequest;

    getPayloadCase(): WeChatStreamRequest.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatStreamRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatStreamRequest): WeChatStreamRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatStreamRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatStreamRequest;
    static deserializeBinaryFromReader(message: WeChatStreamRequest, reader: jspb.BinaryReader): WeChatStreamRequest;
}

export namespace WeChatStreamRequest {
    export type AsObject = {
        eof: boolean,
        longlinkrequest?: WeChatLongLinkStreamRequest.AsObject,
        socketrequest?: WeChatSocketRequest.AsObject,
        pushsubscriberequest?: WeChatPushSubscribeRequest.AsObject,
        fileuploadrequest?: WeChatFileUploadRequest.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        LONGLINKREQUEST = 10,
        SOCKETREQUEST = 11,
        PUSHSUBSCRIBEREQUEST = 12,
        FILEUPLOADREQUEST = 13,
    }

}

export class WeChatStreamResponse extends jspb.Message { 
    getEof(): boolean;
    setEof(value: boolean): WeChatStreamResponse;

    hasLonglinkresponse(): boolean;
    clearLonglinkresponse(): void;
    getLonglinkresponse(): WeChatLongLinkStreamResponse | undefined;
    setLonglinkresponse(value?: WeChatLongLinkStreamResponse): WeChatStreamResponse;

    hasSocketresponse(): boolean;
    clearSocketresponse(): void;
    getSocketresponse(): WeChatSocketResponse | undefined;
    setSocketresponse(value?: WeChatSocketResponse): WeChatStreamResponse;

    hasPushsubscriberesponse(): boolean;
    clearPushsubscriberesponse(): void;
    getPushsubscriberesponse(): WeChatPushSubscribeResponse | undefined;
    setPushsubscriberesponse(value?: WeChatPushSubscribeResponse): WeChatStreamResponse;

    hasFileuploadresponse(): boolean;
    clearFileuploadresponse(): void;
    getFileuploadresponse(): WeChatFileUploadResponse | undefined;
    setFileuploadresponse(value?: WeChatFileUploadResponse): WeChatStreamResponse;

    getPayloadCase(): WeChatStreamResponse.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatStreamResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatStreamResponse): WeChatStreamResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatStreamResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatStreamResponse;
    static deserializeBinaryFromReader(message: WeChatStreamResponse, reader: jspb.BinaryReader): WeChatStreamResponse;
}

export namespace WeChatStreamResponse {
    export type AsObject = {
        eof: boolean,
        longlinkresponse?: WeChatLongLinkStreamResponse.AsObject,
        socketresponse?: WeChatSocketResponse.AsObject,
        pushsubscriberesponse?: WeChatPushSubscribeResponse.AsObject,
        fileuploadresponse?: WeChatFileUploadResponse.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        LONGLINKRESPONSE = 10,
        SOCKETRESPONSE = 11,
        PUSHSUBSCRIBERESPONSE = 12,
        FILEUPLOADRESPONSE = 13,
    }

}

export class WeChatStreamResponseReply extends jspb.Message { 
    getEof(): boolean;
    setEof(value: boolean): WeChatStreamResponseReply;

    hasLonglinkresponsereply(): boolean;
    clearLonglinkresponsereply(): void;
    getLonglinkresponsereply(): WeChatLongLinkStreamResponseReply | undefined;
    setLonglinkresponsereply(value?: WeChatLongLinkStreamResponseReply): WeChatStreamResponseReply;

    hasSocketresponsereply(): boolean;
    clearSocketresponsereply(): void;
    getSocketresponsereply(): WeChatSocketResponseReply | undefined;
    setSocketresponsereply(value?: WeChatSocketResponseReply): WeChatStreamResponseReply;

    hasPushsubscriberesponsereply(): boolean;
    clearPushsubscriberesponsereply(): void;
    getPushsubscriberesponsereply(): WeChatPushSubscribeResponseReply | undefined;
    setPushsubscriberesponsereply(value?: WeChatPushSubscribeResponseReply): WeChatStreamResponseReply;

    hasFileuploadresponsereply(): boolean;
    clearFileuploadresponsereply(): void;
    getFileuploadresponsereply(): WeChatFileUploadResponseReply | undefined;
    setFileuploadresponsereply(value?: WeChatFileUploadResponseReply): WeChatStreamResponseReply;

    getPayloadCase(): WeChatStreamResponseReply.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WeChatStreamResponseReply.AsObject;
    static toObject(includeInstance: boolean, msg: WeChatStreamResponseReply): WeChatStreamResponseReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WeChatStreamResponseReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WeChatStreamResponseReply;
    static deserializeBinaryFromReader(message: WeChatStreamResponseReply, reader: jspb.BinaryReader): WeChatStreamResponseReply;
}

export namespace WeChatStreamResponseReply {
    export type AsObject = {
        eof: boolean,
        longlinkresponsereply?: WeChatLongLinkStreamResponseReply.AsObject,
        socketresponsereply?: WeChatSocketResponseReply.AsObject,
        pushsubscriberesponsereply?: WeChatPushSubscribeResponseReply.AsObject,
        fileuploadresponsereply?: WeChatFileUploadResponseReply.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        LONGLINKRESPONSEREPLY = 10,
        SOCKETRESPONSEREPLY = 11,
        PUSHSUBSCRIBERESPONSEREPLY = 12,
        FILEUPLOADRESPONSEREPLY = 13,
    }

}

export class LoginRequest extends jspb.Message { 
    getPolicy(): LoginPolicy;
    setPolicy(value: LoginPolicy): LoginRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginRequest;
    static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
    export type AsObject = {
        policy: LoginPolicy,
    }
}

export class LoginResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginResponse;
    static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
    export type AsObject = {
    }
}

export class LoginUpdateEvent extends jspb.Message { 
    getStatus(): LoginStatus;
    setStatus(value: LoginStatus): LoginUpdateEvent;

    hasLogintype(): boolean;
    clearLogintype(): void;
    getLogintype(): LoginType;
    setLogintype(value: LoginType): LoginUpdateEvent;

    hasQrcodeevent(): boolean;
    clearQrcodeevent(): void;
    getQrcodeevent(): QRCodeEvent | undefined;
    setQrcodeevent(value?: QRCodeEvent): LoginUpdateEvent;

    hasAuthinfo(): boolean;
    clearAuthinfo(): void;
    getAuthinfo(): AuthInfo | undefined;
    setAuthinfo(value?: AuthInfo): LoginUpdateEvent;

    hasSyncevent(): boolean;
    clearSyncevent(): void;
    getSyncevent(): SyncEvent | undefined;
    setSyncevent(value?: SyncEvent): LoginUpdateEvent;

    getPayloadCase(): LoginUpdateEvent.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginUpdateEvent.AsObject;
    static toObject(includeInstance: boolean, msg: LoginUpdateEvent): LoginUpdateEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginUpdateEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginUpdateEvent;
    static deserializeBinaryFromReader(message: LoginUpdateEvent, reader: jspb.BinaryReader): LoginUpdateEvent;
}

export namespace LoginUpdateEvent {
    export type AsObject = {
        status: LoginStatus,
        logintype: LoginType,
        qrcodeevent?: QRCodeEvent.AsObject,
        authinfo?: AuthInfo.AsObject,
        syncevent?: SyncEvent.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        LOGINTYPE = 2,
        QRCODEEVENT = 3,
        AUTHINFO = 4,
        SYNCEVENT = 5,
    }

}

export class QRCodeEvent extends jspb.Message { 
    getStatus(): QRCodeStatus;
    setStatus(value: QRCodeStatus): QRCodeEvent;
    getImageurl(): string;
    setImageurl(value: string): QRCodeEvent;
    getExpireat(): number;
    setExpireat(value: number): QRCodeEvent;

    hasContact(): boolean;
    clearContact(): void;
    getContact(): Contact | undefined;
    setContact(value?: Contact): QRCodeEvent;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QRCodeEvent.AsObject;
    static toObject(includeInstance: boolean, msg: QRCodeEvent): QRCodeEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QRCodeEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QRCodeEvent;
    static deserializeBinaryFromReader(message: QRCodeEvent, reader: jspb.BinaryReader): QRCodeEvent;
}

export namespace QRCodeEvent {
    export type AsObject = {
        status: QRCodeStatus,
        imageurl: string,
        expireat: number,
        contact?: Contact.AsObject,
    }
}

export class AuthInfo extends jspb.Message { 

    hasSelfcontact(): boolean;
    clearSelfcontact(): void;
    getSelfcontact(): Contact | undefined;
    setSelfcontact(value?: Contact): AuthInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthInfo.AsObject;
    static toObject(includeInstance: boolean, msg: AuthInfo): AuthInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthInfo;
    static deserializeBinaryFromReader(message: AuthInfo, reader: jspb.BinaryReader): AuthInfo;
}

export namespace AuthInfo {
    export type AsObject = {
        selfcontact?: Contact.AsObject,
    }
}

export class LogoutRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LogoutRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LogoutRequest): LogoutRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LogoutRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LogoutRequest;
    static deserializeBinaryFromReader(message: LogoutRequest, reader: jspb.BinaryReader): LogoutRequest;
}

export namespace LogoutRequest {
    export type AsObject = {
    }
}

export class LogoutResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LogoutResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LogoutResponse): LogoutResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LogoutResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LogoutResponse;
    static deserializeBinaryFromReader(message: LogoutResponse, reader: jspb.BinaryReader): LogoutResponse;
}

export namespace LogoutResponse {
    export type AsObject = {
    }
}

export class LongLinkInitRequest extends jspb.Message { 
    getLonglinkid(): string;
    setLonglinkid(value: string): LongLinkInitRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LongLinkInitRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LongLinkInitRequest): LongLinkInitRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LongLinkInitRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LongLinkInitRequest;
    static deserializeBinaryFromReader(message: LongLinkInitRequest, reader: jspb.BinaryReader): LongLinkInitRequest;
}

export namespace LongLinkInitRequest {
    export type AsObject = {
        longlinkid: string,
    }
}

export class LongLinkInitResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LongLinkInitResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LongLinkInitResponse): LongLinkInitResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LongLinkInitResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LongLinkInitResponse;
    static deserializeBinaryFromReader(message: LongLinkInitResponse, reader: jspb.BinaryReader): LongLinkInitResponse;
}

export namespace LongLinkInitResponse {
    export type AsObject = {
    }
}

export class LongLinkPackRequest extends jspb.Message { 
    getLonglinkid(): string;
    setLonglinkid(value: string): LongLinkPackRequest;
    getMessageid(): string;
    setMessageid(value: string): LongLinkPackRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LongLinkPackRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LongLinkPackRequest): LongLinkPackRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LongLinkPackRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LongLinkPackRequest;
    static deserializeBinaryFromReader(message: LongLinkPackRequest, reader: jspb.BinaryReader): LongLinkPackRequest;
}

export namespace LongLinkPackRequest {
    export type AsObject = {
        longlinkid: string,
        messageid: string,
    }
}

export class LongLinkPackResponse extends jspb.Message { 
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): LongLinkPackResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LongLinkPackResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LongLinkPackResponse): LongLinkPackResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LongLinkPackResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LongLinkPackResponse;
    static deserializeBinaryFromReader(message: LongLinkPackResponse, reader: jspb.BinaryReader): LongLinkPackResponse;
}

export namespace LongLinkPackResponse {
    export type AsObject = {
        payload: Uint8Array | string,
    }
}

export class LongLinkUnpackRequest extends jspb.Message { 
    getLonglinkid(): string;
    setLonglinkid(value: string): LongLinkUnpackRequest;
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): LongLinkUnpackRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LongLinkUnpackRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LongLinkUnpackRequest): LongLinkUnpackRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LongLinkUnpackRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LongLinkUnpackRequest;
    static deserializeBinaryFromReader(message: LongLinkUnpackRequest, reader: jspb.BinaryReader): LongLinkUnpackRequest;
}

export namespace LongLinkUnpackRequest {
    export type AsObject = {
        longlinkid: string,
        payload: Uint8Array | string,
    }
}

export class LongLinkUnpackResponse extends jspb.Message { 
    clearMessageList(): void;
    getMessageList(): Array<LongLinkMessage>;
    setMessageList(value: Array<LongLinkMessage>): LongLinkUnpackResponse;
    addMessage(value?: LongLinkMessage, index?: number): LongLinkMessage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LongLinkUnpackResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LongLinkUnpackResponse): LongLinkUnpackResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LongLinkUnpackResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LongLinkUnpackResponse;
    static deserializeBinaryFromReader(message: LongLinkUnpackResponse, reader: jspb.BinaryReader): LongLinkUnpackResponse;
}

export namespace LongLinkUnpackResponse {
    export type AsObject = {
        messageList: Array<LongLinkMessage.AsObject>,
    }
}

export class LongLinkMessage extends jspb.Message { 
    getType(): LongLinkMessageType;
    setType(value: LongLinkMessageType): LongLinkMessage;
    getMessageid(): string;
    setMessageid(value: string): LongLinkMessage;

    hasPush(): boolean;
    clearPush(): void;
    getPush(): LongLinkMessagePush | undefined;
    setPush(value?: LongLinkMessagePush): LongLinkMessage;

    getPayloadCase(): LongLinkMessage.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LongLinkMessage.AsObject;
    static toObject(includeInstance: boolean, msg: LongLinkMessage): LongLinkMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LongLinkMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LongLinkMessage;
    static deserializeBinaryFromReader(message: LongLinkMessage, reader: jspb.BinaryReader): LongLinkMessage;
}

export namespace LongLinkMessage {
    export type AsObject = {
        type: LongLinkMessageType,
        messageid: string,
        push?: LongLinkMessagePush.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        PUSH = 10,
    }

}

export class LongLinkMessagePush extends jspb.Message { 
    getType(): LongLinkMessagePushType;
    setType(value: LongLinkMessagePushType): LongLinkMessagePush;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LongLinkMessagePush.AsObject;
    static toObject(includeInstance: boolean, msg: LongLinkMessagePush): LongLinkMessagePush.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LongLinkMessagePush, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LongLinkMessagePush;
    static deserializeBinaryFromReader(message: LongLinkMessagePush, reader: jspb.BinaryReader): LongLinkMessagePush;
}

export namespace LongLinkMessagePush {
    export type AsObject = {
        type: LongLinkMessagePushType,
    }
}

export class LongLinkHeartBeatRequest extends jspb.Message { 
    getLonglinkid(): string;
    setLonglinkid(value: string): LongLinkHeartBeatRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LongLinkHeartBeatRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LongLinkHeartBeatRequest): LongLinkHeartBeatRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LongLinkHeartBeatRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LongLinkHeartBeatRequest;
    static deserializeBinaryFromReader(message: LongLinkHeartBeatRequest, reader: jspb.BinaryReader): LongLinkHeartBeatRequest;
}

export namespace LongLinkHeartBeatRequest {
    export type AsObject = {
        longlinkid: string,
    }
}

export class LongLinkHeartBeatResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LongLinkHeartBeatResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LongLinkHeartBeatResponse): LongLinkHeartBeatResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LongLinkHeartBeatResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LongLinkHeartBeatResponse;
    static deserializeBinaryFromReader(message: LongLinkHeartBeatResponse, reader: jspb.BinaryReader): LongLinkHeartBeatResponse;
}

export namespace LongLinkHeartBeatResponse {
    export type AsObject = {
    }
}

export class MessageRevokeInfo extends jspb.Message { 
    getClientmsgid(): string;
    setClientmsgid(value: string): MessageRevokeInfo;
    getNewclientmsgid(): string;
    setNewclientmsgid(value: string): MessageRevokeInfo;
    getCreatetime(): number;
    setCreatetime(value: number): MessageRevokeInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MessageRevokeInfo.AsObject;
    static toObject(includeInstance: boolean, msg: MessageRevokeInfo): MessageRevokeInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MessageRevokeInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MessageRevokeInfo;
    static deserializeBinaryFromReader(message: MessageRevokeInfo, reader: jspb.BinaryReader): MessageRevokeInfo;
}

export namespace MessageRevokeInfo {
    export type AsObject = {
        clientmsgid: string,
        newclientmsgid: string,
        createtime: number,
    }
}

export class SendTextMessageRequest extends jspb.Message { 
    getTousername(): string;
    setTousername(value: string): SendTextMessageRequest;
    getContent(): string;
    setContent(value: string): SendTextMessageRequest;
    clearAtList(): void;
    getAtList(): Array<string>;
    setAtList(value: Array<string>): SendTextMessageRequest;
    addAt(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendTextMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SendTextMessageRequest): SendTextMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendTextMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendTextMessageRequest;
    static deserializeBinaryFromReader(message: SendTextMessageRequest, reader: jspb.BinaryReader): SendTextMessageRequest;
}

export namespace SendTextMessageRequest {
    export type AsObject = {
        tousername: string,
        content: string,
        atList: Array<string>,
    }
}

export class SendTextMessageResponse extends jspb.Message { 
    getMsgid(): string;
    setMsgid(value: string): SendTextMessageResponse;

    hasMessagerevokeinfo(): boolean;
    clearMessagerevokeinfo(): void;
    getMessagerevokeinfo(): MessageRevokeInfo | undefined;
    setMessagerevokeinfo(value?: MessageRevokeInfo): SendTextMessageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendTextMessageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SendTextMessageResponse): SendTextMessageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendTextMessageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendTextMessageResponse;
    static deserializeBinaryFromReader(message: SendTextMessageResponse, reader: jspb.BinaryReader): SendTextMessageResponse;
}

export namespace SendTextMessageResponse {
    export type AsObject = {
        msgid: string,
        messagerevokeinfo?: MessageRevokeInfo.AsObject,
    }
}

export class SendImageMessageRequest extends jspb.Message { 
    getTousername(): string;
    setTousername(value: string): SendImageMessageRequest;

    hasImage(): boolean;
    clearImage(): void;
    getImage(): Uint8Array | string;
    getImage_asU8(): Uint8Array;
    getImage_asB64(): string;
    setImage(value: Uint8Array | string): SendImageMessageRequest;

    hasImageparams(): boolean;
    clearImageparams(): void;
    getImageparams(): FileUploadImageParams | undefined;
    setImageparams(value?: FileUploadImageParams): SendImageMessageRequest;

    getPayloadCase(): SendImageMessageRequest.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendImageMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SendImageMessageRequest): SendImageMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendImageMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendImageMessageRequest;
    static deserializeBinaryFromReader(message: SendImageMessageRequest, reader: jspb.BinaryReader): SendImageMessageRequest;
}

export namespace SendImageMessageRequest {
    export type AsObject = {
        tousername: string,
        image: Uint8Array | string,
        imageparams?: FileUploadImageParams.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        IMAGE = 2,
        IMAGEPARAMS = 3,
    }

}

export class SendImageMessageResponse extends jspb.Message { 
    getMsgid(): string;
    setMsgid(value: string): SendImageMessageResponse;

    hasMessagerevokeinfo(): boolean;
    clearMessagerevokeinfo(): void;
    getMessagerevokeinfo(): MessageRevokeInfo | undefined;
    setMessagerevokeinfo(value?: MessageRevokeInfo): SendImageMessageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendImageMessageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SendImageMessageResponse): SendImageMessageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendImageMessageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendImageMessageResponse;
    static deserializeBinaryFromReader(message: SendImageMessageResponse, reader: jspb.BinaryReader): SendImageMessageResponse;
}

export namespace SendImageMessageResponse {
    export type AsObject = {
        msgid: string,
        messagerevokeinfo?: MessageRevokeInfo.AsObject,
    }
}

export class SendAppMessageRequest extends jspb.Message { 
    getTousername(): string;
    setTousername(value: string): SendAppMessageRequest;

    hasLink(): boolean;
    clearLink(): void;
    getLink(): AppMessageLink | undefined;
    setLink(value?: AppMessageLink): SendAppMessageRequest;

    hasMiniprogram(): boolean;
    clearMiniprogram(): void;
    getMiniprogram(): AppMessageMiniProgram | undefined;
    setMiniprogram(value?: AppMessageMiniProgram): SendAppMessageRequest;

    getPayloadCase(): SendAppMessageRequest.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendAppMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SendAppMessageRequest): SendAppMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendAppMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendAppMessageRequest;
    static deserializeBinaryFromReader(message: SendAppMessageRequest, reader: jspb.BinaryReader): SendAppMessageRequest;
}

export namespace SendAppMessageRequest {
    export type AsObject = {
        tousername: string,
        link?: AppMessageLink.AsObject,
        miniprogram?: AppMessageMiniProgram.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        LINK = 2,
        MINIPROGRAM = 3,
    }

}

export class AppMessageLink extends jspb.Message { 
    getTitle(): string;
    setTitle(value: string): AppMessageLink;
    getDescription(): string;
    setDescription(value: string): AppMessageLink;
    getUrl(): string;
    setUrl(value: string): AppMessageLink;
    getThumbimage(): Uint8Array | string;
    getThumbimage_asU8(): Uint8Array;
    getThumbimage_asB64(): string;
    setThumbimage(value: Uint8Array | string): AppMessageLink;
    getThumburl(): string;
    setThumburl(value: string): AppMessageLink;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AppMessageLink.AsObject;
    static toObject(includeInstance: boolean, msg: AppMessageLink): AppMessageLink.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AppMessageLink, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AppMessageLink;
    static deserializeBinaryFromReader(message: AppMessageLink, reader: jspb.BinaryReader): AppMessageLink;
}

export namespace AppMessageLink {
    export type AsObject = {
        title: string,
        description: string,
        url: string,
        thumbimage: Uint8Array | string,
        thumburl: string,
    }
}

export class AppMessageMiniProgram extends jspb.Message { 
    getTitle(): string;
    setTitle(value: string): AppMessageMiniProgram;
    getDescription(): string;
    setDescription(value: string): AppMessageMiniProgram;
    getUrl(): string;
    setUrl(value: string): AppMessageMiniProgram;
    getMpappusername(): string;
    setMpappusername(value: string): AppMessageMiniProgram;
    getMpappname(): string;
    setMpappname(value: string): AppMessageMiniProgram;
    getMpappid(): string;
    setMpappid(value: string): AppMessageMiniProgram;
    getMpappiconurl(): string;
    setMpappiconurl(value: string): AppMessageMiniProgram;
    getMpapppath(): string;
    setMpapppath(value: string): AppMessageMiniProgram;

    hasThumbimage(): boolean;
    clearThumbimage(): void;
    getThumbimage(): Uint8Array | string;
    getThumbimage_asU8(): Uint8Array;
    getThumbimage_asB64(): string;
    setThumbimage(value: Uint8Array | string): AppMessageMiniProgram;

    hasThumbparams(): boolean;
    clearThumbparams(): void;
    getThumbparams(): FileUploadImageParams | undefined;
    setThumbparams(value?: FileUploadImageParams): AppMessageMiniProgram;

    getAppmessageminiprogramthumbCase(): AppMessageMiniProgram.AppmessageminiprogramthumbCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AppMessageMiniProgram.AsObject;
    static toObject(includeInstance: boolean, msg: AppMessageMiniProgram): AppMessageMiniProgram.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AppMessageMiniProgram, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AppMessageMiniProgram;
    static deserializeBinaryFromReader(message: AppMessageMiniProgram, reader: jspb.BinaryReader): AppMessageMiniProgram;
}

export namespace AppMessageMiniProgram {
    export type AsObject = {
        title: string,
        description: string,
        url: string,
        mpappusername: string,
        mpappname: string,
        mpappid: string,
        mpappiconurl: string,
        mpapppath: string,
        thumbimage: Uint8Array | string,
        thumbparams?: FileUploadImageParams.AsObject,
    }

    export enum AppmessageminiprogramthumbCase {
        APPMESSAGEMINIPROGRAMTHUMB_NOT_SET = 0,
        THUMBIMAGE = 9,
        THUMBPARAMS = 10,
    }

}

export class SendAppMessageResponse extends jspb.Message { 
    getMsgid(): string;
    setMsgid(value: string): SendAppMessageResponse;

    hasMessagerevokeinfo(): boolean;
    clearMessagerevokeinfo(): void;
    getMessagerevokeinfo(): MessageRevokeInfo | undefined;
    setMessagerevokeinfo(value?: MessageRevokeInfo): SendAppMessageResponse;
    getMsgcontent(): string;
    setMsgcontent(value: string): SendAppMessageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendAppMessageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SendAppMessageResponse): SendAppMessageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendAppMessageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendAppMessageResponse;
    static deserializeBinaryFromReader(message: SendAppMessageResponse, reader: jspb.BinaryReader): SendAppMessageResponse;
}

export namespace SendAppMessageResponse {
    export type AsObject = {
        msgid: string,
        messagerevokeinfo?: MessageRevokeInfo.AsObject,
        msgcontent: string,
    }
}

export class AcceptUserRequest extends jspb.Message { 
    getStranger(): string;
    setStranger(value: string): AcceptUserRequest;
    getTicket(): string;
    setTicket(value: string): AcceptUserRequest;
    getUsername(): string;
    setUsername(value: string): AcceptUserRequest;
    getScene(): number;
    setScene(value: number): AcceptUserRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AcceptUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AcceptUserRequest): AcceptUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AcceptUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AcceptUserRequest;
    static deserializeBinaryFromReader(message: AcceptUserRequest, reader: jspb.BinaryReader): AcceptUserRequest;
}

export namespace AcceptUserRequest {
    export type AsObject = {
        stranger: string,
        ticket: string,
        username: string,
        scene: number,
    }
}

export class AcceptUserResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AcceptUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AcceptUserResponse): AcceptUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AcceptUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AcceptUserResponse;
    static deserializeBinaryFromReader(message: AcceptUserResponse, reader: jspb.BinaryReader): AcceptUserResponse;
}

export namespace AcceptUserResponse {
    export type AsObject = {
    }
}

export class AddContactRequest extends jspb.Message { 
    getStranger(): string;
    setStranger(value: string): AddContactRequest;
    getTicket(): string;
    setTicket(value: string): AddContactRequest;
    getScene(): AddContactScene;
    setScene(value: AddContactScene): AddContactRequest;
    getContent(): string;
    setContent(value: string): AddContactRequest;
    getRoomid(): string;
    setRoomid(value: string): AddContactRequest;
    getContactid(): string;
    setContactid(value: string): AddContactRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddContactRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddContactRequest): AddContactRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddContactRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddContactRequest;
    static deserializeBinaryFromReader(message: AddContactRequest, reader: jspb.BinaryReader): AddContactRequest;
}

export namespace AddContactRequest {
    export type AsObject = {
        stranger: string,
        ticket: string,
        scene: AddContactScene,
        content: string,
        roomid: string,
        contactid: string,
    }
}

export class AddContactResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddContactResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AddContactResponse): AddContactResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddContactResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddContactResponse;
    static deserializeBinaryFromReader(message: AddContactResponse, reader: jspb.BinaryReader): AddContactResponse;
}

export namespace AddContactResponse {
    export type AsObject = {
    }
}

export class DeleteContactRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): DeleteContactRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteContactRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteContactRequest): DeleteContactRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteContactRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteContactRequest;
    static deserializeBinaryFromReader(message: DeleteContactRequest, reader: jspb.BinaryReader): DeleteContactRequest;
}

export namespace DeleteContactRequest {
    export type AsObject = {
        username: string,
    }
}

export class DeleteContactResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteContactResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteContactResponse): DeleteContactResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteContactResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteContactResponse;
    static deserializeBinaryFromReader(message: DeleteContactResponse, reader: jspb.BinaryReader): DeleteContactResponse;
}

export namespace DeleteContactResponse {
    export type AsObject = {
    }
}

export class GetContactRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): GetContactRequest;
    getTicket(): string;
    setTicket(value: string): GetContactRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetContactRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetContactRequest): GetContactRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetContactRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetContactRequest;
    static deserializeBinaryFromReader(message: GetContactRequest, reader: jspb.BinaryReader): GetContactRequest;
}

export namespace GetContactRequest {
    export type AsObject = {
        username: string,
        ticket: string,
    }
}

export class GetContactResponse extends jspb.Message { 

    hasContact(): boolean;
    clearContact(): void;
    getContact(): Contact | undefined;
    setContact(value?: Contact): GetContactResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetContactResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetContactResponse): GetContactResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetContactResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetContactResponse;
    static deserializeBinaryFromReader(message: GetContactResponse, reader: jspb.BinaryReader): GetContactResponse;
}

export namespace GetContactResponse {
    export type AsObject = {
        contact?: Contact.AsObject,
    }
}

export class GetContactQRCodeRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): GetContactQRCodeRequest;
    getStyle(): number;
    setStyle(value: number): GetContactQRCodeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetContactQRCodeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetContactQRCodeRequest): GetContactQRCodeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetContactQRCodeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetContactQRCodeRequest;
    static deserializeBinaryFromReader(message: GetContactQRCodeRequest, reader: jspb.BinaryReader): GetContactQRCodeRequest;
}

export namespace GetContactQRCodeRequest {
    export type AsObject = {
        username: string,
        style: number,
    }
}

export class GetContactQRCodeResponse extends jspb.Message { 
    getQrcode(): Uint8Array | string;
    getQrcode_asU8(): Uint8Array;
    getQrcode_asB64(): string;
    setQrcode(value: Uint8Array | string): GetContactQRCodeResponse;
    getDescription(): string;
    setDescription(value: string): GetContactQRCodeResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetContactQRCodeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetContactQRCodeResponse): GetContactQRCodeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetContactQRCodeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetContactQRCodeResponse;
    static deserializeBinaryFromReader(message: GetContactQRCodeResponse, reader: jspb.BinaryReader): GetContactQRCodeResponse;
}

export namespace GetContactQRCodeResponse {
    export type AsObject = {
        qrcode: Uint8Array | string,
        description: string,
    }
}

export class SearchContactRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): SearchContactRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchContactRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SearchContactRequest): SearchContactRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchContactRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchContactRequest;
    static deserializeBinaryFromReader(message: SearchContactRequest, reader: jspb.BinaryReader): SearchContactRequest;
}

export namespace SearchContactRequest {
    export type AsObject = {
        username: string,
    }
}

export class SearchContactResponse extends jspb.Message { 

    hasContact(): boolean;
    clearContact(): void;
    getContact(): Contact | undefined;
    setContact(value?: Contact): SearchContactResponse;
    getEncryptusername(): string;
    setEncryptusername(value: string): SearchContactResponse;
    getAntispamticket(): string;
    setAntispamticket(value: string): SearchContactResponse;
    getToaddscene(): AddContactScene;
    setToaddscene(value: AddContactScene): SearchContactResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchContactResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SearchContactResponse): SearchContactResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchContactResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchContactResponse;
    static deserializeBinaryFromReader(message: SearchContactResponse, reader: jspb.BinaryReader): SearchContactResponse;
}

export namespace SearchContactResponse {
    export type AsObject = {
        contact?: Contact.AsObject,
        encryptusername: string,
        antispamticket: string,
        toaddscene: AddContactScene,
    }
}

export class UpdateSelfNickNameRequest extends jspb.Message { 
    getNickname(): string;
    setNickname(value: string): UpdateSelfNickNameRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateSelfNickNameRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateSelfNickNameRequest): UpdateSelfNickNameRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateSelfNickNameRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateSelfNickNameRequest;
    static deserializeBinaryFromReader(message: UpdateSelfNickNameRequest, reader: jspb.BinaryReader): UpdateSelfNickNameRequest;
}

export namespace UpdateSelfNickNameRequest {
    export type AsObject = {
        nickname: string,
    }
}

export class UpdateSelfNickNameResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateSelfNickNameResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateSelfNickNameResponse): UpdateSelfNickNameResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateSelfNickNameResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateSelfNickNameResponse;
    static deserializeBinaryFromReader(message: UpdateSelfNickNameResponse, reader: jspb.BinaryReader): UpdateSelfNickNameResponse;
}

export namespace UpdateSelfNickNameResponse {
    export type AsObject = {
    }
}

export class UpdateSelfSignatureRequest extends jspb.Message { 
    getSignature(): string;
    setSignature(value: string): UpdateSelfSignatureRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateSelfSignatureRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateSelfSignatureRequest): UpdateSelfSignatureRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateSelfSignatureRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateSelfSignatureRequest;
    static deserializeBinaryFromReader(message: UpdateSelfSignatureRequest, reader: jspb.BinaryReader): UpdateSelfSignatureRequest;
}

export namespace UpdateSelfSignatureRequest {
    export type AsObject = {
        signature: string,
    }
}

export class UpdateSelfSignatureResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateSelfSignatureResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateSelfSignatureResponse): UpdateSelfSignatureResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateSelfSignatureResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateSelfSignatureResponse;
    static deserializeBinaryFromReader(message: UpdateSelfSignatureResponse, reader: jspb.BinaryReader): UpdateSelfSignatureResponse;
}

export namespace UpdateSelfSignatureResponse {
    export type AsObject = {
    }
}

export class ZombieTestRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): ZombieTestRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ZombieTestRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ZombieTestRequest): ZombieTestRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ZombieTestRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ZombieTestRequest;
    static deserializeBinaryFromReader(message: ZombieTestRequest, reader: jspb.BinaryReader): ZombieTestRequest;
}

export namespace ZombieTestRequest {
    export type AsObject = {
        username: string,
    }
}

export class ZombieTestResponse extends jspb.Message { 
    getZombiestatues(): ZombieStatue;
    setZombiestatues(value: ZombieStatue): ZombieTestResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ZombieTestResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ZombieTestResponse): ZombieTestResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ZombieTestResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ZombieTestResponse;
    static deserializeBinaryFromReader(message: ZombieTestResponse, reader: jspb.BinaryReader): ZombieTestResponse;
}

export namespace ZombieTestResponse {
    export type AsObject = {
        zombiestatues: ZombieStatue,
    }
}

export class UpdateContactRemarkRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): UpdateContactRemarkRequest;
    getRemark(): string;
    setRemark(value: string): UpdateContactRemarkRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateContactRemarkRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateContactRemarkRequest): UpdateContactRemarkRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateContactRemarkRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateContactRemarkRequest;
    static deserializeBinaryFromReader(message: UpdateContactRemarkRequest, reader: jspb.BinaryReader): UpdateContactRemarkRequest;
}

export namespace UpdateContactRemarkRequest {
    export type AsObject = {
        username: string,
        remark: string,
    }
}

export class UpdateContactRemarkResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateContactRemarkResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateContactRemarkResponse): UpdateContactRemarkResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateContactRemarkResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateContactRemarkResponse;
    static deserializeBinaryFromReader(message: UpdateContactRemarkResponse, reader: jspb.BinaryReader): UpdateContactRemarkResponse;
}

export namespace UpdateContactRemarkResponse {
    export type AsObject = {
    }
}

export class CreateChatRoomRequest extends jspb.Message { 
    clearUsernamesList(): void;
    getUsernamesList(): Array<string>;
    setUsernamesList(value: Array<string>): CreateChatRoomRequest;
    addUsernames(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateChatRoomRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateChatRoomRequest): CreateChatRoomRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateChatRoomRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateChatRoomRequest;
    static deserializeBinaryFromReader(message: CreateChatRoomRequest, reader: jspb.BinaryReader): CreateChatRoomRequest;
}

export namespace CreateChatRoomRequest {
    export type AsObject = {
        usernamesList: Array<string>,
    }
}

export class CreateChatRoomResponse extends jspb.Message { 
    getRoomid(): string;
    setRoomid(value: string): CreateChatRoomResponse;
    getTopic(): string;
    setTopic(value: string): CreateChatRoomResponse;
    getAvatar(): string;
    setAvatar(value: string): CreateChatRoomResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateChatRoomResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateChatRoomResponse): CreateChatRoomResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateChatRoomResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateChatRoomResponse;
    static deserializeBinaryFromReader(message: CreateChatRoomResponse, reader: jspb.BinaryReader): CreateChatRoomResponse;
}

export namespace CreateChatRoomResponse {
    export type AsObject = {
        roomid: string,
        topic: string,
        avatar: string,
    }
}

export class GetChatRoomMembersRequest extends jspb.Message { 
    getRoomid(): string;
    setRoomid(value: string): GetChatRoomMembersRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetChatRoomMembersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetChatRoomMembersRequest): GetChatRoomMembersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetChatRoomMembersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetChatRoomMembersRequest;
    static deserializeBinaryFromReader(message: GetChatRoomMembersRequest, reader: jspb.BinaryReader): GetChatRoomMembersRequest;
}

export namespace GetChatRoomMembersRequest {
    export type AsObject = {
        roomid: string,
    }
}

export class GetChatRoomMembersResponse extends jspb.Message { 
    clearMemberList(): void;
    getMemberList(): Array<ChatRoomMember>;
    setMemberList(value: Array<ChatRoomMember>): GetChatRoomMembersResponse;
    addMember(value?: ChatRoomMember, index?: number): ChatRoomMember;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetChatRoomMembersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetChatRoomMembersResponse): GetChatRoomMembersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetChatRoomMembersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetChatRoomMembersResponse;
    static deserializeBinaryFromReader(message: GetChatRoomMembersResponse, reader: jspb.BinaryReader): GetChatRoomMembersResponse;
}

export namespace GetChatRoomMembersResponse {
    export type AsObject = {
        memberList: Array<ChatRoomMember.AsObject>,
    }
}

export class ChatRoomMember extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): ChatRoomMember;
    getNickname(): string;
    setNickname(value: string): ChatRoomMember;
    getDisplayname(): string;
    setDisplayname(value: string): ChatRoomMember;
    getAvatar(): string;
    setAvatar(value: string): ChatRoomMember;
    getInviterusername(): string;
    setInviterusername(value: string): ChatRoomMember;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChatRoomMember.AsObject;
    static toObject(includeInstance: boolean, msg: ChatRoomMember): ChatRoomMember.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChatRoomMember, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChatRoomMember;
    static deserializeBinaryFromReader(message: ChatRoomMember, reader: jspb.BinaryReader): ChatRoomMember;
}

export namespace ChatRoomMember {
    export type AsObject = {
        username: string,
        nickname: string,
        displayname: string,
        avatar: string,
        inviterusername: string,
    }
}

export class GetChatRoomQrCodeRequest extends jspb.Message { 
    getRoomid(): string;
    setRoomid(value: string): GetChatRoomQrCodeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetChatRoomQrCodeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetChatRoomQrCodeRequest): GetChatRoomQrCodeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetChatRoomQrCodeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetChatRoomQrCodeRequest;
    static deserializeBinaryFromReader(message: GetChatRoomQrCodeRequest, reader: jspb.BinaryReader): GetChatRoomQrCodeRequest;
}

export namespace GetChatRoomQrCodeRequest {
    export type AsObject = {
        roomid: string,
    }
}

export class GetChatRoomQrCodeResponse extends jspb.Message { 
    getQrcode(): Uint8Array | string;
    getQrcode_asU8(): Uint8Array;
    getQrcode_asB64(): string;
    setQrcode(value: Uint8Array | string): GetChatRoomQrCodeResponse;
    getDescription(): string;
    setDescription(value: string): GetChatRoomQrCodeResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetChatRoomQrCodeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetChatRoomQrCodeResponse): GetChatRoomQrCodeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetChatRoomQrCodeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetChatRoomQrCodeResponse;
    static deserializeBinaryFromReader(message: GetChatRoomQrCodeResponse, reader: jspb.BinaryReader): GetChatRoomQrCodeResponse;
}

export namespace GetChatRoomQrCodeResponse {
    export type AsObject = {
        qrcode: Uint8Array | string,
        description: string,
    }
}

export class GetChatRoomMemberRequest extends jspb.Message { 
    getRoomid(): string;
    setRoomid(value: string): GetChatRoomMemberRequest;
    getUsername(): string;
    setUsername(value: string): GetChatRoomMemberRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetChatRoomMemberRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetChatRoomMemberRequest): GetChatRoomMemberRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetChatRoomMemberRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetChatRoomMemberRequest;
    static deserializeBinaryFromReader(message: GetChatRoomMemberRequest, reader: jspb.BinaryReader): GetChatRoomMemberRequest;
}

export namespace GetChatRoomMemberRequest {
    export type AsObject = {
        roomid: string,
        username: string,
    }
}

export class GetChatRoomMemberResponse extends jspb.Message { 

    hasContact(): boolean;
    clearContact(): void;
    getContact(): Contact | undefined;
    setContact(value?: Contact): GetChatRoomMemberResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetChatRoomMemberResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetChatRoomMemberResponse): GetChatRoomMemberResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetChatRoomMemberResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetChatRoomMemberResponse;
    static deserializeBinaryFromReader(message: GetChatRoomMemberResponse, reader: jspb.BinaryReader): GetChatRoomMemberResponse;
}

export namespace GetChatRoomMemberResponse {
    export type AsObject = {
        contact?: Contact.AsObject,
    }
}

export class GetChatRoomAnnouncementRequest extends jspb.Message { 
    getRoomid(): string;
    setRoomid(value: string): GetChatRoomAnnouncementRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetChatRoomAnnouncementRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetChatRoomAnnouncementRequest): GetChatRoomAnnouncementRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetChatRoomAnnouncementRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetChatRoomAnnouncementRequest;
    static deserializeBinaryFromReader(message: GetChatRoomAnnouncementRequest, reader: jspb.BinaryReader): GetChatRoomAnnouncementRequest;
}

export namespace GetChatRoomAnnouncementRequest {
    export type AsObject = {
        roomid: string,
    }
}

export class GetChatRoomAnnouncementResponse extends jspb.Message { 
    getAnnouncement(): string;
    setAnnouncement(value: string): GetChatRoomAnnouncementResponse;
    getAnnouncementeditor(): string;
    setAnnouncementeditor(value: string): GetChatRoomAnnouncementResponse;
    getAnnouncementpublishtime(): number;
    setAnnouncementpublishtime(value: number): GetChatRoomAnnouncementResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetChatRoomAnnouncementResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetChatRoomAnnouncementResponse): GetChatRoomAnnouncementResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetChatRoomAnnouncementResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetChatRoomAnnouncementResponse;
    static deserializeBinaryFromReader(message: GetChatRoomAnnouncementResponse, reader: jspb.BinaryReader): GetChatRoomAnnouncementResponse;
}

export namespace GetChatRoomAnnouncementResponse {
    export type AsObject = {
        announcement: string,
        announcementeditor: string,
        announcementpublishtime: number,
    }
}

export class SetChatRoomAnnouncementRequest extends jspb.Message { 
    getRoomid(): string;
    setRoomid(value: string): SetChatRoomAnnouncementRequest;
    getAnnouncement(): string;
    setAnnouncement(value: string): SetChatRoomAnnouncementRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetChatRoomAnnouncementRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SetChatRoomAnnouncementRequest): SetChatRoomAnnouncementRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetChatRoomAnnouncementRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetChatRoomAnnouncementRequest;
    static deserializeBinaryFromReader(message: SetChatRoomAnnouncementRequest, reader: jspb.BinaryReader): SetChatRoomAnnouncementRequest;
}

export namespace SetChatRoomAnnouncementRequest {
    export type AsObject = {
        roomid: string,
        announcement: string,
    }
}

export class SetChatRoomAnnouncementResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetChatRoomAnnouncementResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SetChatRoomAnnouncementResponse): SetChatRoomAnnouncementResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetChatRoomAnnouncementResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetChatRoomAnnouncementResponse;
    static deserializeBinaryFromReader(message: SetChatRoomAnnouncementResponse, reader: jspb.BinaryReader): SetChatRoomAnnouncementResponse;
}

export namespace SetChatRoomAnnouncementResponse {
    export type AsObject = {
    }
}

export class AddChatRoomMemberRequest extends jspb.Message { 
    getRoomid(): string;
    setRoomid(value: string): AddChatRoomMemberRequest;
    getUsername(): string;
    setUsername(value: string): AddChatRoomMemberRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddChatRoomMemberRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddChatRoomMemberRequest): AddChatRoomMemberRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddChatRoomMemberRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddChatRoomMemberRequest;
    static deserializeBinaryFromReader(message: AddChatRoomMemberRequest, reader: jspb.BinaryReader): AddChatRoomMemberRequest;
}

export namespace AddChatRoomMemberRequest {
    export type AsObject = {
        roomid: string,
        username: string,
    }
}

export class AddChatRoomMemberResponse extends jspb.Message { 
    getAddtype(): AddChatRoomMemberType;
    setAddtype(value: AddChatRoomMemberType): AddChatRoomMemberResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddChatRoomMemberResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AddChatRoomMemberResponse): AddChatRoomMemberResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddChatRoomMemberResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddChatRoomMemberResponse;
    static deserializeBinaryFromReader(message: AddChatRoomMemberResponse, reader: jspb.BinaryReader): AddChatRoomMemberResponse;
}

export namespace AddChatRoomMemberResponse {
    export type AsObject = {
        addtype: AddChatRoomMemberType,
    }
}

export class DeleteChatRoomMemberRequest extends jspb.Message { 
    getRoomid(): string;
    setRoomid(value: string): DeleteChatRoomMemberRequest;
    getUsername(): string;
    setUsername(value: string): DeleteChatRoomMemberRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteChatRoomMemberRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteChatRoomMemberRequest): DeleteChatRoomMemberRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteChatRoomMemberRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteChatRoomMemberRequest;
    static deserializeBinaryFromReader(message: DeleteChatRoomMemberRequest, reader: jspb.BinaryReader): DeleteChatRoomMemberRequest;
}

export namespace DeleteChatRoomMemberRequest {
    export type AsObject = {
        roomid: string,
        username: string,
    }
}

export class DeleteChatRoomMemberResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteChatRoomMemberResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteChatRoomMemberResponse): DeleteChatRoomMemberResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteChatRoomMemberResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteChatRoomMemberResponse;
    static deserializeBinaryFromReader(message: DeleteChatRoomMemberResponse, reader: jspb.BinaryReader): DeleteChatRoomMemberResponse;
}

export namespace DeleteChatRoomMemberResponse {
    export type AsObject = {
    }
}

export class SetChatRoomNameRequest extends jspb.Message { 
    getRoomid(): string;
    setRoomid(value: string): SetChatRoomNameRequest;
    getName(): string;
    setName(value: string): SetChatRoomNameRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetChatRoomNameRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SetChatRoomNameRequest): SetChatRoomNameRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetChatRoomNameRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetChatRoomNameRequest;
    static deserializeBinaryFromReader(message: SetChatRoomNameRequest, reader: jspb.BinaryReader): SetChatRoomNameRequest;
}

export namespace SetChatRoomNameRequest {
    export type AsObject = {
        roomid: string,
        name: string,
    }
}

export class SetChatRoomNameResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetChatRoomNameResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SetChatRoomNameResponse): SetChatRoomNameResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetChatRoomNameResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetChatRoomNameResponse;
    static deserializeBinaryFromReader(message: SetChatRoomNameResponse, reader: jspb.BinaryReader): SetChatRoomNameResponse;
}

export namespace SetChatRoomNameResponse {
    export type AsObject = {
    }
}

export class QuitChatRoomRequest extends jspb.Message { 
    getRoomid(): string;
    setRoomid(value: string): QuitChatRoomRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QuitChatRoomRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QuitChatRoomRequest): QuitChatRoomRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QuitChatRoomRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QuitChatRoomRequest;
    static deserializeBinaryFromReader(message: QuitChatRoomRequest, reader: jspb.BinaryReader): QuitChatRoomRequest;
}

export namespace QuitChatRoomRequest {
    export type AsObject = {
        roomid: string,
    }
}

export class QuitChatRoomResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QuitChatRoomResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QuitChatRoomResponse): QuitChatRoomResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QuitChatRoomResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QuitChatRoomResponse;
    static deserializeBinaryFromReader(message: QuitChatRoomResponse, reader: jspb.BinaryReader): QuitChatRoomResponse;
}

export namespace QuitChatRoomResponse {
    export type AsObject = {
    }
}

export class AcceptChatRoomInvitationRequest extends jspb.Message { 
    getInviterid(): string;
    setInviterid(value: string): AcceptChatRoomInvitationRequest;
    getInvitationurl(): string;
    setInvitationurl(value: string): AcceptChatRoomInvitationRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AcceptChatRoomInvitationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AcceptChatRoomInvitationRequest): AcceptChatRoomInvitationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AcceptChatRoomInvitationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AcceptChatRoomInvitationRequest;
    static deserializeBinaryFromReader(message: AcceptChatRoomInvitationRequest, reader: jspb.BinaryReader): AcceptChatRoomInvitationRequest;
}

export namespace AcceptChatRoomInvitationRequest {
    export type AsObject = {
        inviterid: string,
        invitationurl: string,
    }
}

export class AcceptChatRoomInvitationResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AcceptChatRoomInvitationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AcceptChatRoomInvitationResponse): AcceptChatRoomInvitationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AcceptChatRoomInvitationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AcceptChatRoomInvitationResponse;
    static deserializeBinaryFromReader(message: AcceptChatRoomInvitationResponse, reader: jspb.BinaryReader): AcceptChatRoomInvitationResponse;
}

export namespace AcceptChatRoomInvitationResponse {
    export type AsObject = {
    }
}

export class SnsSendMomentRequest extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): SnsSendMomentOptions | undefined;
    setOptions(value?: SnsSendMomentOptions): SnsSendMomentRequest;

    hasText(): boolean;
    clearText(): void;
    getText(): SnsSendMomentText | undefined;
    setText(value?: SnsSendMomentText): SnsSendMomentRequest;

    hasImages(): boolean;
    clearImages(): void;
    getImages(): SnsSendMomentImages | undefined;
    setImages(value?: SnsSendMomentImages): SnsSendMomentRequest;

    hasUrl(): boolean;
    clearUrl(): void;
    getUrl(): SnsSendMomentUrl | undefined;
    setUrl(value?: SnsSendMomentUrl): SnsSendMomentRequest;

    getPayloadCase(): SnsSendMomentRequest.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsSendMomentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsSendMomentRequest): SnsSendMomentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsSendMomentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsSendMomentRequest;
    static deserializeBinaryFromReader(message: SnsSendMomentRequest, reader: jspb.BinaryReader): SnsSendMomentRequest;
}

export namespace SnsSendMomentRequest {
    export type AsObject = {
        options?: SnsSendMomentOptions.AsObject,
        text?: SnsSendMomentText.AsObject,
        images?: SnsSendMomentImages.AsObject,
        url?: SnsSendMomentUrl.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        TEXT = 2,
        IMAGES = 3,
        URL = 4,
    }

}

export class SnsSendMomentText extends jspb.Message { 
    getText(): string;
    setText(value: string): SnsSendMomentText;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsSendMomentText.AsObject;
    static toObject(includeInstance: boolean, msg: SnsSendMomentText): SnsSendMomentText.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsSendMomentText, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsSendMomentText;
    static deserializeBinaryFromReader(message: SnsSendMomentText, reader: jspb.BinaryReader): SnsSendMomentText;
}

export namespace SnsSendMomentText {
    export type AsObject = {
        text: string,
    }
}

export class SnsSendMomentImages extends jspb.Message { 
    getText(): string;
    setText(value: string): SnsSendMomentImages;
    clearImageurlList(): void;
    getImageurlList(): Array<SnsImageUrl>;
    setImageurlList(value: Array<SnsImageUrl>): SnsSendMomentImages;
    addImageurl(value?: SnsImageUrl, index?: number): SnsImageUrl;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsSendMomentImages.AsObject;
    static toObject(includeInstance: boolean, msg: SnsSendMomentImages): SnsSendMomentImages.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsSendMomentImages, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsSendMomentImages;
    static deserializeBinaryFromReader(message: SnsSendMomentImages, reader: jspb.BinaryReader): SnsSendMomentImages;
}

export namespace SnsSendMomentImages {
    export type AsObject = {
        text: string,
        imageurlList: Array<SnsImageUrl.AsObject>,
    }
}

export class SnsSendMomentUrl extends jspb.Message { 
    getText(): string;
    setText(value: string): SnsSendMomentUrl;
    getUrltitle(): string;
    setUrltitle(value: string): SnsSendMomentUrl;
    getUrl(): string;
    setUrl(value: string): SnsSendMomentUrl;

    hasImageurl(): boolean;
    clearImageurl(): void;
    getImageurl(): SnsImageUrl | undefined;
    setImageurl(value?: SnsImageUrl): SnsSendMomentUrl;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsSendMomentUrl.AsObject;
    static toObject(includeInstance: boolean, msg: SnsSendMomentUrl): SnsSendMomentUrl.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsSendMomentUrl, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsSendMomentUrl;
    static deserializeBinaryFromReader(message: SnsSendMomentUrl, reader: jspb.BinaryReader): SnsSendMomentUrl;
}

export namespace SnsSendMomentUrl {
    export type AsObject = {
        text: string,
        urltitle: string,
        url: string,
        imageurl?: SnsImageUrl.AsObject,
    }
}

export class SnsSendMomentResponse extends jspb.Message { 

    hasMoment(): boolean;
    clearMoment(): void;
    getMoment(): SnsMoment | undefined;
    setMoment(value?: SnsMoment): SnsSendMomentResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsSendMomentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsSendMomentResponse): SnsSendMomentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsSendMomentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsSendMomentResponse;
    static deserializeBinaryFromReader(message: SnsSendMomentResponse, reader: jspb.BinaryReader): SnsSendMomentResponse;
}

export namespace SnsSendMomentResponse {
    export type AsObject = {
        moment?: SnsMoment.AsObject,
    }
}

export class SnsImageUrl extends jspb.Message { 
    getMd5(): string;
    setMd5(value: string): SnsImageUrl;
    getUrl(): string;
    setUrl(value: string): SnsImageUrl;
    getThumburl(): string;
    setThumburl(value: string): SnsImageUrl;
    getHeight(): number;
    setHeight(value: number): SnsImageUrl;
    getWidth(): number;
    setWidth(value: number): SnsImageUrl;
    getTotalsize(): number;
    setTotalsize(value: number): SnsImageUrl;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsImageUrl.AsObject;
    static toObject(includeInstance: boolean, msg: SnsImageUrl): SnsImageUrl.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsImageUrl, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsImageUrl;
    static deserializeBinaryFromReader(message: SnsImageUrl, reader: jspb.BinaryReader): SnsImageUrl;
}

export namespace SnsImageUrl {
    export type AsObject = {
        md5: string,
        url: string,
        thumburl: string,
        height: number,
        width: number,
        totalsize: number,
    }
}

export class SnsSendMomentOptions extends jspb.Message { 
    getIsprivate(): boolean;
    setIsprivate(value: boolean): SnsSendMomentOptions;
    clearCanseeusernameList(): void;
    getCanseeusernameList(): Array<string>;
    setCanseeusernameList(value: Array<string>): SnsSendMomentOptions;
    addCanseeusername(value: string, index?: number): string;
    clearCannotseeusernameList(): void;
    getCannotseeusernameList(): Array<string>;
    setCannotseeusernameList(value: Array<string>): SnsSendMomentOptions;
    addCannotseeusername(value: string, index?: number): string;
    clearAtusernameList(): void;
    getAtusernameList(): Array<string>;
    setAtusernameList(value: Array<string>): SnsSendMomentOptions;
    addAtusername(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsSendMomentOptions.AsObject;
    static toObject(includeInstance: boolean, msg: SnsSendMomentOptions): SnsSendMomentOptions.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsSendMomentOptions, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsSendMomentOptions;
    static deserializeBinaryFromReader(message: SnsSendMomentOptions, reader: jspb.BinaryReader): SnsSendMomentOptions;
}

export namespace SnsSendMomentOptions {
    export type AsObject = {
        isprivate: boolean,
        canseeusernameList: Array<string>,
        cannotseeusernameList: Array<string>,
        atusernameList: Array<string>,
    }
}

export class SnsForwardMomentRequest extends jspb.Message { 
    getMomentcontentxml(): string;
    setMomentcontentxml(value: string): SnsForwardMomentRequest;

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): SnsSendMomentOptions | undefined;
    setOptions(value?: SnsSendMomentOptions): SnsForwardMomentRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsForwardMomentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsForwardMomentRequest): SnsForwardMomentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsForwardMomentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsForwardMomentRequest;
    static deserializeBinaryFromReader(message: SnsForwardMomentRequest, reader: jspb.BinaryReader): SnsForwardMomentRequest;
}

export namespace SnsForwardMomentRequest {
    export type AsObject = {
        momentcontentxml: string,
        options?: SnsSendMomentOptions.AsObject,
    }
}

export class SnsForwardMomentResponse extends jspb.Message { 

    hasMoment(): boolean;
    clearMoment(): void;
    getMoment(): SnsMoment | undefined;
    setMoment(value?: SnsMoment): SnsForwardMomentResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsForwardMomentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsForwardMomentResponse): SnsForwardMomentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsForwardMomentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsForwardMomentResponse;
    static deserializeBinaryFromReader(message: SnsForwardMomentResponse, reader: jspb.BinaryReader): SnsForwardMomentResponse;
}

export namespace SnsForwardMomentResponse {
    export type AsObject = {
        moment?: SnsMoment.AsObject,
    }
}

export class SnsGetUserPageRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): SnsGetUserPageRequest;
    getMaxid(): string;
    setMaxid(value: string): SnsGetUserPageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsGetUserPageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsGetUserPageRequest): SnsGetUserPageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsGetUserPageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsGetUserPageRequest;
    static deserializeBinaryFromReader(message: SnsGetUserPageRequest, reader: jspb.BinaryReader): SnsGetUserPageRequest;
}

export namespace SnsGetUserPageRequest {
    export type AsObject = {
        username: string,
        maxid: string,
    }
}

export class SnsGetUserPageResponse extends jspb.Message { 
    clearMomentList(): void;
    getMomentList(): Array<SnsMoment>;
    setMomentList(value: Array<SnsMoment>): SnsGetUserPageResponse;
    addMoment(value?: SnsMoment, index?: number): SnsMoment;
    getTips(): string;
    setTips(value: string): SnsGetUserPageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsGetUserPageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsGetUserPageResponse): SnsGetUserPageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsGetUserPageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsGetUserPageResponse;
    static deserializeBinaryFromReader(message: SnsGetUserPageResponse, reader: jspb.BinaryReader): SnsGetUserPageResponse;
}

export namespace SnsGetUserPageResponse {
    export type AsObject = {
        momentList: Array<SnsMoment.AsObject>,
        tips: string,
    }
}

export class SnsSendCommentRequest extends jspb.Message { 
    getMomentid(): string;
    setMomentid(value: string): SnsSendCommentRequest;
    getMomentownerusername(): string;
    setMomentownerusername(value: string): SnsSendCommentRequest;
    getCommenttext(): string;
    setCommenttext(value: string): SnsSendCommentRequest;

    hasReplyto(): boolean;
    clearReplyto(): void;
    getReplyto(): SnsSendCommentReplyTo | undefined;
    setReplyto(value?: SnsSendCommentReplyTo): SnsSendCommentRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsSendCommentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsSendCommentRequest): SnsSendCommentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsSendCommentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsSendCommentRequest;
    static deserializeBinaryFromReader(message: SnsSendCommentRequest, reader: jspb.BinaryReader): SnsSendCommentRequest;
}

export namespace SnsSendCommentRequest {
    export type AsObject = {
        momentid: string,
        momentownerusername: string,
        commenttext: string,
        replyto?: SnsSendCommentReplyTo.AsObject,
    }
}

export class SnsSendCommentReplyTo extends jspb.Message { 
    getCommentid(): string;
    setCommentid(value: string): SnsSendCommentReplyTo;
    getCommentusername(): string;
    setCommentusername(value: string): SnsSendCommentReplyTo;
    getCommentnickname(): string;
    setCommentnickname(value: string): SnsSendCommentReplyTo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsSendCommentReplyTo.AsObject;
    static toObject(includeInstance: boolean, msg: SnsSendCommentReplyTo): SnsSendCommentReplyTo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsSendCommentReplyTo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsSendCommentReplyTo;
    static deserializeBinaryFromReader(message: SnsSendCommentReplyTo, reader: jspb.BinaryReader): SnsSendCommentReplyTo;
}

export namespace SnsSendCommentReplyTo {
    export type AsObject = {
        commentid: string,
        commentusername: string,
        commentnickname: string,
    }
}

export class SnsSendCommentResponse extends jspb.Message { 

    hasMoment(): boolean;
    clearMoment(): void;
    getMoment(): SnsMoment | undefined;
    setMoment(value?: SnsMoment): SnsSendCommentResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsSendCommentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsSendCommentResponse): SnsSendCommentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsSendCommentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsSendCommentResponse;
    static deserializeBinaryFromReader(message: SnsSendCommentResponse, reader: jspb.BinaryReader): SnsSendCommentResponse;
}

export namespace SnsSendCommentResponse {
    export type AsObject = {
        moment?: SnsMoment.AsObject,
    }
}

export class SnsUploadImageRequest extends jspb.Message { 
    getImage(): Uint8Array | string;
    getImage_asU8(): Uint8Array;
    getImage_asB64(): string;
    setImage(value: Uint8Array | string): SnsUploadImageRequest;
    getDescription(): string;
    setDescription(value: string): SnsUploadImageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsUploadImageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsUploadImageRequest): SnsUploadImageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsUploadImageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsUploadImageRequest;
    static deserializeBinaryFromReader(message: SnsUploadImageRequest, reader: jspb.BinaryReader): SnsUploadImageRequest;
}

export namespace SnsUploadImageRequest {
    export type AsObject = {
        image: Uint8Array | string,
        description: string,
    }
}

export class SnsUploadImageResponse extends jspb.Message { 
    getId(): number;
    setId(value: number): SnsUploadImageResponse;

    hasUrl(): boolean;
    clearUrl(): void;
    getUrl(): SnsImageUrl | undefined;
    setUrl(value?: SnsImageUrl): SnsUploadImageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsUploadImageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsUploadImageResponse): SnsUploadImageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsUploadImageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsUploadImageResponse;
    static deserializeBinaryFromReader(message: SnsUploadImageResponse, reader: jspb.BinaryReader): SnsUploadImageResponse;
}

export namespace SnsUploadImageResponse {
    export type AsObject = {
        id: number,
        url?: SnsImageUrl.AsObject,
    }
}

export class SnsGetTimelineRequest extends jspb.Message { 
    getMaxid(): string;
    setMaxid(value: string): SnsGetTimelineRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsGetTimelineRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsGetTimelineRequest): SnsGetTimelineRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsGetTimelineRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsGetTimelineRequest;
    static deserializeBinaryFromReader(message: SnsGetTimelineRequest, reader: jspb.BinaryReader): SnsGetTimelineRequest;
}

export namespace SnsGetTimelineRequest {
    export type AsObject = {
        maxid: string,
    }
}

export class SnsGetTimelineResponse extends jspb.Message { 
    clearMomentList(): void;
    getMomentList(): Array<SnsMoment>;
    setMomentList(value: Array<SnsMoment>): SnsGetTimelineResponse;
    addMoment(value?: SnsMoment, index?: number): SnsMoment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsGetTimelineResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsGetTimelineResponse): SnsGetTimelineResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsGetTimelineResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsGetTimelineResponse;
    static deserializeBinaryFromReader(message: SnsGetTimelineResponse, reader: jspb.BinaryReader): SnsGetTimelineResponse;
}

export namespace SnsGetTimelineResponse {
    export type AsObject = {
        momentList: Array<SnsMoment.AsObject>,
    }
}

export class SnsGetMomentRequest extends jspb.Message { 
    getMomentid(): string;
    setMomentid(value: string): SnsGetMomentRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsGetMomentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsGetMomentRequest): SnsGetMomentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsGetMomentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsGetMomentRequest;
    static deserializeBinaryFromReader(message: SnsGetMomentRequest, reader: jspb.BinaryReader): SnsGetMomentRequest;
}

export namespace SnsGetMomentRequest {
    export type AsObject = {
        momentid: string,
    }
}

export class SnsGetMomentResponse extends jspb.Message { 

    hasMoment(): boolean;
    clearMoment(): void;
    getMoment(): SnsMoment | undefined;
    setMoment(value?: SnsMoment): SnsGetMomentResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsGetMomentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsGetMomentResponse): SnsGetMomentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsGetMomentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsGetMomentResponse;
    static deserializeBinaryFromReader(message: SnsGetMomentResponse, reader: jspb.BinaryReader): SnsGetMomentResponse;
}

export namespace SnsGetMomentResponse {
    export type AsObject = {
        moment?: SnsMoment.AsObject,
    }
}

export class SnsLikeMomentRequest extends jspb.Message { 
    getMomentid(): string;
    setMomentid(value: string): SnsLikeMomentRequest;
    getMomentownerusername(): string;
    setMomentownerusername(value: string): SnsLikeMomentRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsLikeMomentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsLikeMomentRequest): SnsLikeMomentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsLikeMomentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsLikeMomentRequest;
    static deserializeBinaryFromReader(message: SnsLikeMomentRequest, reader: jspb.BinaryReader): SnsLikeMomentRequest;
}

export namespace SnsLikeMomentRequest {
    export type AsObject = {
        momentid: string,
        momentownerusername: string,
    }
}

export class SnsLikeMomentResponse extends jspb.Message { 

    hasMoment(): boolean;
    clearMoment(): void;
    getMoment(): SnsMoment | undefined;
    setMoment(value?: SnsMoment): SnsLikeMomentResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsLikeMomentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsLikeMomentResponse): SnsLikeMomentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsLikeMomentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsLikeMomentResponse;
    static deserializeBinaryFromReader(message: SnsLikeMomentResponse, reader: jspb.BinaryReader): SnsLikeMomentResponse;
}

export namespace SnsLikeMomentResponse {
    export type AsObject = {
        moment?: SnsMoment.AsObject,
    }
}

export class SnsUnlikeMomentRequest extends jspb.Message { 
    getMomentid(): string;
    setMomentid(value: string): SnsUnlikeMomentRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsUnlikeMomentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsUnlikeMomentRequest): SnsUnlikeMomentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsUnlikeMomentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsUnlikeMomentRequest;
    static deserializeBinaryFromReader(message: SnsUnlikeMomentRequest, reader: jspb.BinaryReader): SnsUnlikeMomentRequest;
}

export namespace SnsUnlikeMomentRequest {
    export type AsObject = {
        momentid: string,
    }
}

export class SnsUnlikeMomentResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsUnlikeMomentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsUnlikeMomentResponse): SnsUnlikeMomentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsUnlikeMomentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsUnlikeMomentResponse;
    static deserializeBinaryFromReader(message: SnsUnlikeMomentResponse, reader: jspb.BinaryReader): SnsUnlikeMomentResponse;
}

export namespace SnsUnlikeMomentResponse {
    export type AsObject = {
    }
}

export class SnsRemoveMomentCommentRequest extends jspb.Message { 
    getMomentid(): string;
    setMomentid(value: string): SnsRemoveMomentCommentRequest;
    getCommentid(): string;
    setCommentid(value: string): SnsRemoveMomentCommentRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsRemoveMomentCommentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsRemoveMomentCommentRequest): SnsRemoveMomentCommentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsRemoveMomentCommentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsRemoveMomentCommentRequest;
    static deserializeBinaryFromReader(message: SnsRemoveMomentCommentRequest, reader: jspb.BinaryReader): SnsRemoveMomentCommentRequest;
}

export namespace SnsRemoveMomentCommentRequest {
    export type AsObject = {
        momentid: string,
        commentid: string,
    }
}

export class SnsRemoveMomentCommentResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsRemoveMomentCommentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsRemoveMomentCommentResponse): SnsRemoveMomentCommentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsRemoveMomentCommentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsRemoveMomentCommentResponse;
    static deserializeBinaryFromReader(message: SnsRemoveMomentCommentResponse, reader: jspb.BinaryReader): SnsRemoveMomentCommentResponse;
}

export namespace SnsRemoveMomentCommentResponse {
    export type AsObject = {
    }
}

export class SnsMakeMomentPrivateRequest extends jspb.Message { 
    getMomentid(): string;
    setMomentid(value: string): SnsMakeMomentPrivateRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsMakeMomentPrivateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsMakeMomentPrivateRequest): SnsMakeMomentPrivateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsMakeMomentPrivateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsMakeMomentPrivateRequest;
    static deserializeBinaryFromReader(message: SnsMakeMomentPrivateRequest, reader: jspb.BinaryReader): SnsMakeMomentPrivateRequest;
}

export namespace SnsMakeMomentPrivateRequest {
    export type AsObject = {
        momentid: string,
    }
}

export class SnsMakeMomentPrivateResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsMakeMomentPrivateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsMakeMomentPrivateResponse): SnsMakeMomentPrivateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsMakeMomentPrivateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsMakeMomentPrivateResponse;
    static deserializeBinaryFromReader(message: SnsMakeMomentPrivateResponse, reader: jspb.BinaryReader): SnsMakeMomentPrivateResponse;
}

export namespace SnsMakeMomentPrivateResponse {
    export type AsObject = {
    }
}

export class SnsMakeMomentPublicRequest extends jspb.Message { 
    getMomentid(): string;
    setMomentid(value: string): SnsMakeMomentPublicRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsMakeMomentPublicRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsMakeMomentPublicRequest): SnsMakeMomentPublicRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsMakeMomentPublicRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsMakeMomentPublicRequest;
    static deserializeBinaryFromReader(message: SnsMakeMomentPublicRequest, reader: jspb.BinaryReader): SnsMakeMomentPublicRequest;
}

export namespace SnsMakeMomentPublicRequest {
    export type AsObject = {
        momentid: string,
    }
}

export class SnsMakeMomentPublicResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsMakeMomentPublicResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsMakeMomentPublicResponse): SnsMakeMomentPublicResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsMakeMomentPublicResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsMakeMomentPublicResponse;
    static deserializeBinaryFromReader(message: SnsMakeMomentPublicResponse, reader: jspb.BinaryReader): SnsMakeMomentPublicResponse;
}

export namespace SnsMakeMomentPublicResponse {
    export type AsObject = {
    }
}

export class SnsRemoveMomentRequest extends jspb.Message { 
    getMomentid(): string;
    setMomentid(value: string): SnsRemoveMomentRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsRemoveMomentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnsRemoveMomentRequest): SnsRemoveMomentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsRemoveMomentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsRemoveMomentRequest;
    static deserializeBinaryFromReader(message: SnsRemoveMomentRequest, reader: jspb.BinaryReader): SnsRemoveMomentRequest;
}

export namespace SnsRemoveMomentRequest {
    export type AsObject = {
        momentid: string,
    }
}

export class SnsRemoveMomentResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsRemoveMomentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnsRemoveMomentResponse): SnsRemoveMomentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsRemoveMomentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsRemoveMomentResponse;
    static deserializeBinaryFromReader(message: SnsRemoveMomentResponse, reader: jspb.BinaryReader): SnsRemoveMomentResponse;
}

export namespace SnsRemoveMomentResponse {
    export type AsObject = {
    }
}

export class AddLabelRequest extends jspb.Message { 
    getLabel(): string;
    setLabel(value: string): AddLabelRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddLabelRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddLabelRequest): AddLabelRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddLabelRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddLabelRequest;
    static deserializeBinaryFromReader(message: AddLabelRequest, reader: jspb.BinaryReader): AddLabelRequest;
}

export namespace AddLabelRequest {
    export type AsObject = {
        label: string,
    }
}

export class AddLabelResponse extends jspb.Message { 
    getLabelid(): number;
    setLabelid(value: number): AddLabelResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddLabelResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AddLabelResponse): AddLabelResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddLabelResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddLabelResponse;
    static deserializeBinaryFromReader(message: AddLabelResponse, reader: jspb.BinaryReader): AddLabelResponse;
}

export namespace AddLabelResponse {
    export type AsObject = {
        labelid: number,
    }
}

export class RemoveLabelRequest extends jspb.Message { 
    getLabelid(): number;
    setLabelid(value: number): RemoveLabelRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveLabelRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveLabelRequest): RemoveLabelRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveLabelRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveLabelRequest;
    static deserializeBinaryFromReader(message: RemoveLabelRequest, reader: jspb.BinaryReader): RemoveLabelRequest;
}

export namespace RemoveLabelRequest {
    export type AsObject = {
        labelid: number,
    }
}

export class RemoveLabelResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveLabelResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveLabelResponse): RemoveLabelResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveLabelResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveLabelResponse;
    static deserializeBinaryFromReader(message: RemoveLabelResponse, reader: jspb.BinaryReader): RemoveLabelResponse;
}

export namespace RemoveLabelResponse {
    export type AsObject = {
    }
}

export class GetLabelListRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetLabelListRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetLabelListRequest): GetLabelListRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetLabelListRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetLabelListRequest;
    static deserializeBinaryFromReader(message: GetLabelListRequest, reader: jspb.BinaryReader): GetLabelListRequest;
}

export namespace GetLabelListRequest {
    export type AsObject = {
    }
}

export class GetLabelListResponse extends jspb.Message { 
    clearLabelList(): void;
    getLabelList(): Array<Label>;
    setLabelList(value: Array<Label>): GetLabelListResponse;
    addLabel(value?: Label, index?: number): Label;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetLabelListResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetLabelListResponse): GetLabelListResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetLabelListResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetLabelListResponse;
    static deserializeBinaryFromReader(message: GetLabelListResponse, reader: jspb.BinaryReader): GetLabelListResponse;
}

export namespace GetLabelListResponse {
    export type AsObject = {
        labelList: Array<Label.AsObject>,
    }
}

export class Label extends jspb.Message { 
    getName(): string;
    setName(value: string): Label;
    getId(): number;
    setId(value: number): Label;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Label.AsObject;
    static toObject(includeInstance: boolean, msg: Label): Label.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Label, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Label;
    static deserializeBinaryFromReader(message: Label, reader: jspb.BinaryReader): Label;
}

export namespace Label {
    export type AsObject = {
        name: string,
        id: number,
    }
}

export class SetContactLabelRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): SetContactLabelRequest;
    clearLabelidList(): void;
    getLabelidList(): Array<number>;
    setLabelidList(value: Array<number>): SetContactLabelRequest;
    addLabelid(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetContactLabelRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SetContactLabelRequest): SetContactLabelRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetContactLabelRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetContactLabelRequest;
    static deserializeBinaryFromReader(message: SetContactLabelRequest, reader: jspb.BinaryReader): SetContactLabelRequest;
}

export namespace SetContactLabelRequest {
    export type AsObject = {
        username: string,
        labelidList: Array<number>,
    }
}

export class SetContactLabelResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetContactLabelResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SetContactLabelResponse): SetContactLabelResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetContactLabelResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetContactLabelResponse;
    static deserializeBinaryFromReader(message: SetContactLabelResponse, reader: jspb.BinaryReader): SetContactLabelResponse;
}

export namespace SetContactLabelResponse {
    export type AsObject = {
    }
}

export class SyncEvent extends jspb.Message { 
    clearContactList(): void;
    getContactList(): Array<Contact>;
    setContactList(value: Array<Contact>): SyncEvent;
    addContact(value?: Contact, index?: number): Contact;
    clearMessageList(): void;
    getMessageList(): Array<Message>;
    setMessageList(value: Array<Message>): SyncEvent;
    addMessage(value?: Message, index?: number): Message;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SyncEvent.AsObject;
    static toObject(includeInstance: boolean, msg: SyncEvent): SyncEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SyncEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SyncEvent;
    static deserializeBinaryFromReader(message: SyncEvent, reader: jspb.BinaryReader): SyncEvent;
}

export namespace SyncEvent {
    export type AsObject = {
        contactList: Array<Contact.AsObject>,
        messageList: Array<Message.AsObject>,
    }
}

export class Contact extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): Contact;
    getNickname(): string;
    setNickname(value: string): Contact;
    getAvatar(): string;
    setAvatar(value: string): Contact;
    getGender(): number;
    setGender(value: number): Contact;
    getSignature(): string;
    setSignature(value: string): Contact;
    getAlias(): string;
    setAlias(value: string): Contact;
    getLabel(): string;
    setLabel(value: string): Contact;
    getRemark(): string;
    setRemark(value: string): Contact;
    getCity(): string;
    setCity(value: string): Contact;
    getProvince(): string;
    setProvince(value: string): Contact;
    getCountry(): string;
    setCountry(value: string): Contact;
    getContactaddscene(): number;
    setContactaddscene(value: number): Contact;
    getStranger(): boolean;
    setStranger(value: boolean): Contact;
    getEncryptusername(): string;
    setEncryptusername(value: string): Contact;
    clearPhoneList(): void;
    getPhoneList(): Array<string>;
    setPhoneList(value: Array<string>): Contact;
    addPhone(value: string, index?: number): string;
    getChatroomownerusername(): string;
    setChatroomownerusername(value: string): Contact;
    getChatroommaxcount(): number;
    setChatroommaxcount(value: number): Contact;
    clearChatroommemberList(): void;
    getChatroommemberList(): Array<ChatRoomMember>;
    setChatroommemberList(value: Array<ChatRoomMember>): Contact;
    addChatroommember(value?: ChatRoomMember, index?: number): ChatRoomMember;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Contact.AsObject;
    static toObject(includeInstance: boolean, msg: Contact): Contact.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Contact, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Contact;
    static deserializeBinaryFromReader(message: Contact, reader: jspb.BinaryReader): Contact;
}

export namespace Contact {
    export type AsObject = {
        username: string,
        nickname: string,
        avatar: string,
        gender: number,
        signature: string,
        alias: string,
        label: string,
        remark: string,
        city: string,
        province: string,
        country: string,
        contactaddscene: number,
        stranger: boolean,
        encryptusername: string,
        phoneList: Array<string>,
        chatroomownerusername: string,
        chatroommaxcount: number,
        chatroommemberList: Array<ChatRoomMember.AsObject>,
    }
}

export class Message extends jspb.Message { 
    getId(): string;
    setId(value: string): Message;
    getType(): number;
    setType(value: number): Message;
    getCreatetime(): number;
    setCreatetime(value: number): Message;
    getFromusername(): string;
    setFromusername(value: string): Message;
    getTousername(): string;
    setTousername(value: string): Message;
    getContent(): string;
    setContent(value: string): Message;
    getPushcontent(): string;
    setPushcontent(value: string): Message;
    getBinarypayload(): Uint8Array | string;
    getBinarypayload_asU8(): Uint8Array;
    getBinarypayload_asB64(): string;
    setBinarypayload(value: Uint8Array | string): Message;
    clearAtList(): void;
    getAtList(): Array<string>;
    setAtList(value: Array<string>): Message;
    addAt(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Message.AsObject;
    static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Message;
    static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
    export type AsObject = {
        id: string,
        type: number,
        createtime: number,
        fromusername: string,
        tousername: string,
        content: string,
        pushcontent: string,
        binarypayload: Uint8Array | string,
        atList: Array<string>,
    }
}

export class Host extends jspb.Message { 
    getHost(): string;
    setHost(value: string): Host;
    getPort(): number;
    setPort(value: number): Host;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Host.AsObject;
    static toObject(includeInstance: boolean, msg: Host): Host.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Host, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Host;
    static deserializeBinaryFromReader(message: Host, reader: jspb.BinaryReader): Host;
}

export namespace Host {
    export type AsObject = {
        host: string,
        port: number,
    }
}

export class SnsMoment extends jspb.Message { 
    getId(): string;
    setId(value: string): SnsMoment;
    getUsername(): string;
    setUsername(value: string): SnsMoment;
    getNickname(): string;
    setNickname(value: string): SnsMoment;
    getCreatetime(): number;
    setCreatetime(value: number): SnsMoment;
    getContent(): string;
    setContent(value: string): SnsMoment;
    getIsrichtext(): boolean;
    setIsrichtext(value: boolean): SnsMoment;
    clearLikeList(): void;
    getLikeList(): Array<SnsMomentComment>;
    setLikeList(value: Array<SnsMomentComment>): SnsMoment;
    addLike(value?: SnsMomentComment, index?: number): SnsMomentComment;
    clearCommentList(): void;
    getCommentList(): Array<SnsMomentComment>;
    setCommentList(value: Array<SnsMomentComment>): SnsMoment;
    addComment(value?: SnsMomentComment, index?: number): SnsMomentComment;
    clearWithList(): void;
    getWithList(): Array<SnsMomentComment>;
    setWithList(value: Array<SnsMomentComment>): SnsMoment;
    addWith(value?: SnsMomentComment, index?: number): SnsMomentComment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsMoment.AsObject;
    static toObject(includeInstance: boolean, msg: SnsMoment): SnsMoment.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsMoment, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsMoment;
    static deserializeBinaryFromReader(message: SnsMoment, reader: jspb.BinaryReader): SnsMoment;
}

export namespace SnsMoment {
    export type AsObject = {
        id: string,
        username: string,
        nickname: string,
        createtime: number,
        content: string,
        isrichtext: boolean,
        likeList: Array<SnsMomentComment.AsObject>,
        commentList: Array<SnsMomentComment.AsObject>,
        pb_withList: Array<SnsMomentComment.AsObject>,
    }
}

export class SnsMomentComment extends jspb.Message { 
    getId(): string;
    setId(value: string): SnsMomentComment;
    getCreatetime(): number;
    setCreatetime(value: number): SnsMomentComment;
    getUsername(): string;
    setUsername(value: string): SnsMomentComment;
    getNickname(): string;
    setNickname(value: string): SnsMomentComment;
    getContent(): string;
    setContent(value: string): SnsMomentComment;
    getIsrichtext(): boolean;
    setIsrichtext(value: boolean): SnsMomentComment;
    getReplycommentid(): string;
    setReplycommentid(value: string): SnsMomentComment;
    getReplyusername(): string;
    setReplyusername(value: string): SnsMomentComment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnsMomentComment.AsObject;
    static toObject(includeInstance: boolean, msg: SnsMomentComment): SnsMomentComment.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnsMomentComment, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnsMomentComment;
    static deserializeBinaryFromReader(message: SnsMomentComment, reader: jspb.BinaryReader): SnsMomentComment;
}

export namespace SnsMomentComment {
    export type AsObject = {
        id: string,
        createtime: number,
        username: string,
        nickname: string,
        content: string,
        isrichtext: boolean,
        replycommentid: string,
        replyusername: string,
    }
}

export class SystemKickOutEvent extends jspb.Message { 
    getErrorcode(): number;
    setErrorcode(value: number): SystemKickOutEvent;
    getErrormessage(): string;
    setErrormessage(value: string): SystemKickOutEvent;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SystemKickOutEvent.AsObject;
    static toObject(includeInstance: boolean, msg: SystemKickOutEvent): SystemKickOutEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SystemKickOutEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SystemKickOutEvent;
    static deserializeBinaryFromReader(message: SystemKickOutEvent, reader: jspb.BinaryReader): SystemKickOutEvent;
}

export namespace SystemKickOutEvent {
    export type AsObject = {
        errorcode: number,
        errormessage: string,
    }
}

export class SystemLongLinkUpdateEvent extends jspb.Message { 

    hasLonglinkhost(): boolean;
    clearLonglinkhost(): void;
    getLonglinkhost(): Host | undefined;
    setLonglinkhost(value?: Host): SystemLongLinkUpdateEvent;
    getReconnectimmediately(): boolean;
    setReconnectimmediately(value: boolean): SystemLongLinkUpdateEvent;
    clearLonglinkhostlistList(): void;
    getLonglinkhostlistList(): Array<Host>;
    setLonglinkhostlistList(value: Array<Host>): SystemLongLinkUpdateEvent;
    addLonglinkhostlist(value?: Host, index?: number): Host;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SystemLongLinkUpdateEvent.AsObject;
    static toObject(includeInstance: boolean, msg: SystemLongLinkUpdateEvent): SystemLongLinkUpdateEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SystemLongLinkUpdateEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SystemLongLinkUpdateEvent;
    static deserializeBinaryFromReader(message: SystemLongLinkUpdateEvent, reader: jspb.BinaryReader): SystemLongLinkUpdateEvent;
}

export namespace SystemLongLinkUpdateEvent {
    export type AsObject = {
        longlinkhost?: Host.AsObject,
        reconnectimmediately: boolean,
        longlinkhostlistList: Array<Host.AsObject>,
    }
}

export class SystemNoticeEvent extends jspb.Message { 
    getNotice(): string;
    setNotice(value: string): SystemNoticeEvent;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SystemNoticeEvent.AsObject;
    static toObject(includeInstance: boolean, msg: SystemNoticeEvent): SystemNoticeEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SystemNoticeEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SystemNoticeEvent;
    static deserializeBinaryFromReader(message: SystemNoticeEvent, reader: jspb.BinaryReader): SystemNoticeEvent;
}

export namespace SystemNoticeEvent {
    export type AsObject = {
        notice: string,
    }
}

export class ClientStopEvent extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClientStopEvent.AsObject;
    static toObject(includeInstance: boolean, msg: ClientStopEvent): ClientStopEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ClientStopEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClientStopEvent;
    static deserializeBinaryFromReader(message: ClientStopEvent, reader: jspb.BinaryReader): ClientStopEvent;
}

export namespace ClientStopEvent {
    export type AsObject = {
    }
}

export class SystemEventRequest extends jspb.Message { 

    hasKickoutevent(): boolean;
    clearKickoutevent(): void;
    getKickoutevent(): SystemKickOutEvent | undefined;
    setKickoutevent(value?: SystemKickOutEvent): SystemEventRequest;

    hasLonglinkupdateevent(): boolean;
    clearLonglinkupdateevent(): void;
    getLonglinkupdateevent(): SystemLongLinkUpdateEvent | undefined;
    setLonglinkupdateevent(value?: SystemLongLinkUpdateEvent): SystemEventRequest;

    hasNoticeevent(): boolean;
    clearNoticeevent(): void;
    getNoticeevent(): SystemNoticeEvent | undefined;
    setNoticeevent(value?: SystemNoticeEvent): SystemEventRequest;

    hasClientstopevent(): boolean;
    clearClientstopevent(): void;
    getClientstopevent(): ClientStopEvent | undefined;
    setClientstopevent(value?: ClientStopEvent): SystemEventRequest;

    getPayloadCase(): SystemEventRequest.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SystemEventRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SystemEventRequest): SystemEventRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SystemEventRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SystemEventRequest;
    static deserializeBinaryFromReader(message: SystemEventRequest, reader: jspb.BinaryReader): SystemEventRequest;
}

export namespace SystemEventRequest {
    export type AsObject = {
        kickoutevent?: SystemKickOutEvent.AsObject,
        longlinkupdateevent?: SystemLongLinkUpdateEvent.AsObject,
        noticeevent?: SystemNoticeEvent.AsObject,
        clientstopevent?: ClientStopEvent.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        KICKOUTEVENT = 1,
        LONGLINKUPDATEEVENT = 2,
        NOTICEEVENT = 3,
        CLIENTSTOPEVENT = 4,
    }

}

export class SystemEventResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SystemEventResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SystemEventResponse): SystemEventResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SystemEventResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SystemEventResponse;
    static deserializeBinaryFromReader(message: SystemEventResponse, reader: jspb.BinaryReader): SystemEventResponse;
}

export namespace SystemEventResponse {
    export type AsObject = {
    }
}

export class SyncRequest extends jspb.Message { 
    getScene(): SyncRequestScene;
    setScene(value: SyncRequestScene): SyncRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SyncRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SyncRequest): SyncRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SyncRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SyncRequest;
    static deserializeBinaryFromReader(message: SyncRequest, reader: jspb.BinaryReader): SyncRequest;
}

export namespace SyncRequest {
    export type AsObject = {
        scene: SyncRequestScene,
    }
}

export class SyncResponse extends jspb.Message { 

    hasPayload(): boolean;
    clearPayload(): void;
    getPayload(): SyncEvent | undefined;
    setPayload(value?: SyncEvent): SyncResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SyncResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SyncResponse): SyncResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SyncResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SyncResponse;
    static deserializeBinaryFromReader(message: SyncResponse, reader: jspb.BinaryReader): SyncResponse;
}

export namespace SyncResponse {
    export type AsObject = {
        payload?: SyncEvent.AsObject,
    }
}

export class GetMessageImageRequest extends jspb.Message { 
    getImagetype(): ImageType;
    setImagetype(value: ImageType): GetMessageImageRequest;
    getMessagecontent(): string;
    setMessagecontent(value: string): GetMessageImageRequest;
    getMessagetousername(): string;
    setMessagetousername(value: string): GetMessageImageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageImageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageImageRequest): GetMessageImageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageImageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageImageRequest;
    static deserializeBinaryFromReader(message: GetMessageImageRequest, reader: jspb.BinaryReader): GetMessageImageRequest;
}

export namespace GetMessageImageRequest {
    export type AsObject = {
        imagetype: ImageType,
        messagecontent: string,
        messagetousername: string,
    }
}

export class GetMessageImageResponse extends jspb.Message { 

    hasFiledownloadrequest(): boolean;
    clearFiledownloadrequest(): void;
    getFiledownloadrequest(): FileDownloadRequest | undefined;
    setFiledownloadrequest(value?: FileDownloadRequest): GetMessageImageResponse;
    getImagetype(): ImageType;
    setImagetype(value: ImageType): GetMessageImageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageImageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageImageResponse): GetMessageImageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageImageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageImageResponse;
    static deserializeBinaryFromReader(message: GetMessageImageResponse, reader: jspb.BinaryReader): GetMessageImageResponse;
}

export namespace GetMessageImageResponse {
    export type AsObject = {
        filedownloadrequest?: FileDownloadRequest.AsObject,
        imagetype: ImageType,
    }
}

export class FileDownloadRequest extends jspb.Message { 

    hasHost(): boolean;
    clearHost(): void;
    getHost(): Host | undefined;
    setHost(value?: Host): FileDownloadRequest;
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): FileDownloadRequest;
    getUnpackaeskey(): Uint8Array | string;
    getUnpackaeskey_asU8(): Uint8Array;
    getUnpackaeskey_asB64(): string;
    setUnpackaeskey(value: Uint8Array | string): FileDownloadRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileDownloadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FileDownloadRequest): FileDownloadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileDownloadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileDownloadRequest;
    static deserializeBinaryFromReader(message: FileDownloadRequest, reader: jspb.BinaryReader): FileDownloadRequest;
}

export namespace FileDownloadRequest {
    export type AsObject = {
        host?: Host.AsObject,
        payload: Uint8Array | string,
        unpackaeskey: Uint8Array | string,
    }
}

export class SyncContactRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SyncContactRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SyncContactRequest): SyncContactRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SyncContactRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SyncContactRequest;
    static deserializeBinaryFromReader(message: SyncContactRequest, reader: jspb.BinaryReader): SyncContactRequest;
}

export namespace SyncContactRequest {
    export type AsObject = {
    }
}

export class SyncContactResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SyncContactResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SyncContactResponse): SyncContactResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SyncContactResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SyncContactResponse;
    static deserializeBinaryFromReader(message: SyncContactResponse, reader: jspb.BinaryReader): SyncContactResponse;
}

export namespace SyncContactResponse {
    export type AsObject = {
    }
}

export class GetMessageVoiceRequest extends jspb.Message { 
    getMessageid(): string;
    setMessageid(value: string): GetMessageVoiceRequest;
    getMessagecontent(): string;
    setMessagecontent(value: string): GetMessageVoiceRequest;
    getMessagetousername(): string;
    setMessagetousername(value: string): GetMessageVoiceRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageVoiceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageVoiceRequest): GetMessageVoiceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageVoiceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageVoiceRequest;
    static deserializeBinaryFromReader(message: GetMessageVoiceRequest, reader: jspb.BinaryReader): GetMessageVoiceRequest;
}

export namespace GetMessageVoiceRequest {
    export type AsObject = {
        messageid: string,
        messagecontent: string,
        messagetousername: string,
    }
}

export class GetMessageVoiceResponse extends jspb.Message { 
    getVoice(): Uint8Array | string;
    getVoice_asU8(): Uint8Array;
    getVoice_asB64(): string;
    setVoice(value: Uint8Array | string): GetMessageVoiceResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageVoiceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageVoiceResponse): GetMessageVoiceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageVoiceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageVoiceResponse;
    static deserializeBinaryFromReader(message: GetMessageVoiceResponse, reader: jspb.BinaryReader): GetMessageVoiceResponse;
}

export namespace GetMessageVoiceResponse {
    export type AsObject = {
        voice: Uint8Array | string,
    }
}

export class GetMessageVideoThumbRequest extends jspb.Message { 
    getMessagecontent(): string;
    setMessagecontent(value: string): GetMessageVideoThumbRequest;
    getMessagetousername(): string;
    setMessagetousername(value: string): GetMessageVideoThumbRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageVideoThumbRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageVideoThumbRequest): GetMessageVideoThumbRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageVideoThumbRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageVideoThumbRequest;
    static deserializeBinaryFromReader(message: GetMessageVideoThumbRequest, reader: jspb.BinaryReader): GetMessageVideoThumbRequest;
}

export namespace GetMessageVideoThumbRequest {
    export type AsObject = {
        messagecontent: string,
        messagetousername: string,
    }
}

export class GetMessageVideoThumbResponse extends jspb.Message { 

    hasFiledownloadrequest(): boolean;
    clearFiledownloadrequest(): void;
    getFiledownloadrequest(): FileDownloadRequest | undefined;
    setFiledownloadrequest(value?: FileDownloadRequest): GetMessageVideoThumbResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageVideoThumbResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageVideoThumbResponse): GetMessageVideoThumbResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageVideoThumbResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageVideoThumbResponse;
    static deserializeBinaryFromReader(message: GetMessageVideoThumbResponse, reader: jspb.BinaryReader): GetMessageVideoThumbResponse;
}

export namespace GetMessageVideoThumbResponse {
    export type AsObject = {
        filedownloadrequest?: FileDownloadRequest.AsObject,
    }
}

export class GetMessageVideoRequest extends jspb.Message { 
    getMessagecontent(): string;
    setMessagecontent(value: string): GetMessageVideoRequest;
    getMessagetousername(): string;
    setMessagetousername(value: string): GetMessageVideoRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageVideoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageVideoRequest): GetMessageVideoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageVideoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageVideoRequest;
    static deserializeBinaryFromReader(message: GetMessageVideoRequest, reader: jspb.BinaryReader): GetMessageVideoRequest;
}

export namespace GetMessageVideoRequest {
    export type AsObject = {
        messagecontent: string,
        messagetousername: string,
    }
}

export class GetMessageVideoResponse extends jspb.Message { 

    hasFiledownloadrequest(): boolean;
    clearFiledownloadrequest(): void;
    getFiledownloadrequest(): FileDownloadRequest | undefined;
    setFiledownloadrequest(value?: FileDownloadRequest): GetMessageVideoResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageVideoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageVideoResponse): GetMessageVideoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageVideoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageVideoResponse;
    static deserializeBinaryFromReader(message: GetMessageVideoResponse, reader: jspb.BinaryReader): GetMessageVideoResponse;
}

export namespace GetMessageVideoResponse {
    export type AsObject = {
        filedownloadrequest?: FileDownloadRequest.AsObject,
    }
}

export class GetMessageAttachRequest extends jspb.Message { 
    getMessagecontent(): string;
    setMessagecontent(value: string): GetMessageAttachRequest;
    getMessagetousername(): string;
    setMessagetousername(value: string): GetMessageAttachRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageAttachRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageAttachRequest): GetMessageAttachRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageAttachRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageAttachRequest;
    static deserializeBinaryFromReader(message: GetMessageAttachRequest, reader: jspb.BinaryReader): GetMessageAttachRequest;
}

export namespace GetMessageAttachRequest {
    export type AsObject = {
        messagecontent: string,
        messagetousername: string,
    }
}

export class GetMessageAttachResponse extends jspb.Message { 

    hasFiledownloadrequest(): boolean;
    clearFiledownloadrequest(): void;
    getFiledownloadrequest(): FileDownloadRequest | undefined;
    setFiledownloadrequest(value?: FileDownloadRequest): GetMessageAttachResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageAttachResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageAttachResponse): GetMessageAttachResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageAttachResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageAttachResponse;
    static deserializeBinaryFromReader(message: GetMessageAttachResponse, reader: jspb.BinaryReader): GetMessageAttachResponse;
}

export namespace GetMessageAttachResponse {
    export type AsObject = {
        filedownloadrequest?: FileDownloadRequest.AsObject,
    }
}

export class GetMessageAttachThumbRequest extends jspb.Message { 
    getMessagecontent(): string;
    setMessagecontent(value: string): GetMessageAttachThumbRequest;
    getMessagetousername(): string;
    setMessagetousername(value: string): GetMessageAttachThumbRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageAttachThumbRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageAttachThumbRequest): GetMessageAttachThumbRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageAttachThumbRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageAttachThumbRequest;
    static deserializeBinaryFromReader(message: GetMessageAttachThumbRequest, reader: jspb.BinaryReader): GetMessageAttachThumbRequest;
}

export namespace GetMessageAttachThumbRequest {
    export type AsObject = {
        messagecontent: string,
        messagetousername: string,
    }
}

export class GetMessageAttachThumbResponse extends jspb.Message { 

    hasFiledownloadrequest(): boolean;
    clearFiledownloadrequest(): void;
    getFiledownloadrequest(): FileDownloadRequest | undefined;
    setFiledownloadrequest(value?: FileDownloadRequest): GetMessageAttachThumbResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageAttachThumbResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageAttachThumbResponse): GetMessageAttachThumbResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageAttachThumbResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageAttachThumbResponse;
    static deserializeBinaryFromReader(message: GetMessageAttachThumbResponse, reader: jspb.BinaryReader): GetMessageAttachThumbResponse;
}

export namespace GetMessageAttachThumbResponse {
    export type AsObject = {
        filedownloadrequest?: FileDownloadRequest.AsObject,
    }
}

export class ForwardMessageRequest extends jspb.Message { 
    getTousername(): string;
    setTousername(value: string): ForwardMessageRequest;
    getMessagetype(): number;
    setMessagetype(value: number): ForwardMessageRequest;
    getMessagecontent(): string;
    setMessagecontent(value: string): ForwardMessageRequest;
    getMessagetousername(): string;
    setMessagetousername(value: string): ForwardMessageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ForwardMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ForwardMessageRequest): ForwardMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ForwardMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ForwardMessageRequest;
    static deserializeBinaryFromReader(message: ForwardMessageRequest, reader: jspb.BinaryReader): ForwardMessageRequest;
}

export namespace ForwardMessageRequest {
    export type AsObject = {
        tousername: string,
        messagetype: number,
        messagecontent: string,
        messagetousername: string,
    }
}

export class ForwardMessageResponse extends jspb.Message { 
    getMsgid(): string;
    setMsgid(value: string): ForwardMessageResponse;

    hasMessagerevokeinfo(): boolean;
    clearMessagerevokeinfo(): void;
    getMessagerevokeinfo(): MessageRevokeInfo | undefined;
    setMessagerevokeinfo(value?: MessageRevokeInfo): ForwardMessageResponse;
    getMsgcontent(): string;
    setMsgcontent(value: string): ForwardMessageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ForwardMessageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ForwardMessageResponse): ForwardMessageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ForwardMessageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ForwardMessageResponse;
    static deserializeBinaryFromReader(message: ForwardMessageResponse, reader: jspb.BinaryReader): ForwardMessageResponse;
}

export namespace ForwardMessageResponse {
    export type AsObject = {
        msgid: string,
        messagerevokeinfo?: MessageRevokeInfo.AsObject,
        msgcontent: string,
    }
}

export class RevokeMessageRequest extends jspb.Message { 
    getMsgid(): string;
    setMsgid(value: string): RevokeMessageRequest;

    hasMessagerevokeinfo(): boolean;
    clearMessagerevokeinfo(): void;
    getMessagerevokeinfo(): MessageRevokeInfo | undefined;
    setMessagerevokeinfo(value?: MessageRevokeInfo): RevokeMessageRequest;
    getFromusername(): string;
    setFromusername(value: string): RevokeMessageRequest;
    getTousername(): string;
    setTousername(value: string): RevokeMessageRequest;
    getRevokeseq(): number;
    setRevokeseq(value: number): RevokeMessageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RevokeMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RevokeMessageRequest): RevokeMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RevokeMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RevokeMessageRequest;
    static deserializeBinaryFromReader(message: RevokeMessageRequest, reader: jspb.BinaryReader): RevokeMessageRequest;
}

export namespace RevokeMessageRequest {
    export type AsObject = {
        msgid: string,
        messagerevokeinfo?: MessageRevokeInfo.AsObject,
        fromusername: string,
        tousername: string,
        revokeseq: number,
    }
}

export class RevokeMessageResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RevokeMessageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RevokeMessageResponse): RevokeMessageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RevokeMessageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RevokeMessageResponse;
    static deserializeBinaryFromReader(message: RevokeMessageResponse, reader: jspb.BinaryReader): RevokeMessageResponse;
}

export namespace RevokeMessageResponse {
    export type AsObject = {
    }
}

export class SendContactCardMessageRequest extends jspb.Message { 
    getTousername(): string;
    setTousername(value: string): SendContactCardMessageRequest;

    hasContact(): boolean;
    clearContact(): void;
    getContact(): Contact | undefined;
    setContact(value?: Contact): SendContactCardMessageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendContactCardMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SendContactCardMessageRequest): SendContactCardMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendContactCardMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendContactCardMessageRequest;
    static deserializeBinaryFromReader(message: SendContactCardMessageRequest, reader: jspb.BinaryReader): SendContactCardMessageRequest;
}

export namespace SendContactCardMessageRequest {
    export type AsObject = {
        tousername: string,
        contact?: Contact.AsObject,
    }
}

export class SendContactCardMessageResponse extends jspb.Message { 
    getMsgid(): string;
    setMsgid(value: string): SendContactCardMessageResponse;

    hasMessagerevokeinfo(): boolean;
    clearMessagerevokeinfo(): void;
    getMessagerevokeinfo(): MessageRevokeInfo | undefined;
    setMessagerevokeinfo(value?: MessageRevokeInfo): SendContactCardMessageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendContactCardMessageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SendContactCardMessageResponse): SendContactCardMessageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendContactCardMessageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendContactCardMessageResponse;
    static deserializeBinaryFromReader(message: SendContactCardMessageResponse, reader: jspb.BinaryReader): SendContactCardMessageResponse;
}

export namespace SendContactCardMessageResponse {
    export type AsObject = {
        msgid: string,
        messagerevokeinfo?: MessageRevokeInfo.AsObject,
    }
}

export class SendVoiceMessageRequest extends jspb.Message { 
    getTousername(): string;
    setTousername(value: string): SendVoiceMessageRequest;
    getVoice(): Uint8Array | string;
    getVoice_asU8(): Uint8Array;
    getVoice_asB64(): string;
    setVoice(value: Uint8Array | string): SendVoiceMessageRequest;
    getVoicelength(): number;
    setVoicelength(value: number): SendVoiceMessageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendVoiceMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SendVoiceMessageRequest): SendVoiceMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendVoiceMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendVoiceMessageRequest;
    static deserializeBinaryFromReader(message: SendVoiceMessageRequest, reader: jspb.BinaryReader): SendVoiceMessageRequest;
}

export namespace SendVoiceMessageRequest {
    export type AsObject = {
        tousername: string,
        voice: Uint8Array | string,
        voicelength: number,
    }
}

export class SendVoiceMessageResponse extends jspb.Message { 
    getMsgid(): string;
    setMsgid(value: string): SendVoiceMessageResponse;

    hasMessagerevokeinfo(): boolean;
    clearMessagerevokeinfo(): void;
    getMessagerevokeinfo(): MessageRevokeInfo | undefined;
    setMessagerevokeinfo(value?: MessageRevokeInfo): SendVoiceMessageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendVoiceMessageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SendVoiceMessageResponse): SendVoiceMessageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendVoiceMessageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendVoiceMessageResponse;
    static deserializeBinaryFromReader(message: SendVoiceMessageResponse, reader: jspb.BinaryReader): SendVoiceMessageResponse;
}

export namespace SendVoiceMessageResponse {
    export type AsObject = {
        msgid: string,
        messagerevokeinfo?: MessageRevokeInfo.AsObject,
    }
}

export class SendVideoMessageRequest extends jspb.Message { 
    getTousername(): string;
    setTousername(value: string): SendVideoMessageRequest;

    hasVideo(): boolean;
    clearVideo(): void;
    getVideo(): Uint8Array | string;
    getVideo_asU8(): Uint8Array;
    getVideo_asB64(): string;
    setVideo(value: Uint8Array | string): SendVideoMessageRequest;

    hasVideoparams(): boolean;
    clearVideoparams(): void;
    getVideoparams(): FileUploadVideoParams | undefined;
    setVideoparams(value?: FileUploadVideoParams): SendVideoMessageRequest;

    getPayloadCase(): SendVideoMessageRequest.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendVideoMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SendVideoMessageRequest): SendVideoMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendVideoMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendVideoMessageRequest;
    static deserializeBinaryFromReader(message: SendVideoMessageRequest, reader: jspb.BinaryReader): SendVideoMessageRequest;
}

export namespace SendVideoMessageRequest {
    export type AsObject = {
        tousername: string,
        video: Uint8Array | string,
        videoparams?: FileUploadVideoParams.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        VIDEO = 2,
        VIDEOPARAMS = 3,
    }

}

export class SendVideoMessageResponse extends jspb.Message { 
    getMsgid(): string;
    setMsgid(value: string): SendVideoMessageResponse;

    hasMessagerevokeinfo(): boolean;
    clearMessagerevokeinfo(): void;
    getMessagerevokeinfo(): MessageRevokeInfo | undefined;
    setMessagerevokeinfo(value?: MessageRevokeInfo): SendVideoMessageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendVideoMessageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SendVideoMessageResponse): SendVideoMessageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendVideoMessageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendVideoMessageResponse;
    static deserializeBinaryFromReader(message: SendVideoMessageResponse, reader: jspb.BinaryReader): SendVideoMessageResponse;
}

export namespace SendVideoMessageResponse {
    export type AsObject = {
        msgid: string,
        messagerevokeinfo?: MessageRevokeInfo.AsObject,
    }
}

export class SendFileMessageRequest extends jspb.Message { 
    getTousername(): string;
    setTousername(value: string): SendFileMessageRequest;
    getFilename(): string;
    setFilename(value: string): SendFileMessageRequest;

    hasFile(): boolean;
    clearFile(): void;
    getFile(): Uint8Array | string;
    getFile_asU8(): Uint8Array;
    getFile_asB64(): string;
    setFile(value: Uint8Array | string): SendFileMessageRequest;

    hasFileparams(): boolean;
    clearFileparams(): void;
    getFileparams(): FileUploadFileParams | undefined;
    setFileparams(value?: FileUploadFileParams): SendFileMessageRequest;

    getPayloadCase(): SendFileMessageRequest.PayloadCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendFileMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SendFileMessageRequest): SendFileMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendFileMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendFileMessageRequest;
    static deserializeBinaryFromReader(message: SendFileMessageRequest, reader: jspb.BinaryReader): SendFileMessageRequest;
}

export namespace SendFileMessageRequest {
    export type AsObject = {
        tousername: string,
        filename: string,
        file: Uint8Array | string,
        fileparams?: FileUploadFileParams.AsObject,
    }

    export enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        FILE = 3,
        FILEPARAMS = 4,
    }

}

export class SendFileMessageResponse extends jspb.Message { 
    getMsgid(): string;
    setMsgid(value: string): SendFileMessageResponse;

    hasMessagerevokeinfo(): boolean;
    clearMessagerevokeinfo(): void;
    getMessagerevokeinfo(): MessageRevokeInfo | undefined;
    setMessagerevokeinfo(value?: MessageRevokeInfo): SendFileMessageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendFileMessageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SendFileMessageResponse): SendFileMessageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendFileMessageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendFileMessageResponse;
    static deserializeBinaryFromReader(message: SendFileMessageResponse, reader: jspb.BinaryReader): SendFileMessageResponse;
}

export namespace SendFileMessageResponse {
    export type AsObject = {
        msgid: string,
        messagerevokeinfo?: MessageRevokeInfo.AsObject,
    }
}

export class GetMessageMiniProgramThumbRequest extends jspb.Message { 
    getMessagecontent(): string;
    setMessagecontent(value: string): GetMessageMiniProgramThumbRequest;
    getMessagetousername(): string;
    setMessagetousername(value: string): GetMessageMiniProgramThumbRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageMiniProgramThumbRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageMiniProgramThumbRequest): GetMessageMiniProgramThumbRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageMiniProgramThumbRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageMiniProgramThumbRequest;
    static deserializeBinaryFromReader(message: GetMessageMiniProgramThumbRequest, reader: jspb.BinaryReader): GetMessageMiniProgramThumbRequest;
}

export namespace GetMessageMiniProgramThumbRequest {
    export type AsObject = {
        messagecontent: string,
        messagetousername: string,
    }
}

export class GetMessageMiniProgramThumbResponse extends jspb.Message { 

    hasFiledownloadrequest(): boolean;
    clearFiledownloadrequest(): void;
    getFiledownloadrequest(): FileDownloadRequest | undefined;
    setFiledownloadrequest(value?: FileDownloadRequest): GetMessageMiniProgramThumbResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMessageMiniProgramThumbResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMessageMiniProgramThumbResponse): GetMessageMiniProgramThumbResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMessageMiniProgramThumbResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMessageMiniProgramThumbResponse;
    static deserializeBinaryFromReader(message: GetMessageMiniProgramThumbResponse, reader: jspb.BinaryReader): GetMessageMiniProgramThumbResponse;
}

export namespace GetMessageMiniProgramThumbResponse {
    export type AsObject = {
        filedownloadrequest?: FileDownloadRequest.AsObject,
    }
}

export class GetEncryptedFileRequest extends jspb.Message { 
    getFileid(): string;
    setFileid(value: string): GetEncryptedFileRequest;
    getFilekey(): Uint8Array | string;
    getFilekey_asU8(): Uint8Array;
    getFilekey_asB64(): string;
    setFilekey(value: Uint8Array | string): GetEncryptedFileRequest;
    getFiletype(): EncryptedFileType;
    setFiletype(value: EncryptedFileType): GetEncryptedFileRequest;
    getIschatroommessage(): boolean;
    setIschatroommessage(value: boolean): GetEncryptedFileRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetEncryptedFileRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetEncryptedFileRequest): GetEncryptedFileRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetEncryptedFileRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetEncryptedFileRequest;
    static deserializeBinaryFromReader(message: GetEncryptedFileRequest, reader: jspb.BinaryReader): GetEncryptedFileRequest;
}

export namespace GetEncryptedFileRequest {
    export type AsObject = {
        fileid: string,
        filekey: Uint8Array | string,
        filetype: EncryptedFileType,
        ischatroommessage: boolean,
    }
}

export class GetEncryptedFileResponse extends jspb.Message { 

    hasFiledownloadrequest(): boolean;
    clearFiledownloadrequest(): void;
    getFiledownloadrequest(): FileDownloadRequest | undefined;
    setFiledownloadrequest(value?: FileDownloadRequest): GetEncryptedFileResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetEncryptedFileResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetEncryptedFileResponse): GetEncryptedFileResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetEncryptedFileResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetEncryptedFileResponse;
    static deserializeBinaryFromReader(message: GetEncryptedFileResponse, reader: jspb.BinaryReader): GetEncryptedFileResponse;
}

export namespace GetEncryptedFileResponse {
    export type AsObject = {
        filedownloadrequest?: FileDownloadRequest.AsObject,
    }
}

export class SendEmojiMessageRequest extends jspb.Message { 
    getTousername(): string;
    setTousername(value: string): SendEmojiMessageRequest;
    getMd5(): string;
    setMd5(value: string): SendEmojiMessageRequest;
    getLen(): number;
    setLen(value: number): SendEmojiMessageRequest;
    getType(): number;
    setType(value: number): SendEmojiMessageRequest;
    getGameext(): string;
    setGameext(value: string): SendEmojiMessageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendEmojiMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SendEmojiMessageRequest): SendEmojiMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendEmojiMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendEmojiMessageRequest;
    static deserializeBinaryFromReader(message: SendEmojiMessageRequest, reader: jspb.BinaryReader): SendEmojiMessageRequest;
}

export namespace SendEmojiMessageRequest {
    export type AsObject = {
        tousername: string,
        md5: string,
        len: number,
        type: number,
        gameext: string,
    }
}

export class SendEmojiMessageResponse extends jspb.Message { 
    getMsgid(): string;
    setMsgid(value: string): SendEmojiMessageResponse;

    hasMessagerevokeinfo(): boolean;
    clearMessagerevokeinfo(): void;
    getMessagerevokeinfo(): MessageRevokeInfo | undefined;
    setMessagerevokeinfo(value?: MessageRevokeInfo): SendEmojiMessageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendEmojiMessageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SendEmojiMessageResponse): SendEmojiMessageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendEmojiMessageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendEmojiMessageResponse;
    static deserializeBinaryFromReader(message: SendEmojiMessageResponse, reader: jspb.BinaryReader): SendEmojiMessageResponse;
}

export namespace SendEmojiMessageResponse {
    export type AsObject = {
        msgid: string,
        messagerevokeinfo?: MessageRevokeInfo.AsObject,
    }
}

export enum LoginPolicy {
    DEFAULT = 0,
    SKIP_ONE_CLICK = 1,
}

export enum LoginStatus {
    START = 0,
    ONE_CLICK_EVENT = 1,
    QRCODE_EVENT = 2,
    AUTH_SUCCESS = 3,
    SYNC = 4,
}

export enum LoginType {
    QRLOGIN = 0,
    AUTOLOGIN = 1,
    ONECLICKLOGIN = 2,
}

export enum QRCodeStatus {
    NEW = 0,
    SCANNED = 1,
    CONFIRMED = 2,
    CANCELLED = 3,
    EXPIRED = 4,
    UNKNOWN_ERROR = 5,
}

export enum LongLinkMessageType {
    NORMAL_MESSAGE = 0,
    PUSH_MESSAGE = 1,
}

export enum LongLinkMessagePushType {
    NEW_MESSAGE = 0,
    LOGIN_STATUS_NOTIFY = 1,
}

export enum AddContactScene {
    MOBILE_PHONE = 0,
    WECHAT_ID = 1,
    QQ_ID = 2,
    CHATROOM = 3,
    CONTACT_QR = 4,
    CONTACT_CARD = 5,
    SINGLE_CHAT = 6,
}

export enum ZombieStatue {
    STRANGER = 0,
    FRIEND = 1,
    ZOMBIE = 2,
}

export enum AddChatRoomMemberType {
    ALREADY_IN_ROOM = 0,
    ADD = 1,
    INVITE = 2,
    NEED_ADMIN_APPROVE = 3,
}

export enum SyncRequestScene {
    ON_PUSH = 0,
    LONGLINK_INIT = 1,
}

export enum ImageType {
    THUMB = 0,
    NORMAL = 1,
    HD = 2,
}

export enum EncryptedFileType {
    IMAGE_THUMB = 0,
    IMAGE_NORMAL = 1,
    IMAGE_HD = 2,
    VIDEO = 3,
    FILE = 4,
}
