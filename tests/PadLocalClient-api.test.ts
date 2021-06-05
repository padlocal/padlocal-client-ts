import { prepareSignedOnClient } from "./Common";
import { PadLocalClient } from "../src/PadLocalClient";
import { genIdempotentId, stringifyPB } from "../src/utils/Utils";
import config from "config";
import * as fs from "fs";
import * as pb from "../src/proto/padlocal_pb";
import {
  AddChatRoomMemberType,
  EncryptedFileType,
  MessageRevokeInfo,
  SendTextMessageResponse,
  SyncRequestScene,
  ZombieStatue,
} from "../src/proto/padlocal_pb";
import { Bytes, hexStringToBytes } from "../src/utils/ByteUtils";
import { log } from "brolog";
import { FileBox } from "file-box";

let client: PadLocalClient;

beforeAll(async () => {
  client = await prepareSignedOnClient();
});

afterAll(() => {
  client.shutdown();
});

test("sync", async () => {
  const syncEvent = await client.api.sync(SyncRequestScene.ON_PUSH);
  log.info(`sync result: ${stringifyPB(syncEvent)}`);

  expect(syncEvent).not.toBeNull();
});

describe("message", () => {
  describe("send", () => {
    const toUserName: string = config.get("test.message.send.toUserName");
    const toChatRoom: string = config.get("test.message.send.toChatRoom");
    const atUserList: string[] = config.get("test.message.send.atUserNameList");
    const sendImageFilePath: string = config.get("test.message.send.imageFilePath");

    test("send to user", async () => {
      const response: SendTextMessageResponse = await client.api.sendTextMessage(
        genIdempotentId(),
        toUserName,
        `text message: ${new Date().toString()}`
      );
      log.info(`send text message to ${toUserName}, return message: ${JSON.stringify(response.toObject())}`);

      expect(response.getMsgid()).toBeTruthy();
    });

    test("send to chatroom", async () => {
      const response: SendTextMessageResponse = await client.api.sendTextMessage(
        genIdempotentId(),
        toChatRoom,
        `text message: ${new Date().toString()}`
      );
      log.info(`send text message to ${toChatRoom}, return message: ${JSON.stringify(response.toObject())}`);

      expect(response.getMsgid()).toBeTruthy();
    });

    test("send to chatroom with single at list", async () => {
      const response: SendTextMessageResponse = await client.api.sendTextMessage(
        genIdempotentId(),
        toChatRoom,
        `@xxx text message: ${new Date().toString()}`,
        atUserList.slice(0, 1)
      );
      log.info(`send text message to ${toChatRoom}, return message: ${response.toObject()}`);

      expect(response.getMsgid()).toBeTruthy();
    });

    test("send to chatroom with multiple at list", async () => {
      const response: SendTextMessageResponse = await client.api.sendTextMessage(
        genIdempotentId(),
        toChatRoom,
        `text message: ${new Date().toString()}`,
        atUserList
      );
      log.info(`send text message to ${toChatRoom}, return msgId: ${response.toObject()}`);

      expect(response.getMsgid()).toBeTruthy();
    });

    test("send image message", async () => {
      const imageData: Buffer = fs.readFileSync(sendImageFilePath);

      const response = await client.api.sendImageMessage(genIdempotentId(), toUserName, imageData);

      log.info(`send image message to ${toUserName}, return message: ${JSON.stringify(response.toObject())}`);

      expect(response.getMsgid()).toBeTruthy();
    });

    test("send voice message", async () => {
      const voiceLength: number = config.get("test.message.send.voiceLength");

      const sendVoiceFilePath: string = config.get("test.message.send.voiceFilePath");
      const voiceData: Buffer = fs.readFileSync(sendVoiceFilePath);

      const response = await client.api.sendVoiceMessage(genIdempotentId(), toUserName, voiceData, voiceLength);

      log.info(`send voice message to ${toUserName}, return message: ${JSON.stringify(response.toObject())}`);

      expect(response.getMsgid()).toBeTruthy();
    });

    test("send video message", async () => {
      const sendVideoFilePath: string = config.get("test.message.send.videoFilePath");
      const videoData: Buffer = fs.readFileSync(sendVideoFilePath);
      const response = await client.api.sendVideoMessage(genIdempotentId(), toUserName, videoData);

      log.info(`send video message to ${toUserName}, return message: ${JSON.stringify(response.toObject())}`);

      expect(response.getMsgid()).toBeTruthy();
    });

    test("send file message", async () => {
      const sendFileFilePath: string = config.get("test.message.send.fileFilePath");
      const fileData: Buffer = fs.readFileSync(sendFileFilePath);
      const fileName: string = sendFileFilePath.replace(/^.*[\\\/]/, "");
      const response = await client.api.sendFileMessage(genIdempotentId(), toUserName, fileData, fileName);

      log.info(`send file message to ${toUserName}, return message: ${JSON.stringify(response.toObject())}`);

      expect(response.getMsgid()).toBeTruthy();
      expect(response.getMessagerevokeinfo()).toBeTruthy();
      expect(response.getMessagerevokeinfo()!.getClientmsgid()).toBeTruthy();
    }, 300000);

    test("send link message", async () => {
      const title: string = `[${Date.now()}]` + config.get("test.message.send.link.title");
      const description: string = config.get("test.message.send.link.description");
      const url: string = config.get("test.message.send.link.url");
      const thumbImageUrl: string = config.get("test.message.send.link.thumbImageUrl");

      const sendLinkMessage = async (useThumbBinary: boolean = false) => {
        const appMessageLink = new pb.AppMessageLink().setTitle(title).setDescription(description).setUrl(url);

        if (useThumbBinary) {
          const fileBox = FileBox.fromUrl(thumbImageUrl);
          const imageBinary = await fileBox.toBuffer();
          appMessageLink.setThumbimage(imageBinary);
        } else {
          appMessageLink.setThumburl(thumbImageUrl);
        }

        const msgId = await client.api.sendMessageLink(genIdempotentId(), toChatRoom, appMessageLink);

        log.info(`send link message to ${toUserName}, return msgId: ${msgId}`);

        expect(msgId).toBeTruthy();
      };

      await sendLinkMessage(false);
      await sendLinkMessage(true);
    });

    test("send miniprogram message", async () => {
      const title: string = config.get("test.message.send.miniProgram.title");
      const url: string = config.get("test.message.send.miniProgram.url");
      const thumbFilePath: string = config.get("test.message.send.miniProgram.thumbFilePath");
      const mpAppUserName: string = config.get("test.message.send.miniProgram.mpAppUserName");
      const mpAppName: string = config.get("test.message.send.miniProgram.mpAppName");
      const mpAppId: string = config.get("test.message.send.miniProgram.mpAppId");
      const mpAppIconUrl: string = config.get("test.message.send.miniProgram.mpAppIconUrl");
      const mpAppPath: string = config.get("test.message.send.miniProgram.mpAppPath");

      const thumbImageData: Buffer = fs.readFileSync(thumbFilePath);

      const msgId = await client.api.sendMessageMiniProgram(
        genIdempotentId(),
        toUserName,
        new pb.AppMessageMiniProgram()
          .setTitle(title)
          .setUrl(url)
          .setMpappusername(mpAppUserName)
          .setMpappname(mpAppName)
          .setMpappid(mpAppId)
          .setMpappiconurl(mpAppIconUrl)
          .setMpapppath(mpAppPath),
        thumbImageData
      );

      log.info(`send miniprogram message to ${toUserName}, return msg id: ${msgId}`);

      expect(msgId).toBeTruthy();
    });

    test("forward mini program message", async () => {
      const payload: string = config.get("test.message.send.miniProgramMessage");
      const originalMessage = pb.Message.deserializeBinary(hexStringToBytes(payload));

      const msgId = await client.api.forwardMessage(
        genIdempotentId(),
        toChatRoom,
        originalMessage.getContent(),
        originalMessage.getType(),
        originalMessage.getTousername()
      );

      log.info(`forward miniprogram message to ${toChatRoom}, return msg id: ${msgId}`);

      expect(msgId).toBeTruthy();
    });

    test("revoke message", async () => {
      const msgId: string = config.get("test.message.revoke.msgId");
      const clientMsgId: string = config.get("test.message.revoke.clientMsgId");
      const newClientMsgId: string = config.get("test.message.revoke.newClientMsgId");
      const createTime: number = config.get("test.message.revoke.createTime");
      const fromUserName: string = config.get("test.message.revoke.fromUserName");
      const toUserName: string = config.get("test.message.revoke.toUserName");

      await client.api.revokeMessage(
        msgId,
        fromUserName,
        toUserName,
        new MessageRevokeInfo().setClientmsgid(clientMsgId).setNewclientmsgid(newClientMsgId).setCreatetime(createTime)
      );
    });

    test("send contact card message", async () => {
      const payload: string = config.get("test.message.send.contactCard");
      const contact = pb.Contact.deserializeBinary(hexStringToBytes(payload));

      const response = await client.api.sendContactCardMessage(genIdempotentId(), toChatRoom, contact);
      expect(response).toBeTruthy();
      expect(response.getMsgid()).toBeTruthy();
      expect(response.getMessagerevokeinfo()).toBeTruthy();
      expect(response.getMessagerevokeinfo()!.getNewclientmsgid()).toBeTruthy();
      expect(response.getMessagerevokeinfo()!.getCreatetime()).toBeTruthy();
    });

    test("send emoji message", async () => {
      const emojiMd5: string = config.get("test.message.send.emoji.md5");
      const emojiLen: number = config.get("test.message.send.emoji.len");
      const emojiType: number = config.get("test.message.send.emoji.type");
      const emojiGameExt: string = config.get("test.message.send.emoji.gameext");

      const response = await client.api.sendMessageEmoji(
        genIdempotentId(),
        toUserName,
        emojiMd5,
        emojiLen,
        emojiType,
        emojiGameExt
      );

      expect(response).toBeTruthy();
      expect(response.getMsgid()).toBeTruthy();
      expect(response.getMessagerevokeinfo()).toBeTruthy();
      expect(response.getMessagerevokeinfo()!.getNewclientmsgid()).toBeTruthy();
      expect(response.getMessagerevokeinfo()!.getCreatetime()).toBeTruthy();
    });
  });

  describe("get message payload", () => {
    const payloadDir: string = config.get("test.message.payload.outFileDir");

    if (!fs.statSync(payloadDir).isDirectory()) {
      fs.mkdirSync(payloadDir);
    }

    test("get message with normal image", async () => {
      const message = pb.Message.deserializeBinary(
        hexStringToBytes(config.get("test.message.payload.normalImageMessage"))
      );

      const imageResult = await client.api.getMessageImage(
        message.getContent(),
        message.getTousername(),
        pb.ImageType.NORMAL
      );
      expect(imageResult.imageType === pb.ImageType.NORMAL);
      expect(imageResult.imageData.length).toBeTruthy();

      const normalFilePath = `${payloadDir}/${message.getId()}-${imageResult.imageType}.jpg`;
      fs.writeFileSync(normalFilePath, imageResult.imageData);
      log.info(`write image to ${normalFilePath}`);

      const hdImageResult = await client.api.getMessageImage(
        message.getContent(),
        message.getTousername(),
        pb.ImageType.HD
      );
      expect(hdImageResult.imageType === pb.ImageType.NORMAL);
      expect(hdImageResult.imageData.length).toBe(imageResult.imageData.length);
    });

    test("get message with hd image", async () => {
      const message = pb.Message.deserializeBinary(hexStringToBytes(config.get("test.message.payload.hdImageMessage")));

      const imageResult = await client.api.getMessageImage(
        message.getContent(),
        message.getTousername(),
        pb.ImageType.NORMAL
      );
      expect(imageResult.imageType === pb.ImageType.NORMAL);
      expect(imageResult.imageData.length).toBeTruthy();

      const normalFilePath = `${payloadDir}/${message.getId()}-${imageResult.imageType}.jpg`;
      fs.writeFileSync(normalFilePath, imageResult.imageData);
      log.info(`write image to ${normalFilePath}`);

      const hdImageResult = await client.api.getMessageImage(
        message.getContent(),
        message.getTousername(),
        pb.ImageType.HD
      );
      expect(hdImageResult.imageType === pb.ImageType.HD);
      expect(hdImageResult.imageData.length).toBeTruthy();

      const hdFilePath = `${payloadDir}/${message.getId()}-${hdImageResult.imageType}.jpg`;
      fs.writeFileSync(hdFilePath, hdImageResult.imageData);
      log.info(`write image to ${hdFilePath}`);
    });

    test("get message voice", async () => {
      const message = pb.Message.deserializeBinary(hexStringToBytes(config.get("test.message.payload.voiceMessage")));

      const voiceData = await client.api.getMessageVoice(
        message.getId(),
        message.getContent(),
        message.getTousername()
      );
      expect(voiceData).toBeTruthy();

      const filePath = `${payloadDir}/${message.getId()}-voice.slk`;
      fs.writeFileSync(filePath, voiceData);
      log.info(`write voice to ${filePath}`);
    });

    test("get message videoThumb", async () => {
      const message = pb.Message.deserializeBinary(hexStringToBytes(config.get("test.message.payload.videoMessage")));

      const videoThumbData = await client.api.getMessageVideoThumb(message.getContent(), message.getTousername());
      expect(videoThumbData).toBeTruthy();

      const filePath = `${payloadDir}/${message.getId()}-video-thumb.jpg`;
      fs.writeFileSync(filePath, videoThumbData);
      log.info(`write video thumb to ${filePath}`);
    });

    test("get message video", async () => {
      const message = pb.Message.deserializeBinary(hexStringToBytes(config.get("test.message.payload.videoMessage")));

      const videoData = await client.api.getMessageVideo(message.getContent(), message.getTousername());
      expect(videoData).toBeTruthy();

      const filePath = `${payloadDir}/${message.getId()}-video.mp4`;
      fs.writeFileSync(filePath, videoData);
      log.info(`write video to ${filePath}`);
    });

    test("get message attach", async () => {
      const message = pb.Message.deserializeBinary(hexStringToBytes(config.get("test.message.payload.fileMessage")));

      const fileData = await client.api.getMessageAttach(message.getContent(), message.getTousername());
      expect(fileData).toBeTruthy();

      const filePath = `${payloadDir}/${message.getId()}-file`;
      fs.writeFileSync(filePath, fileData);
      log.info(`write file to ${filePath}`);
    });

    test("get message attach thumb", async () => {
      const message = pb.Message.deserializeBinary(hexStringToBytes(config.get("test.message.payload.linkMessage")));
      const thumbData = await client.api.getMessageAttachThumb(message.getContent(), message.getTousername());
      expect(thumbData).toBeTruthy();

      const filePath = `${payloadDir}/${message.getId()}-thumb`;
      fs.writeFileSync(filePath, thumbData);
      log.info(`write file to ${filePath}`);
    });

    test("get miniprogram message thumb", async () => {
      const message = pb.Message.deserializeBinary(
        hexStringToBytes(config.get("test.message.send.miniProgramMessage"))
      );
      const thumbData = await client.api.getMessageMiniProgramThumb(message.getContent(), message.getTousername());
      expect(thumbData).toBeTruthy();

      const filePath = `${payloadDir}/${message.getId()}-thumb`;
      fs.writeFileSync(filePath, thumbData);
      log.info(`write file to ${filePath}`);
    });

    test("get encrypted file", async () => {
      const fileId: string = config.get("test.message.payload.encryptedFile.fileId");
      const fileKey: Bytes = hexStringToBytes(config.get("test.message.payload.encryptedFile.fileKey"));
      const originalMessageToUserName: string = config.get(
        "test.message.payload.encryptedFile.originalMessageToUserName"
      );

      const fileBinary = await client.api.getEncryptedFile(EncryptedFileType.IMAGE_THUMB, fileId, fileKey);
      expect(fileBinary).toBeTruthy();

      const filePath = `${payloadDir}/encrypted-file-${fileId}`;
      fs.writeFileSync(filePath, fileBinary);
      log.info(`write file to ${filePath}`);
    });
  });
});

describe("contact", () => {
  test("accept user", async () => {
    const userName: string = config.get("test.contact.accept.userName");
    const stranger: string = config.get("test.contact.accept.stranger");
    const ticket: string = config.get("test.contact.accept.ticket");
    const scene: number = config.get("test.contact.accept.scene");
    await client.api.acceptUser(userName, ticket, stranger, scene);

    log.info("accept success");
  });

  test("delete contact", async () => {
    const userName: string = config.get("test.contact.userName");
    await client.api.deleteContact(userName);

    log.info("delete contact success");
  });

  test("add contact", async () => {
    const userName: string = config.get("test.contact.search");
    const searchRes = await client.api.searchContact(userName);

    log.info(`search contact: ${stringifyPB(searchRes)}`);

    expect(searchRes.getContact()).toBeTruthy();
    expect(searchRes.getAntispamticket()).toBeTruthy();
    expect(searchRes.getEncryptusername()).toBeTruthy();

    await client.api.addContact(
      searchRes.getContact()!.getUsername(),
      searchRes.getAntispamticket(),
      pb.AddContactScene.WECHAT_ID,
      "hello i'm padlocal"
    );

    log.info("add contact success");
  });

  test("search contact", async () => {
    const userName: string = config.get("test.contact.search");
    const searchRes = await client.api.searchContact(userName);

    log.info(`search contact: ${stringifyPB(searchRes)}`);
  });

  test("get contact", async () => {
    const userName: string = config.get("test.contact.userName");
    const contact = await client.api.getContact(userName);

    log.info(`get contact: ${stringifyPB(contact)}`);

    expect(contact).not.toBeFalsy();
    expect(contact.getUsername()).not.toBeFalsy();
  });

  test("get self contact qr image", async () => {
    const response = await client.api.getContactQRCode(client.selfContact!.getUsername(), 2);

    expect(response).toBeTruthy();
    expect(response.getQrcode()).toBeTruthy();

    const outFilePath: string = config.get("test.contact.qrImageOutFilePath");
    fs.writeFileSync(outFilePath, response.getQrcode_asU8());
    log.info(`write qr image to: ${outFilePath}`);
  });

  test("update self nickname", async () => {
    await client.api.updateSelfNickName("TestNickName");
  });

  test("update self signature", async () => {
    await client.api.updateSelfSignature("");
    await client.api.updateSelfSignature("Everything is ok");
  });

  test("zombie test", async () => {
    const strangerUserName: string = config.get("test.contact.zombieTest.strangerUserName");
    const friendUserName: string = config.get("test.contact.zombieTest.friendUserName");
    const zombieUserName: string = config.get("test.contact.zombieTest.zombieUserName");

    const strangerStatus = await client.api.zombieTest(strangerUserName);
    expect(strangerStatus).toEqual(ZombieStatue.STRANGER);

    const friendStatus = await client.api.zombieTest(friendUserName);
    expect(friendStatus).toEqual(ZombieStatue.FRIEND);

    const zombieStatus = await client.api.zombieTest(zombieUserName);
    expect(zombieStatus).toEqual(ZombieStatue.ZOMBIE);
  }, 60000000);
});

describe("chatroom", () => {
  const roomId: string = config.get("test.room.id");

  test("create room", async () => {
    const memberUseNameList: string[] = config.get("test.room.create.memberUserNameList");

    const res = await client.api.createChatRoom(genIdempotentId(), memberUseNameList);

    log.info(`create room success: ${stringifyPB(res)}`);

    expect(res).toBeTruthy();
    expect(res.getRoomid()).toBeTruthy();
  });

  test("get room member list", async () => {
    const memberList = await client.api.getChatRoomMembers(roomId);

    log.info(`get room: ${roomId}, memberList:${stringifyPB(memberList)}`);

    expect(memberList.length).toBeGreaterThan(0);
  });

  test("get room member", async () => {
    const userName = client.selfContact!.getUsername();
    const member = await client.api.getChatRoomMember(roomId, userName);

    log.info(`get room: ${roomId}, member:${userName} result: ${stringifyPB(member)}`);

    expect(member.getUsername()).toEqual(userName);
  });

  test("get room qr", async () => {
    const res = await client.api.getChatRoomQrCode(roomId);
    expect(res.getQrcode()).toBeTruthy();

    const outFilePath: string = config.get("test.room.qrImageOutFilePath");
    fs.writeFileSync(outFilePath, res.getQrcode_asU8());

    log.info(`write chatroom qr to file: ${outFilePath}`);
  });

  test("set room name", async () => {
    const newRoomName = `testRoomName:${Date.now()}`;
    await client.api.setChatRoomName(roomId, newRoomName);

    const roomContact = await client.api.getContact(roomId);
    expect(roomContact.getNickname()).toEqual(newRoomName);
  });

  test("get room announcement", async () => {
    const announcement = await client.api.getChatRoomAnnouncement(roomId);
    log.info(`room announcement" ${announcement}`);
  });

  test("set room announcement", async () => {
    const announcement = `new announcement: ${Date.now()}`;
    await client.api.setChatRoomAnnouncement(roomId, announcement);
  });

  test("add room member", async () => {
    const roomId: string = config.get("test.room.addRoomMember.roomId");
    const memberUserName: string = config.get("test.room.addRoomMember.userName");

    const beforeMemberList = await client.api.getChatRoomMembers(roomId);

    const addType = await client.api.addChatRoomMember(roomId, memberUserName);
    expect(addType).toEqual(AddChatRoomMemberType.ADD);

    const afterMemberList = await client.api.getChatRoomMembers(roomId);

    expect(afterMemberList.length).toEqual(beforeMemberList.length + 1);
  });

  test("invite room member", async () => {
    const roomId: string = config.get("test.room.inviteRoomMember.roomId");
    const memberUserName: string = config.get("test.room.inviteRoomMember.userName");

    const addType = await client.api.addChatRoomMember(roomId, memberUserName);
    expect(addType).toEqual(AddChatRoomMemberType.INVITE);
  }, 600000);

  test("delete room member", async () => {
    const memberUserName: string = config.get("test.room.modifyMember");

    const beforeMemberList = await client.api.getChatRoomMembers(roomId);

    await client.api.deleteChatRoomMember(roomId, memberUserName);

    const afterMemberList = await client.api.getChatRoomMembers(roomId);

    expect(afterMemberList.length).toEqual(beforeMemberList.length - 1);
  });

  test("quit room", async () => {
    const roomId: string = config.get("test.room.quit.id");
    await client.api.quitChatRoom(roomId);
  });

  test("accept room invitation", async () => {
    const inviterId: string = config.get("test.room.invitation.inviterId");
    const invitationURL: string = config.get("test.room.invitation.inviterURL");

    await client.api.acceptChatRoomInvitation(inviterId, invitationURL);
  });
});

describe("label", () => {
  test("get label list", async () => {
    const labelList = await client.api.getLabelList();
    log.info(`get label list: ${stringifyPB(labelList)}`);
  });

  describe("add and remove label", () => {
    let newLabelId: number;

    test("add label", async () => {
      const beforeLabelList = await client.api.getLabelList();

      const newLabelName = `label:${Date.now()}`;
      newLabelId = await client.api.addLabel(newLabelName);

      const afterLabelList = await client.api.getLabelList();

      expect(beforeLabelList.length + 1).toEqual(afterLabelList.length);

      const newLabel = afterLabelList.find((l) => l.getId() === newLabelId);
      expect(newLabel).toBeTruthy();
      expect(newLabel!.getName()).toEqual(newLabelName);
    });

    test("remove label", async () => {
      const beforeLabelList = await client.api.getLabelList();

      await client.api.removeLabel(newLabelId);

      const afterLabelList = await client.api.getLabelList();

      expect(beforeLabelList.length - 1).toEqual(afterLabelList.length);

      const newLabel = afterLabelList.find((l) => l.getId() === newLabelId);
      expect(newLabel).toBeFalsy();
    });
  });

  test("set contact label", async () => {
    const labelList = await client.api.getLabelList();

    const userName: string = config.get("test.contact.userName");
    const oldContact = await client.api.getContact(userName);
    const oldLabelList = oldContact
      .getLabel()
      .split(",")
      .filter((s) => s)
      .map((s) => parseInt(s, 10));

    const targetLabel = labelList.find((l) => oldLabelList.indexOf(l.getId()) === -1);

    const contactLabelList = oldLabelList.concat([targetLabel!.getId()]);

    await client.api.setContactLabel(userName, contactLabelList);

    const newContact = await client.api.getContact(userName);
    const newLabelList = newContact
      .getLabel()
      .split(",")
      .filter((s) => s)
      .map((s) => parseInt(s, 10));

    expect(newLabelList.length).toEqual(oldLabelList.length + 1);
    expect(newLabelList).toContain(targetLabel!.getId());

    await client.api.setContactLabel(userName, []);
  });

  test("set contact remark", async () => {
    const userName: string = config.get("test.contact.update.userName");
    const remark: string = config.get("test.contact.update.remark");
    await client.api.updateContactRemark(userName, remark);
  });
});

describe("sns", () => {
  describe("sns get", () => {
    test("get timeline", async () => {
      const page0MomentList = await client.api.snsGetTimeline();
      log.info(`get page 0 moments: ${stringifyPB(page0MomentList)}`);

      if (page0MomentList.length === 0) {
        return;
      }

      const page1MaxId = page0MomentList[page0MomentList.length - 1].getId();
      const page1MomentList = await client.api.snsGetTimeline(page1MaxId);

      log.info(`get page 1 moments: ${stringifyPB(page1MomentList)}`);
    });

    test("get user page", async () => {
      const userName: string = config.get("test.sns.userName");

      const page0MomentList = await client.api.snsGetUserPage(userName);
      log.info(`get user page 0 moments: ${stringifyPB(page0MomentList)}`);

      if (page0MomentList.length === 0) {
        return;
      }

      const page1MaxId = page0MomentList[page0MomentList.length - 1].getId();
      const page1MomentList = await client.api.snsGetUserPage(userName, page1MaxId);
      log.info(`get user page 1 moments: ${stringifyPB(page1MomentList)}`);
    });

    test("get moment detail", async () => {
      const momentId: string = config.get("test.sns.momentId");
      const moment = await client.api.snsGetMoment(momentId);
      log.info(`get moment detail: ${stringifyPB(moment)}`);
    });
  });

  describe("sns send", () => {
    const snsImageFilePathList: string[] = config.get("test.sns.imageFilePathList");

    const uploadImages = async (imageFilePathList: string[], description?: string): Promise<pb.SnsImageUrl[]> => {
      const ret: pb.SnsImageUrl[] = [];

      for (let i = 0; i < imageFilePathList.length; ++i) {
        const imageData: Buffer = fs.readFileSync(imageFilePathList[i]);

        const des = i === 0 ? description : undefined;
        const imageUploadRes = await client.api.snsUploadImage(imageData, des);
        log.info(`upload image response: ${stringifyPB(imageUploadRes)}`);

        expect(imageUploadRes.getUrl()).toBeTruthy();

        ret.push(imageUploadRes.getUrl()!);
      }

      return ret;
    };

    test("send public text moment", async () => {
      const moment = await client.api.snsSendMoment(genIdempotentId(), new pb.SnsSendMomentText().setText("1"));
      log.info(`send text moment: ${stringifyPB(moment)}`);
    });

    test("send private text moment", async () => {
      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentText().setText("2"),
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );
      log.info(`send text moment: ${stringifyPB(moment)}`);
    });

    test("send text with can see user", async () => {
      const canSeeUserList: string[] = config.get("test.sns.canSeeUserList");
      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentText().setText("can"),
        new pb.SnsSendMomentOptions().setCanseeusernameList(canSeeUserList)
      );
      log.info(`send text moment: ${stringifyPB(moment)}`);
    });

    test("send text with can not see user", async () => {
      const canNotSeeUserList: string[] = config.get("test.sns.canNotSessUserList");
      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentText().setText("can not"),
        new pb.SnsSendMomentOptions().setCannotseeusernameList(canNotSeeUserList)
      );
      log.info(`send text moment: ${stringifyPB(moment)}`);
    });

    test("send text with at user list", async () => {
      const atUserList: string[] = config.get("test.sns.atUserList");
      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentText().setText("(｡ŏ_ŏ)"),
        new pb.SnsSendMomentOptions().setAtusernameList(atUserList)
      );
      log.info(`send text moment: ${stringifyPB(moment)}`);
    });

    test("send one image moment", async () => {
      const description = "single image";
      const imageUrlList: pb.SnsImageUrl[] = await uploadImages([snsImageFilePathList[0]], description);
      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentImages().setText(description).setImageurlList(imageUrlList),
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );
      log.info(`send text moment: ${stringifyPB(moment)}`);
    });

    test("send multiple images moment", async () => {
      const description = "multiple images";
      const imageUrlList: pb.SnsImageUrl[] = await uploadImages(snsImageFilePathList, description);
      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentImages().setText(description).setImageurlList(imageUrlList),
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );
      log.info(`send text moment: ${stringifyPB(moment)}`);
    }, 60000);

    test("send link", async () => {
      const description = "this is link";

      const imageUrlList: pb.SnsImageUrl[] = await uploadImages([snsImageFilePathList[0]], description);

      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentUrl()
          .setText(description)
          .setUrl("https://www.baidu.com")
          .setUrltitle("kangkang baidu")
          .setImageurl(imageUrlList[0]),
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );

      log.info(`send link moment: ${stringifyPB(moment)}`);
    });

    test("forward text moment", async () => {
      const contentXml: string = config.get("test.sns.forward.textMoment");

      const moment = await client.api.snsForwardMoment(
        genIdempotentId(),
        contentXml,
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );

      log.info(`forward text moment: ${stringifyPB(moment)}`);
    });

    test("forward image moment", async () => {
      const contentXml: string = config.get("test.sns.forward.imageMoment");

      const moment = await client.api.snsForwardMoment(
        genIdempotentId(),
        contentXml,
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );

      log.info(`forward image moment: ${stringifyPB(moment)}`);
    });

    test("forward link moment", async () => {
      const contentXml: string = config.get("test.sns.forward.linkMoment");

      const moment = await client.api.snsForwardMoment(
        genIdempotentId(),
        contentXml,
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );

      log.info(`forward link moment: ${stringifyPB(moment)}`);
    });

    test("forward moment with poi", async () => {
      const contentXml: string = config.get("test.sns.forward.poiMoment");

      const canSeeUserList: string[] = config.get("test.sns.canSeeUserList");

      const moment = await client.api.snsForwardMoment(
        genIdempotentId(),
        contentXml,
        new pb.SnsSendMomentOptions().setCanseeusernameList(canSeeUserList)
      );

      log.info(`forward moment with poi: ${stringifyPB(moment)}`);
    });
  });

  describe("sns comment", () => {
    const momentId: string = config.get("test.sns.comment.momentId");
    const momentOwnerUserName: string = config.get("test.sns.comment.momentOwnerUserName");

    test("send comment", async () => {
      const moment = await client.api.snsSendComment(
        genIdempotentId(),
        momentId,
        momentOwnerUserName,
        `comment-${Date.now()}`
      );
      log.info(`send comment response: ${stringifyPB(moment)}`);
    });

    test("send comment reply", async () => {
      const replyCommentId: string = config.get("test.sns.comment.reply.commentId");
      const replyCommentUsername: string = config.get("test.sns.comment.reply.commentUserName");
      const replyCommentNickName: string = config.get("test.sns.comment.reply.commentNickname");

      const moment = await client.api.snsSendComment(
        genIdempotentId(),
        momentId,
        momentOwnerUserName,
        `reply-${Date.now()}`,
        new pb.SnsSendCommentReplyTo()
          .setCommentid(replyCommentId)
          .setCommentnickname(replyCommentNickName)
          .setCommentusername(replyCommentUsername)
      );
      log.info(`send comment reply response: ${stringifyPB(moment)}`);
    });

    test("like", async () => {
      const moment = await client.api.snsLikeMoment(momentId, momentOwnerUserName);
      log.info(`like moment: ${stringifyPB(moment)}`);
    });

    test("unlike", async () => {
      await client.api.snsUnlikeMoment(momentId);
    });

    test("remove moment comment", async () => {
      await client.api.snsRemoveMomentComment(
        config.get("test.sns.removeMomentComment.momentId"),
        config.get("test.sns.removeMomentComment.commentId")
      );
    });
  });

  describe("operations", () => {
    test("make public", async () => {
      const momentId: string = config.get("test.sns.makePublicPrivateCommentId");
      await client.api.snsMakeMomentPublic(momentId);
    });

    test("make private", async () => {
      const momentId: string = config.get("test.sns.makePublicPrivateCommentId");
      await client.api.snsMakeMomentPrivate(momentId);
    });

    test("remove moment", async () => {
      const momentId: string = config.get("test.sns.removeMomentId");
      await client.api.snsRemoveMoment(momentId);
    });
  });
});
