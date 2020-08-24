import { prepareSignedOnClient } from "./TestUtils";
import { PadLocalClient } from "../src/PadLocalClient";
import { genIdempotentId, stringifyPB } from "../src/utils/Utils";
import config from "config";
import * as fs from "fs";
import * as pb from "../src/proto/padlocal_pb";
import { hexStringToBytes } from "../src/utils/ByteUtils";

let client: PadLocalClient;

beforeAll(async () => {
  client = await prepareSignedOnClient();
});

afterAll(() => {
  client.shutdown();
});

test("sync", async () => {
  const syncEvent = await client.api.sync();
  console.log(`sync result: ${stringifyPB(syncEvent)}`);

  expect(syncEvent).not.toBeNull();
});

describe("message", () => {
  describe("send", () => {
    const toUserName: string = config.get("test.message.send.toUserName");
    const toChatRoom: string = config.get("test.message.send.toChatRoom");
    const atUserList: string[] = config.get("test.message.send.atUserNameList");
    const sendImageFilePath: string = config.get("test.message.send.imageFilePath");
    const mpThumbFilePath: string = config.get("test.message.send.miniProgramThumbFilePath");

    test("send to user", async () => {
      const msgId = await client.api.sendTextMessage(
        genIdempotentId(),
        toUserName,
        `text message: ${new Date().toString()}`
      );
      console.log(`send text message to ${toUserName}, return msgId: ${msgId}`);

      expect(msgId).toBeTruthy();
    });

    test("send to chatroom", async () => {
      const msgId = await client.api.sendTextMessage(
        genIdempotentId(),
        toChatRoom,
        `text message: ${new Date().toString()}`
      );
      console.log(`send text message to ${toChatRoom}, return msgId: ${msgId}`);

      expect(msgId).toBeTruthy();
    });

    test("send to chatroom with single at list", async () => {
      const msgId = await client.api.sendTextMessage(
        genIdempotentId(),
        toChatRoom,
        `text message: ${new Date().toString()}`,
        atUserList.slice(0, 1)
      );
      console.log(`send text message to ${toChatRoom}, return msgId: ${msgId}`);

      expect(msgId).toBeTruthy();
    });

    test("send to chatroom with multiple at list", async () => {
      const msgId = await client.api.sendTextMessage(
        genIdempotentId(),
        toChatRoom,
        `text message: ${new Date().toString()}`,
        atUserList
      );
      console.log(`send text message to ${toChatRoom}, return msgId: ${msgId}`);

      expect(msgId).toBeTruthy();
    });

    test("send image message", async () => {
      const imageData: Buffer = fs.readFileSync(sendImageFilePath);

      const msgId = await client.api.sendImageMessage(genIdempotentId(), toUserName, imageData);

      console.log(`send image message to ${toUserName}, return msgId: ${msgId}`);

      expect(msgId).toBeTruthy();
    });

    test("send link msg", async () => {
      const msgId = await client.api.sendAppMessageLink(
        genIdempotentId(),
        toChatRoom,
        new pb.AppMessageLink()
          .setTitle("PadLocal")
          .setDescription("Chatbot solution")
          .setUrl("https://github.com/padlocal")
          .setThumburl(
            "https://avatars0.githubusercontent.com/u/64943823?s=460&u=cf5d8d7c1927983e7d14d318f452628a9f926b2c&v=4"
          )
      );

      console.log(`send link message to ${toUserName}, return msgId: ${msgId}`);

      expect(msgId).toBeTruthy();
    });

    test("send miniprogram msg", async () => {
      const thumbImageData: Buffer = fs.readFileSync(mpThumbFilePath);

      const msgId = await client.api.sendAppMessageMiniProgram(
        genIdempotentId(),
        toUserName,
        new pb.AppMessageMiniProgram()
          .setTitle("Chatbot solution")
          .setDescription("will not show")
          .setUrl(
            "https://mp.weixin.qq.com/mp/waerrpage?appid=wx123456&amp;type=upgrade&amp;upgradetype=3#wechat_redirect"
          )
          .setMpappusername("gh_123456")
          .setMpappname("PadLocal")
          .setMpappid("wx123456")
          .setMpappiconurl(
            "https://avatars0.githubusercontent.com/u/64943823?s=460&u=cf5d8d7c1927983e7d14d318f452628a9f926b2c&v=4"
          )
          .setMpapppath("pages/home/index.html?utm_medium=userid_123456")
          .setThumbimage(thumbImageData)
      );

      console.log(`send miniprogram message to ${toUserName}, return msg id: ${msgId}`);

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

      console.log(`forward miniprogram message to ${toChatRoom}, return msg id: ${msgId}`);

      expect(msgId).toBeTruthy();
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
      console.log(`write image to ${normalFilePath}`);

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
      console.log(`write image to ${normalFilePath}`);

      const hdImageResult = await client.api.getMessageImage(
        message.getContent(),
        message.getTousername(),
        pb.ImageType.HD
      );
      expect(hdImageResult.imageType === pb.ImageType.HD);
      expect(hdImageResult.imageData.length).toBeTruthy();

      const hdFilePath = `${payloadDir}/${message.getId()}-${hdImageResult.imageType}.jpg`;
      fs.writeFileSync(hdFilePath, hdImageResult.imageData);
      console.log(`write image to ${hdFilePath}`);
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
      console.log(`write voice to ${filePath}`);
    });

    test("get message videoThumb", async () => {
      const message = pb.Message.deserializeBinary(hexStringToBytes(config.get("test.message.payload.videoMessage")));

      const videoThumbData = await client.api.getMessageVideoThumb(message.getContent(), message.getTousername());
      expect(videoThumbData).toBeTruthy();

      const filePath = `${payloadDir}/${message.getId()}-video-thumb.jpg`;
      fs.writeFileSync(filePath, videoThumbData);
      console.log(`write video thumb to ${filePath}`);
    });

    test("get message video", async () => {
      const message = pb.Message.deserializeBinary(hexStringToBytes(config.get("test.message.payload.videoMessage")));

      const videoData = await client.api.getMessageVideo(message.getContent(), message.getTousername());
      expect(videoData).toBeTruthy();

      const filePath = `${payloadDir}/${message.getId()}-video.mp4`;
      fs.writeFileSync(filePath, videoData);
      console.log(`write video to ${filePath}`);
    });

    test("get message attach", async () => {
      const message = pb.Message.deserializeBinary(hexStringToBytes(config.get("test.message.payload.fileMessage")));

      const fileData = await client.api.getMessageAttach(message.getContent(), message.getTousername());
      expect(fileData).toBeTruthy();

      const filePath = `${payloadDir}/${message.getId()}-file`;
      fs.writeFileSync(filePath, fileData);
      console.log(`write file to ${filePath}`);
    });

    test("get message attach thumb", async () => {
      const message = pb.Message.deserializeBinary(hexStringToBytes(config.get("test.message.payload.linkMessage")));
      const thumbData = await client.api.getMessageAttachThumb(message.getContent(), message.getTousername());
      expect(thumbData).toBeTruthy();

      const filePath = `${payloadDir}/${message.getId()}-thumb`;
      fs.writeFileSync(filePath, thumbData);
      console.log(`write file to ${filePath}`);
    });
  });
});

describe("contact", () => {
  test("accept user", async () => {
    const stranger: string = config.get("test.contact.accept.stranger");
    const ticket: string = config.get("test.contact.accept.ticket");
    await client.api.acceptUser(stranger, ticket);

    console.log("accept success");
  });

  test("delete contact", async () => {
    const userName: string = config.get("test.contact.userName");
    await client.api.deleteContact(userName);

    console.log("delete contact success");
  });

  test("add contact", async () => {
    const userName: string = config.get("test.contact.search");
    const searchRes = await client.api.searchContact(userName);

    console.log(`search contact: ${stringifyPB(searchRes)}`);

    expect(searchRes.getContact()).toBeTruthy();
    expect(searchRes.getAntispamticket()).toBeTruthy();
    expect(searchRes.getEncryptusername()).toBeTruthy();

    await client.api.addContact(
      searchRes.getContact()!.getUsername(),
      searchRes.getAntispamticket(),
      pb.AddContactScene.WECHAT_ID,
      "hello i'm padlocal"
    );

    console.log("add contact success");
  });

  test("search contact", async () => {
    const userName: string = config.get("test.contact.search");
    const searchRes = await client.api.searchContact(userName);

    console.log(`search contact: ${stringifyPB(searchRes)}`);
  });

  test("get contact", async () => {
    const userName: string = config.get("test.contact.userName");
    const contact = await client.api.getContact(userName);

    console.log(`get contact: ${stringifyPB(contact)}`);

    expect(contact).not.toBeFalsy();
    expect(contact.getUsername()).not.toBeFalsy();
  });

  test("get self contact qr image", async () => {
    const response = await client.api.getContactQRCode(client.selfContact!.getUsername(), 2);

    expect(response).toBeTruthy();
    expect(response.getQrcode()).toBeTruthy();

    const outFilePath: string = config.get("test.contact.qrImageOutFilePath");
    fs.writeFileSync(outFilePath, response.getQrcode_asU8());
    console.log(`write qr image to: ${outFilePath}`);
  });

  test("upate self nickname", async () => {
    await client.api.updateSelfNickName("TestNickName");
  });
});

describe("chatroom", () => {
  const roomId: string = config.get("test.room.id");

  test("create room", async () => {
    const memberUseNameList: string[] = config.get("test.room.create.memberUserNameList");

    const res = await client.api.createChatRoom(genIdempotentId(), memberUseNameList);

    console.log(`create room success: ${stringifyPB(res)}`);

    expect(res).toBeTruthy();
    expect(res.getRoomid()).toBeTruthy();
  });

  test("get room member list", async () => {
    const memberList = await client.api.getChatRoomMembers(roomId);

    console.log(`get room: ${roomId}, memberList:${stringifyPB(memberList)}`);

    expect(memberList.length).toBeGreaterThan(0);
  });

  test("get room member", async () => {
    const userName = client.selfContact!.getUsername();
    const member = await client.api.getChatRoomMember(roomId, userName);

    console.log(`get room: ${roomId}, member:${userName} result: ${stringifyPB(member)}`);

    expect(member.getUsername()).toEqual(userName);
  });

  test("get room qr", async () => {
    const res = await client.api.getChatRoomQrCode(roomId);
    expect(res.getQrcode()).toBeTruthy();

    const outFilePath: string = config.get("test.room.qrImageOutFilePath");
    fs.writeFileSync(outFilePath, res.getQrcode_asU8());

    console.log(`write chatroom qr to file: ${outFilePath}`);
  });

  test("set room name", async () => {
    const newRoomName = `testRoomName:${Date.now()}`;
    await client.api.setChatRoomName(roomId, newRoomName);

    const roomContact = await client.api.getContact(roomId);
    expect(roomContact.getNickname()).toEqual(newRoomName);
  });

  test("set room announcement", async () => {
    const announcement = `new announcement: ${Date.now()}`;
    await client.api.setChatRoomAnnouncement(roomId, announcement);
  });

  test("add room member", async () => {
    const memberUserName: string = config.get("test.room.modifyMember");

    const beforeMemberList = await client.api.getChatRoomMembers(roomId);

    await client.api.addChatRoomMember(roomId, memberUserName);

    const afterMemberList = await client.api.getChatRoomMembers(roomId);

    expect(afterMemberList.length).toEqual(beforeMemberList.length + 1);
  });

  test("delete room member", async () => {
    const memberUserName: string = config.get("test.room.modifyMember");

    const beforeMemberList = await client.api.getChatRoomMembers(roomId);

    await client.api.deleteChatRoomMember(roomId, memberUserName);

    const afterMemberList = await client.api.getChatRoomMembers(roomId);

    expect(afterMemberList.length).toEqual(beforeMemberList.length - 1);
  });

  test("invite room member", async () => {
    const memberUserName: string = config.get("test.room.modifyMember");

    await client.api.inviteChatRoomMember(roomId, memberUserName);
  });
});

describe("label", () => {
  test("get label list", async () => {
    const labelList = await client.api.getLabelList();
    console.log(`get label list: ${stringifyPB(labelList)}`);
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
});

describe("sns", () => {
  describe("sns get", () => {
    test("get timeline", async () => {
      const page0MomentList = await client.api.snsGetTimeline();
      console.log(`get page 0 moments: ${stringifyPB(page0MomentList)}`);

      if (page0MomentList.length === 0) {
        return;
      }

      const page1MaxId = page0MomentList[page0MomentList.length - 1].getId();
      const page1MomentList = await client.api.snsGetTimeline(page1MaxId);

      console.log(`get page 1 moments: ${stringifyPB(page1MomentList)}`);
    });

    test("get user page", async () => {
      const userName: string = config.get("test.sns.userName");

      const page0MomentList = await client.api.snsGetUserPage(userName);
      console.log(`get user page 0 moments: ${stringifyPB(page0MomentList)}`);

      if (page0MomentList.length === 0) {
        return;
      }

      const page1MaxId = page0MomentList[page0MomentList.length - 1].getId();
      const page1MomentList = await client.api.snsGetUserPage(userName, page1MaxId);
      console.log(`get user page 1 moments: ${stringifyPB(page1MomentList)}`);
    });

    test("get moment detail", async () => {
      const momentId: string = config.get("test.sns.momentId");
      const moment = await client.api.snsGetMoment(momentId);
      console.log(`get moment detail: ${stringifyPB(moment)}`);
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
        console.log(`upload image response: ${stringifyPB(imageUploadRes)}`);

        expect(imageUploadRes.getUrl()).toBeTruthy();

        ret.push(imageUploadRes.getUrl()!);
      }

      return ret;
    };

    test("send public text moment", async () => {
      const moment = await client.api.snsSendMoment(genIdempotentId(), new pb.SnsSendMomentText().setText("1"));
      console.log(`send text moment: ${stringifyPB(moment)}`);
    });

    test("send private text moment", async () => {
      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentText().setText("2"),
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );
      console.log(`send text moment: ${stringifyPB(moment)}`);
    });

    test("send text with can see user", async () => {
      const canSeeUserList: string[] = config.get("test.sns.canSeeUserList");
      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentText().setText("can"),
        new pb.SnsSendMomentOptions().setCanseeusernameList(canSeeUserList)
      );
      console.log(`send text moment: ${stringifyPB(moment)}`);
    });

    test("send text with can not see user", async () => {
      const canNotSeeUserList: string[] = config.get("test.sns.canNotSessUserList");
      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentText().setText("can not"),
        new pb.SnsSendMomentOptions().setCannotseeusernameList(canNotSeeUserList)
      );
      console.log(`send text moment: ${stringifyPB(moment)}`);
    });

    test("send text with at user list", async () => {
      const atUserList: string[] = config.get("test.sns.atUserList");
      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentText().setText("(｡ŏ_ŏ)"),
        new pb.SnsSendMomentOptions().setAtusernameList(atUserList)
      );
      console.log(`send text moment: ${stringifyPB(moment)}`);
    });

    test("send one image moment", async () => {
      const description = "single image";
      const imageUrlList: pb.SnsImageUrl[] = await uploadImages([snsImageFilePathList[0]], description);
      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentImages().setText(description).setImageurlList(imageUrlList),
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );
      console.log(`send text moment: ${stringifyPB(moment)}`);
    });

    test("send multiple images moment", async () => {
      const description = "multiple images";
      const imageUrlList: pb.SnsImageUrl[] = await uploadImages(snsImageFilePathList, description);
      const moment = await client.api.snsSendMoment(
        genIdempotentId(),
        new pb.SnsSendMomentImages().setText(description).setImageurlList(imageUrlList),
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );
      console.log(`send text moment: ${stringifyPB(moment)}`);
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

      console.log(`send link moment: ${stringifyPB(moment)}`);
    });

    test("forward text moment", async () => {
      const contentXml: string = config.get("test.sns.forward.textMoment");

      const moment = await client.api.snsForwardMoment(
        genIdempotentId(),
        contentXml,
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );

      console.log(`forward text moment: ${stringifyPB(moment)}`);
    });

    test("forward image moment", async () => {
      const contentXml: string = config.get("test.sns.forward.imageMoment");

      const moment = await client.api.snsForwardMoment(
        genIdempotentId(),
        contentXml,
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );

      console.log(`forward image moment: ${stringifyPB(moment)}`);
    });

    test("forward link moment", async () => {
      const contentXml: string = config.get("test.sns.forward.linkMoment");

      const moment = await client.api.snsForwardMoment(
        genIdempotentId(),
        contentXml,
        new pb.SnsSendMomentOptions().setIsprivate(true)
      );

      console.log(`forward link moment: ${stringifyPB(moment)}`);
    });

    test("forward moment with poi", async () => {
      const contentXml: string = config.get("test.sns.forward.poiMoment");

      const canSeeUserList: string[] = config.get("test.sns.canSeeUserList");

      const moment = await client.api.snsForwardMoment(
        genIdempotentId(),
        contentXml,
        new pb.SnsSendMomentOptions().setCanseeusernameList(canSeeUserList)
      );

      console.log(`forward moment with poi: ${stringifyPB(moment)}`);
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
      console.log(`send comment response: ${stringifyPB(moment)}`);
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
      console.log(`send comment reply response: ${stringifyPB(moment)}`);
    });

    test("like", async () => {
      const moment = await client.api.snsLikeMoment(momentId, momentOwnerUserName);
      console.log(`like moment: ${stringifyPB(moment)}`);
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
