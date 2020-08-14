import { TestUtils } from "./TestUtils";
import { PadLocalClient } from "../src/PadLocalClient";
import { Utils } from "../src/utils/Utils";
import config from "config";
import * as fs from "fs";
import {
  AddContactScene,
  AppMessageLink,
  AppMessageMiniProgram,
  Message,
  SnsForwardMomentRequest,
  SnsImageUrl,
  SnsSendCommentReplyTo,
  SnsSendMomentImages,
  SnsSendMomentOptions,
  SnsSendMomentText,
  SnsSendMomentUrl,
} from "../src/proto/padlocal_pb";
import { ByteUtils } from "../src/utils/ByteUtils";

let client: PadLocalClient;

const toUserName: string = config.get("test.send.toUserName");
const toChatRoom: string = config.get("test.send.toChatRoom");
const atUserList: Array<string> = config.get("test.send.atUserNameList");
const sendImageFilePath: string = config.get("test.send.imageFilePath");
const mpThumbFilePath: string = config.get("test.send.miniProgramThumbFilePath");

beforeAll(async () => {
  client = await TestUtils.prepareSignedOnClient();
});

afterAll(() => {
  client.shutdown();
});

test("sync", async () => {
  const syncEvent = await client.api.sync();
  console.log(`sync result: ${Utils.stringifyPB(syncEvent)}`);

  expect(syncEvent).not.toBeNull();
});

describe("send", () => {
  test("send to user", async () => {
    const msgId = await client.api.sendTextMessage(
      Utils.genIdempotentId(),
      toUserName,
      `text message: ${new Date().toString()}`
    );
    console.log(`send text message to ${toUserName}, return msgId: ${msgId}`);

    expect(msgId).toBeTruthy();
  });

  test("send to chatroom", async () => {
    const msgId = await client.api.sendTextMessage(
      Utils.genIdempotentId(),
      toChatRoom,
      `text message: ${new Date().toString()}`
    );
    console.log(`send text message to ${toChatRoom}, return msgId: ${msgId}`);

    expect(msgId).toBeTruthy();
  });

  test("send to chatroom with single at list", async () => {
    const msgId = await client.api.sendTextMessage(
      Utils.genIdempotentId(),
      toChatRoom,
      `text message: ${new Date().toString()}`,
      atUserList.slice(0, 1)
    );
    console.log(`send text message to ${toChatRoom}, return msgId: ${msgId}`);

    expect(msgId).toBeTruthy();
  });

  test("send to chatroom with multiple at list", async () => {
    const msgId = await client.api.sendTextMessage(
      Utils.genIdempotentId(),
      toChatRoom,
      `text message: ${new Date().toString()}`,
      atUserList
    );
    console.log(`send text message to ${toChatRoom}, return msgId: ${msgId}`);

    expect(msgId).toBeTruthy();
  });

  test("send image message", async () => {
    const imageData: Buffer = fs.readFileSync(sendImageFilePath);

    const msgId = await client.api.sendImageMessage(Utils.genIdempotentId(), toUserName, imageData);

    console.log(`send image message to ${toUserName}, return msgId: ${msgId}`);

    expect(msgId).toBeTruthy();
  });

  test("send link msg", async () => {
    const msgId = await client.api.sendAppMessageLink(
      Utils.genIdempotentId(),
      toChatRoom,
      new AppMessageLink()
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
      Utils.genIdempotentId(),
      toUserName,
      new AppMessageMiniProgram()
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
    const originalMessage = Message.deserializeBinary(
      ByteUtils.hexStringToBytes(
        "0a1335303433303336313636333734303137323130103118e1b9cef90522067661676173652a0676616761736532bb133c3f786d6c2076657273696f6e3d22312e30223f3e0a3c6d73673e0a093c6170706d73672061707069643d22222073646b7665723d2230223e0a09093c7469746c653ee4bb8ae697a5e8b685e580bce789b9e683a0e6b885e58d95efbc8ce5a4a7e689b9e5a5bde789a9e4bd8ee887b331e58583efbc813c2f7469746c653e0a09093c6465733ee4bebfe588a9e89c823c2f6465733e0a09093c616374696f6e202f3e0a09093c747970653e33333c2f747970653e0a09093c73686f77747970653e303c2f73686f77747970653e0a09093c736f756e64747970653e303c2f736f756e64747970653e0a09093c6d656469617461676e616d65202f3e0a09093c6d657373616765657874202f3e0a09093c6d657373616765616374696f6e202f3e0a09093c636f6e74656e74202f3e0a09093c636f6e74656e74617474723e303c2f636f6e74656e74617474723e0a09093c75726c3e68747470733a2f2f6d702e77656978696e2e71712e636f6d2f6d702f7761657272706167653f61707069643d77786332376436663237616665383564363126616d703b747970653d7570677261646526616d703b75706772616465747970653d33237765636861745f72656469726563743c2f75726c3e0a09093c6c6f7775726c202f3e0a09093c6461746175726c202f3e0a09093c6c6f776461746175726c202f3e0a09093c736f6e67616c62756d75726c202f3e0a09093c736f6e676c79726963202f3e0a09093c6170706174746163683e0a0909093c746f74616c6c656e3e303c2f746f74616c6c656e3e0a0909093c6174746163686964202f3e0a0909093c656d6f7469636f6e6d6435202f3e0a0909093c66696c65657874202f3e0a0909093c63646e7468756d6275726c3e3330343930323031303030343432333034303032303130303032303330313932646430323033326635366333303230343234353730643730303230343566333339633865303431633737373837353730366336663631363435663736363136373631373336353331333835663331333533393337333233313337333933333334303230343031303430303033303230313030303430303c2f63646e7468756d6275726c3e0a0909093c63646e7468756d626d64353e38393830306236346264666231656162613630623139663137656563353663373c2f63646e7468756d626d64353e0a0909093c63646e7468756d626c656e6774683e34313533323c2f63646e7468756d626c656e6774683e0a0909093c63646e7468756d6277696474683e3431393c2f63646e7468756d6277696474683e0a0909093c63646e7468756d626865696768743e3333363c2f63646e7468756d626865696768743e0a0909093c63646e7468756d626165736b65793e34366662336231646237383130383263636638356539376430393339653331333c2f63646e7468756d626165736b65793e0a0909093c6165736b65793e34366662336231646237383130383263636638356539376430393339653331333c2f6165736b65793e0a0909093c656e6372797665723e303c2f656e6372797665723e0a0909093c66696c656b65793e76616761736531395f313539373231383031363c2f66696c656b65793e0a09093c2f6170706174746163683e0a09093c657874696e666f202f3e0a09093c736f75726365757365726e616d653e67685f626134646165663165643465406170703c2f736f75726365757365726e616d653e0a09093c736f75726365646973706c61796e616d653ee4bebfe588a9e89c823c2f736f75726365646973706c61796e616d653e0a09093c7468756d6275726c202f3e0a09093c6d6435202f3e0a09093c73746174657874737472202f3e0a09093c64697265637473686172653e303c2f64697265637473686172653e0a09093c7765617070696e666f3e0a0909093c757365726e616d653e3c215b43444154415b67685f626134646165663165643465406170705d5d3e3c2f757365726e616d653e0a0909093c61707069643e3c215b43444154415b7778633237643666323761666538356436315d5d3e3c2f61707069643e0a0909093c747970653e323c2f747970653e0a0909093c76657273696f6e3e3537393c2f76657273696f6e3e0a0909093c776561707069636f6e75726c3e3c215b43444154415b687474703a2f2f6d6d62697a2e717069632e636e2f6d6d62697a5f706e672f4969626272304762474d436d7543696377706b3478455442583776636b62366b504c584e32306f5237796a45766e645445393434544b7741416961324164305a5a354651387a79437166357669616369633532744b4a65704b61772f3634303f77785f666d743d706e6726777866726f6d3d3230305d5d3e3c2f776561707069636f6e75726c3e0a0909093c70616765706174683e3c215b43444154415b70616765732f6d61696e2f696e6465782e68746d6c3f703d2532467061676573253246746f6461795370656369616c253246696e64657825334673686f70436f646525334431303130303032333025323673686f70496454797065253344756e646566696e656425323673686f704e616d65253344254539254142253938254535253932253843254534254241253931254535254233254230254535254134254137254535253845254136254535254241253937253236736f757263652533447368617265636172642673616d7073686172653d253742253232692532322533412532323330313330313432373833303832253232253243253232702532322533412532327061676573253246746f6461795370656369616c253246696e64657825323225324325323264253232253341312537445d5d3e3c2f70616765706174683e0a0909093c736861726549643e3c215b43444154415b305f7778633237643666323761666538356436315f34613439303436353534313066353061383766373232313962333930376664395f313539373231383031335f305d5d3e3c2f736861726549643e0a0909093c61707073657276696365747970653e303c2f61707073657276696365747970653e0a0909093c74726164696e6767756172616e746565666c61673e303c2f74726164696e6767756172616e746565666c61673e0a0909093c737562547970653e303c2f737562547970653e0a09093c2f7765617070696e666f3e0a093c2f6170706d73673e0a093c66726f6d757365726e616d653e7661676173653c2f66726f6d757365726e616d653e0a093c7363656e653e303c2f7363656e653e0a093c617070696e666f3e0a09093c76657273696f6e3e313c2f76657273696f6e3e0a09093c6170706e616d653e3c2f6170706e616d653e0a093c2f617070696e666f3e0a093c636f6d6d656e7475726c3e3c2f636f6d6d656e7475726c3e0a3c2f6d73673e0a"
      )
    );

    const msgId = await client.api.forwardMessage(Utils.genIdempotentId(), toChatRoom, originalMessage);

    console.log(`forward miniprogram message to ${toChatRoom}, return msg id: ${msgId}`);

    expect(msgId).toBeTruthy();
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

    console.log(`search contact: ${Utils.stringifyPB(searchRes)}`);

    expect(searchRes.getContact()).not.toBeFalsy();
    expect(searchRes.getAntispamticket()).not.toBeFalsy();

    await client.api.addContact(
      searchRes.getContact()!.getUsername(),
      searchRes.getAntispamticket(),
      AddContactScene.WECHAT_ID,
      "hello i'm padlocal"
    );

    console.log("add contact success");
  });

  test("search contact", async () => {
    const userName: string = config.get("test.contact.search");
    const searchRes = await client.api.searchContact(userName);

    console.log(`search contact: ${Utils.stringifyPB(searchRes)}`);
  });

  test("get contact", async () => {
    const userName: string = config.get("test.contact.userName");
    const contact = await client.api.getContact(userName);

    console.log(`get contact: ${Utils.stringifyPB(contact)}`);

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
});

describe("chatroom", () => {
  const roomId: string = config.get("test.room.id");

  test("create room", async () => {
    const memberUseNameList: Array<string> = config.get("test.room.create.memberUserNameList");

    const res = await client.api.createChatRoom(Utils.genIdempotentId(), memberUseNameList);

    console.log(`create room success: ${Utils.stringifyPB(res)}`);

    expect(res).toBeTruthy();
    expect(res.getRoomid()).toBeTruthy();
  });

  test("get room member list", async () => {
    const memberList = await client.api.getChatRoomMembers(roomId);

    console.log(`get room: ${roomId}, memberList:${Utils.stringifyPB(memberList)}`);

    expect(memberList.length).toBeGreaterThan(0);
  });

  test("get room member", async () => {
    const userName = client.selfContact!.getUsername();
    const member = await client.api.getChatRoomMember(roomId, userName);

    console.log(`get room: ${roomId}, member:${userName} result: ${Utils.stringifyPB(member)}`);

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
    console.log(`get label list: ${Utils.stringifyPB(labelList)}`);
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
      .map((s) => parseInt(s));

    const targetLabel = labelList.find((l) => oldLabelList.indexOf(l.getId()) === -1);

    const contactLabelList = oldLabelList.concat([targetLabel!.getId()]);

    await client.api.setContactLabel(userName, contactLabelList);

    const newContact = await client.api.getContact(userName);
    const newLabelList = newContact
      .getLabel()
      .split(",")
      .filter((s) => s)
      .map((s) => parseInt(s));

    expect(newLabelList.length).toEqual(oldLabelList.length + 1);
    expect(newLabelList).toContain(targetLabel!.getId());

    await client.api.setContactLabel(userName, []);
  });
});

describe("sns", () => {
  describe("sns get", () => {
    test("get timeline", async () => {
      const page0MomentList = await client.api.snsGetTimeline();
      console.log(`get page 0 moments: ${Utils.stringifyPB(page0MomentList)}`);

      if (page0MomentList.length == 0) {
        return;
      }

      const page1MaxId = page0MomentList[page0MomentList.length - 1].getId();
      const page1MomentList = await client.api.snsGetTimeline(page1MaxId);

      console.log(`get page 1 moments: ${Utils.stringifyPB(page1MomentList)}`);
    });

    test("get user page", async () => {
      const userName: string = config.get("test.sns.userName");

      const page0MomentList = await client.api.snsGetUserPage(userName);
      console.log(`get user page 0 moments: ${Utils.stringifyPB(page0MomentList)}`);

      if (page0MomentList.length == 0) {
        return;
      }

      const page1MaxId = page0MomentList[page0MomentList.length - 1].getId();
      const page1MomentList = await client.api.snsGetUserPage(userName, page1MaxId);
      console.log(`get user page 1 moments: ${Utils.stringifyPB(page1MomentList)}`);
    });

    test("get moment detail", async () => {
      const momentId: string = config.get("test.sns.momentId");
      const moment = await client.api.snsGetMoment(momentId);
      console.log(`get moment detail: ${Utils.stringifyPB(moment)}`);
    });
  });

  describe("sns send", () => {
    const snsImageFilePathList: Array<string> = config.get("test.sns.imageFilePathList");

    const uploadImages = async (
      imageFilePathList: Array<string>,
      description?: string
    ): Promise<Array<SnsImageUrl>> => {
      const ret: Array<SnsImageUrl> = [];

      for (let i = 0; i < imageFilePathList.length; ++i) {
        const imageData: Buffer = fs.readFileSync(imageFilePathList[i]);

        let des = i === 0 ? description : undefined;
        const imageUploadRes = await client.api.snsUploadImage(imageData, des);
        console.log(`upload image response: ${Utils.stringifyPB(imageUploadRes)}`);

        expect(imageUploadRes.getUrl()).toBeTruthy();

        ret.push(imageUploadRes.getUrl()!);
      }

      return ret;
    };

    test("send public text moment", async () => {
      const moment = await client.api.snsSendMoment(Utils.genIdempotentId(), new SnsSendMomentText().setText("1"));
      console.log(`send text moment: ${Utils.stringifyPB(moment)}`);
    });

    test("send private text moment", async () => {
      const moment = await client.api.snsSendMoment(
        Utils.genIdempotentId(),
        new SnsSendMomentText().setText("2"),
        new SnsSendMomentOptions().setIsprivate(true)
      );
      console.log(`send text moment: ${Utils.stringifyPB(moment)}`);
    });

    test("send text with can see user", async () => {
      const canSeeUserList: Array<string> = config.get("test.sns.canSeeUserList");
      const moment = await client.api.snsSendMoment(
        Utils.genIdempotentId(),
        new SnsSendMomentText().setText("can"),
        new SnsSendMomentOptions().setCanseeusernameList(canSeeUserList)
      );
      console.log(`send text moment: ${Utils.stringifyPB(moment)}`);
    });

    test("send text with can not see user", async () => {
      const canNotSeeUserList: Array<string> = config.get("test.sns.canNotSessUserList");
      const moment = await client.api.snsSendMoment(
        Utils.genIdempotentId(),
        new SnsSendMomentText().setText("can not"),
        new SnsSendMomentOptions().setCannotseeusernameList(canNotSeeUserList)
      );
      console.log(`send text moment: ${Utils.stringifyPB(moment)}`);
    });

    test("send text with at user list", async () => {
      const atUserList: Array<string> = config.get("test.sns.atUserList");
      const moment = await client.api.snsSendMoment(
        Utils.genIdempotentId(),
        new SnsSendMomentText().setText("(｡ŏ_ŏ)"),
        new SnsSendMomentOptions().setAtusernameList(atUserList)
      );
      console.log(`send text moment: ${Utils.stringifyPB(moment)}`);
    });

    test("send one image moment", async () => {
      const description = "single image";
      const imageUrlList: Array<SnsImageUrl> = await uploadImages([snsImageFilePathList[0]], description);
      const moment = await client.api.snsSendMoment(
        Utils.genIdempotentId(),
        new SnsSendMomentImages().setText(description).setImageurlList(imageUrlList),
        new SnsSendMomentOptions().setIsprivate(true)
      );
      console.log(`send text moment: ${Utils.stringifyPB(moment)}`);
    });

    test("send multiple images moment", async () => {
      const description = "multiple images";
      const imageUrlList: Array<SnsImageUrl> = await uploadImages(snsImageFilePathList, description);
      const moment = await client.api.snsSendMoment(
        Utils.genIdempotentId(),
        new SnsSendMomentImages().setText(description).setImageurlList(imageUrlList),
        new SnsSendMomentOptions().setIsprivate(true)
      );
      console.log(`send text moment: ${Utils.stringifyPB(moment)}`);
    }, 60000);

    test("send link", async () => {
      const description = "this is link";

      const imageUrlList: Array<SnsImageUrl> = await uploadImages([snsImageFilePathList[0]], description);

      const moment = await client.api.snsSendMoment(
        Utils.genIdempotentId(),
        new SnsSendMomentUrl()
          .setText(description)
          .setUrl("https://www.baidu.com")
          .setUrltitle("kangkang baidu")
          .setImageurl(imageUrlList[0]),
        new SnsSendMomentOptions().setIsprivate(true)
      );

      console.log(`send link moment: ${Utils.stringifyPB(moment)}`);
    });

    test("forward text moment", async () => {
      const contentXml =
        "<TimelineObject><id>0</id><username>wxid_j4ctnmp6zhh222</username><createTime>1589266687</createTime><contentDesc>Text private</contentDesc><contentDescShowType>0</contentDescShowType><contentDescScene>3</contentDescScene><private>1</private><sightFolded>0</sightFolded><showFlag>0</showFlag><appInfo><id/><version/><appName/><installUrl/><fromUrl/><isForceUpdate>0</isForceUpdate></appInfo><sourceUserName/><sourceNickName/><statisticsData/><statExtStr/><ContentObject><contentStyle>2</contentStyle><title/><description/><mediaList/></ContentObject></TimelineObject>";

      const moment = await client.api.snsForwardMoment(
        Utils.genIdempotentId(),
        contentXml,
        new SnsSendMomentOptions().setIsprivate(true)
      );

      console.log(`forward text moment: ${Utils.stringifyPB(moment)}`);
    });

    test("forward image moment", async () => {
      const contentXml =
        '<TimelineObject><id><![CDATA[13399847770986582162]]></id><username><![CDATA[wxid_kgeclct48zbz22]]></username><createTime><![CDATA[1597386332]]></createTime><contentDescShowType>0</contentDescShowType><contentDescScene>0</contentDescScene><private><![CDATA[0]]></private><contentDesc><![CDATA[⛅️发一组今晚食品类集合哦\\\\n你们要求返场的鸭血粉丝汤～蓝胖子必买的喔！口碑很好的成人奶粉🤟🏻 小龙虾重点推荐 国联的 虾品质很好 红咖喱很入味 🌴 九阳破壁机今晚200+]]></contentDesc><contentattr><![CDATA[0]]></contentattr><sourceUserName></sourceUserName><sourceNickName></sourceNickName><statisticsData></statisticsData><weappInfo><appUserName></appUserName><pagePath></pagePath><version><![CDATA[0]]></version><debugMode><![CDATA[0]]></debugMode><shareActionId></shareActionId><isGame><![CDATA[0]]></isGame><messageExtraData></messageExtraData><subType><![CDATA[0]]></subType></weappInfo><canvasInfoXml></canvasInfoXml><ContentObject><contentStyle><![CDATA[1]]></contentStyle><contentSubStyle><![CDATA[0]]></contentSubStyle><title></title><description></description><contentUrl></contentUrl><mediaList><media><id><![CDATA[13399847771215433854]]></id><type><![CDATA[2]]></type><title></title><description></description><private><![CDATA[0]]></private><url type="1" md5="b501b92a23ee6176b1e432b555b70881"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQVxco4hmJwh9jNWHzq81Lnjrl39USH03CzBd9v0fegI3h5B1bmY6Iwk/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQVxco4hmJwh9jNWHzq81Lnjrl39USH03CzBd9v0fegI3h5B1bmY6Iwk/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size totalSize="168902.0" width="1080.0" height="1035.0"></size></media><media><id><![CDATA[13399847771257704569]]></id><type><![CDATA[2]]></type><title></title><description></description><private><![CDATA[0]]></private><url type="1" md5="7f70832cc39f405230a0f48cce8b69de"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQVxco4hmJwh9NRTKz0LjMXDcq8Z4ZzzVmhhoBBhOlputgEwQA29APok/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQVxco4hmJwh9NRTKz0LjMXDcq8Z4ZzzVmhhoBBhOlputgEwQA29APok/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size totalSize="300878.0" width="1080.0" height="1370.0"></size></media><media><id><![CDATA[13399847771270418539]]></id><type><![CDATA[2]]></type><title></title><description></description><private><![CDATA[0]]></private><url type="1" md5="348a1daecbe0b6d48b1eed9e437c5097"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQe7D8oUOXIjMLqdv0Qfmu79mNvGJZJoCkoW8iad2Idpup82w2Pvb2D6M/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQe7D8oUOXIjMLqdv0Qfmu79mNvGJZJoCkoW8iad2Idpup82w2Pvb2D6M/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size totalSize="255224.0" width="1080.0" height="1029.0"></size></media><media><id><![CDATA[13399847771286409344]]></id><type><![CDATA[2]]></type><title></title><description></description><private><![CDATA[0]]></private><url type="1" md5="34a76ee31a330af1e983a6208d0d695b"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQXZ4sicahg8BZWT2XtoxVQBNsvWaN0DlUrPD4zUJrKsRxFZ1Gw3Ij55o/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQXZ4sicahg8BZWT2XtoxVQBNsvWaN0DlUrPD4zUJrKsRxFZ1Gw3Ij55o/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size totalSize="422527.0" width="1018.0" height="1297.0"></size></media><media><id><![CDATA[13399847771311116404]]></id><type><![CDATA[2]]></type><title></title><description></description><private><![CDATA[0]]></private><url type="1" md5="0cdfb2eb81bfd591d9d6c5dedef5e608"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQXZ4sicahg8BZgRd0T90HOpu2TyMynUZ87zzibByAOYMP5t2FsPG3Pqr4/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQXZ4sicahg8BZgRd0T90HOpu2TyMynUZ87zzibByAOYMP5t2FsPG3Pqr4/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size totalSize="197178.0" width="1080.0" height="1028.0"></size></media><media><id><![CDATA[13399847771330515053]]></id><type><![CDATA[2]]></type><title></title><description></description><private><![CDATA[0]]></private><url type="1" md5="0265cc322f95026f05d133d6462fd80d"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQYkGYVtvyIj8Oia4XKdUb8eRrLoichKxHH0wCQJpAg6Q6XGzFPKSVZl00/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQYkGYVtvyIj8Oia4XKdUb8eRrLoichKxHH0wCQJpAg6Q6XGzFPKSVZl00/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size totalSize="122336.0" width="1080.0" height="1028.0"></size></media><media><id><![CDATA[13399847771335037067]]></id><type><![CDATA[2]]></type><title></title><description></description><private><![CDATA[0]]></private><url type="1" md5="d1cb5dead2de95a77a5ba249885e0038"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQXqQ5AnosAJbJWgMDK9uZtYoVuSp4vTZBS0XoF6LacpPCiaO9PtsY1N8/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQXqQ5AnosAJbJWgMDK9uZtYoVuSp4vTZBS0XoF6LacpPCiaO9PtsY1N8/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size totalSize="328754.0" width="1080.0" height="1031.0"></size></media><media><id><![CDATA[13399847771343753351]]></id><type><![CDATA[2]]></type><title></title><description></description><private><![CDATA[0]]></private><url type="1" md5="d170f6cf7f087005f4b12519b42cee94"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQaLyIJJW3zKP1lGGpw0IkjU5Q6AoG2AyvPKibIicDa9JYbCRCXAuDydWY/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQaLyIJJW3zKP1lGGpw0IkjU5Q6AoG2AyvPKibIicDa9JYbCRCXAuDydWY/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size totalSize="161770.0" width="1080.0" height="1020.0"></size></media><media><id><![CDATA[13399847771360071821]]></id><type><![CDATA[2]]></type><title></title><description></description><private><![CDATA[0]]></private><url type="1" md5="d6bd6637030cdf2944dd5a6e24fb02f7"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQazmQMql8P4vMcZsM3KxplJia1iazPMj0SibNVSA6WGSh5DS3VeV0Gictd4/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/b2ONlmmVZRrGvzODsjCkQazmQMql8P4vMcZsM3KxplJia1iazPMj0SibNVSA6WGSh5DS3VeV0Gictd4/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size totalSize="350514.0" width="1080.0" height="1027.0"></size></media></mediaList></ContentObject><actionInfo><appMsg><mediaTagName></mediaTagName><messageExt></messageExt><messageAction></messageAction></appMsg></actionInfo><appInfo><id></id></appInfo><location poiClassifyId="" poiName="" poiAddress="" poiClassifyType="0" city=""></location><publicUserName></publicUserName><streamvideo><streamvideourl></streamvideourl><streamvideothumburl></streamvideothumburl><streamvideoweburl></streamvideoweburl></streamvideo></TimelineObject>';

      const moment = await client.api.snsForwardMoment(
        Utils.genIdempotentId(),
        contentXml,
        new SnsSendMomentOptions().setIsprivate(true)
      );

      console.log(`forward image moment: ${Utils.stringifyPB(moment)}`);
    });

    test("forward link moment", async () => {
      const contentXml =
        '<TimelineObject><id><![CDATA[13399877748720283773]]></id><username><![CDATA[wxid_nlhppil3i7qt22]]></username><createTime><![CDATA[1597389906]]></createTime><contentDescShowType>1</contentDescShowType><contentDescScene>4</contentDescScene><private><![CDATA[0]]></private><contentDesc><![CDATA[5年以前，我们买房子都希望大面积、低单价、不带学区，为的是搏增量的暴击；\n5年以后的今天，过去的逻辑并不能说是错的，但是我们发现原来市中心低总价、多房间、带学区的房子也是上佳之选。为什么会有这样的变化，\n今天我们这篇尝试着去分析，\n[握手]欢迎点赞转发。]]></contentDesc><contentattr><![CDATA[0]]></contentattr><sourceUserName/><sourceNickName><![CDATA[魔都财观]]></sourceNickName><statisticsData/><weappInfo><appUserName/><pagePath/><version><![CDATA[0]]></version><debugMode><![CDATA[0]]></debugMode><shareActionId/><isGame><![CDATA[0]]></isGame><messageExtraData/><subType><![CDATA[0]]></subType></weappInfo><canvasInfoXml/><ContentObject><contentStyle><![CDATA[3]]></contentStyle><contentSubStyle><![CDATA[0]]></contentSubStyle><title><![CDATA[上海楼市，正在悄悄变天]]></title><description><![CDATA[上海中环以外，一片混沌]]></description><contentUrl><![CDATA[http://mp.weixin.qq.com/s?__biz=MzIzNzQ2NzEzNA==&mid=2247493071&idx=1&sn=9409846366c9a7506b9ff3d74db8d803&chksm=e8ca815edfbd08482fbe2f500f1c7f280803b6b08b8b6d4e4a83a674ba34491c9bda00c8a194&mpshare=1&scene=2&srcid=0814rZdnkkryTMnPcankGHQL&sharer_sharetime=1597389899755&sharer_shareid=eb378bf4e54bc72e83142657ccabb700#rd]]></contentUrl><mediaList><media><id><![CDATA[13399877749062709353]]></id><type><![CDATA[2]]></type><title/><description/><private><![CDATA[0]]></private><url type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/JVDECnNjedEL1HZiaVdx8KGEflnLkic3AGq0Oruic8TsDnvExvNyeEDcNMxXxWXWMu0icsPOcTmlQ8A/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/JVDECnNjedEL1HZiaVdx8KGEflnLkic3AGq0Oruic8TsDnvExvNyeEDcNMxXxWXWMu0icsPOcTmlQ8A/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size height="149.0" totalSize="15503.0" width="150.0"/></media></mediaList><mmreadershare><itemshowtype>0</itemshowtype><ispaysubscribe>0</ispaysubscribe></mmreadershare></ContentObject><actionInfo><appMsg><mediaTagName/><messageExt/><messageAction/></appMsg></actionInfo><statExtStr/><appInfo><id/></appInfo><location city="" poiAddress="" poiClassifyId="" poiClassifyType="0" poiName=""/><publicUserName>gh_cc46da0ba054</publicUserName><streamvideo><streamvideourl/><streamvideothumburl/><streamvideoweburl/></streamvideo></TimelineObject>';

      const moment = await client.api.snsForwardMoment(
        Utils.genIdempotentId(),
        contentXml,
        new SnsSendMomentOptions().setIsprivate(true)
      );

      console.log(`forward link moment: ${Utils.stringifyPB(moment)}`);
    });

    test("forward moment with poi", async () => {
      const contentXml =
        '<TimelineObject><id><![CDATA[13399855508938035285]]></id><username><![CDATA[liupeng9950]]></username><createTime><![CDATA[1597387255]]></createTime><contentDescShowType>0</contentDescShowType><contentDescScene>0</contentDescScene><private><![CDATA[0]]></private><contentDesc><![CDATA[知一刑诉批改展示！\n用最笨的方式批改\n呵护每一个法律梦\n主观批改非常重要\n客观学生还未考试\n批改质量也是最高的时候！]]></contentDesc><contentattr><![CDATA[0]]></contentattr><sourceUserName/><sourceNickName/><statisticsData/><weappInfo><appUserName/><pagePath/><version><![CDATA[0]]></version><debugMode><![CDATA[0]]></debugMode><shareActionId/><isGame><![CDATA[0]]></isGame><messageExtraData/><subType><![CDATA[0]]></subType></weappInfo><canvasInfoXml/><location city="哈尔滨" country="中国" latitude="45.714916" longitude="126.60088" poiAddress="清华大街64号" poiAddressName="知一司考全封闭学院" poiClassifyId="qqmap_16845034816612029947" poiClassifyType="1" poiClickableStatus="0" poiName="哈尔滨 · 知一司考全封闭学院" poiScale="0"/><ContentObject><contentStyle><![CDATA[1]]></contentStyle><contentSubStyle><![CDATA[0]]></contentSubStyle><title/><description/><contentUrl/><mediaList><media><id><![CDATA[13399855509167804496]]></id><type><![CDATA[2]]></type><title/><description/><private><![CDATA[0]]></private><url md5="c3f56defb6ddb2770d958bb859c1a286" type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/HmVQlX9WkBsJF5RO4uVzqhwvGGhIANZoh2Pb540H1wPYFRibASic2MrlT8fico9hKZYCd8GZcke3T0/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/HmVQlX9WkBsJF5RO4uVzqhwvGGhIANZoh2Pb540H1wPYFRibASic2MrlT8fico9hKZYCd8GZcke3T0/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size height="1123.0" totalSize="105598.0" width="1080.0"/></media><media><id><![CDATA[13399855509188120629]]></id><type><![CDATA[2]]></type><title/><description/><private><![CDATA[0]]></private><url md5="54e3c815b7f371926007e7c6b73df611" type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/HmVQlX9WkBsJF5RO4uVzqhwvGGhIANZogQ3156RW2iahvyCWlh5EIbAHvttVkcicHzaSuJo1yvXAE/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/HmVQlX9WkBsJF5RO4uVzqhwvGGhIANZogQ3156RW2iahvyCWlh5EIbAHvttVkcicHzaSuJo1yvXAE/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size height="1080.0" totalSize="83671.0" width="1462.0"/></media><media><id><![CDATA[13399855509198409790]]></id><type><![CDATA[2]]></type><title/><description/><private><![CDATA[0]]></private><url md5="bf039508be49278dcbafa1ba1f55f4f4" type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/HmVQlX9WkBsJF5RO4uVzqhwvGGhIANZoy5IfOzCLFiaEbZ77AHS560kBjT7kzJ8oIDicXSWnrKQy4/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/HmVQlX9WkBsJF5RO4uVzqhwvGGhIANZoy5IfOzCLFiaEbZ77AHS560kBjT7kzJ8oIDicXSWnrKQy4/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size height="1080.0" totalSize="92553.0" width="1128.0"/></media><media><id><![CDATA[13399855509215318110]]></id><type><![CDATA[2]]></type><title/><description/><private><![CDATA[0]]></private><url md5="ffe87c28c0ea96bf07085316cd50072a" type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/HmVQlX9WkBsJF5RO4uVzqhwvGGhIANZoBHsnvqLrUhp8W7wbFXZ8WH1Ud64iaCBicltdhcvTZXoeE/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/HmVQlX9WkBsJF5RO4uVzqhwvGGhIANZoBHsnvqLrUhp8W7wbFXZ8WH1Ud64iaCBicltdhcvTZXoeE/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size height="1080.0" totalSize="127106.0" width="1433.0"/></media><media><id><![CDATA[13399855509227376696]]></id><type><![CDATA[2]]></type><title/><description/><private><![CDATA[0]]></private><url md5="7f3aeb4b3e0feeb081a8be1ba7e686d8" type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/HmVQlX9WkBsJF5RO4uVzqlH0wbQwQiblibicMibHKN9g9D13YWVnGInXdJojBlUwJXyGDNFO4bJibMaI/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/HmVQlX9WkBsJF5RO4uVzqlH0wbQwQiblibicMibHKN9g9D13YWVnGInXdJojBlUwJXyGDNFO4bJibMaI/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size height="1118.0" totalSize="104054.0" width="1080.0"/></media><media><id><![CDATA[13399855509248479316]]></id><type><![CDATA[2]]></type><title/><description/><private><![CDATA[0]]></private><url md5="82e709f27a8a74f700f2de0954800b21" type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/HmVQlX9WkBsJF5RO4uVzqlH0wbQwQiblibtc2CB8WYjJh95iaA57FtVFaxuF7s4eKaTENXXhO7b9aU/0]]></url><thumb type="1"><![CDATA[http://shmmsns.qpic.cn/mmsns/HmVQlX9WkBsJF5RO4uVzqlH0wbQwQiblibtc2CB8WYjJh95iaA57FtVFaxuF7s4eKaTENXXhO7b9aU/150]]></thumb><videoDuration><![CDATA[0.0]]></videoDuration><size height="1080.0" totalSize="127887.0" width="1616.0"/></media></mediaList></ContentObject><actionInfo><appMsg><mediaTagName/><messageExt/><messageAction/></appMsg></actionInfo><appInfo><id/></appInfo><publicUserName/><streamvideo><streamvideourl/><streamvideothumburl/><streamvideoweburl/></streamvideo></TimelineObject>';

      const canSeeUserList: Array<string> = config.get("test.sns.canSeeUserList");

      const moment = await client.api.snsForwardMoment(
        Utils.genIdempotentId(),
        contentXml,
        new SnsSendMomentOptions().setCanseeusernameList(canSeeUserList)
      );

      console.log(`forward moment with poi: ${Utils.stringifyPB(moment)}`);
    });
  });

  describe("sns comment", () => {
    const momentId: string = config.get("test.sns.comment.momentId");
    const momentOwnerUserName: string = config.get("test.sns.comment.momentOwnerUserName");

    test("send comment", async () => {
      const moment = await client.api.snsSendComment(
        Utils.genIdempotentId(),
        momentId,
        momentOwnerUserName,
        `comment-${Date.now()}`
      );
      console.log(`send comment response: ${Utils.stringifyPB(moment)}`);
    });

    test("send comment reply", async () => {
      const replyCommentId: string = config.get("test.sns.comment.reply.commentId");
      const replyCommentUsername: string = config.get("test.sns.comment.reply.commentUserName");
      const replyCommentNickName: string = config.get("test.sns.comment.reply.commentNickname");

      const moment = await client.api.snsSendComment(
        Utils.genIdempotentId(),
        momentId,
        momentOwnerUserName,
        `reply-${Date.now()}`,
        new SnsSendCommentReplyTo()
          .setCommentid(replyCommentId)
          .setCommentnickname(replyCommentNickName)
          .setCommentusername(replyCommentUsername)
      );
      console.log(`send comment reply response: ${Utils.stringifyPB(moment)}`);
    });

    test("like", async () => {
      const moment = await client.api.snsLikeMoment(momentId, momentOwnerUserName);
      console.log(`like moment: ${Utils.stringifyPB(moment)}`);
    });

    test("unlike", async () => {
      await client.api.snsUnlikeMoment(momentId);
    });

    test("remove moment comment", async () => {
      const momentId: string = config.get("test.sns.removeMomentComment.momentId");
      const commentId: string = config.get("test.sns.removeMomentComment.commentId");
      await client.api.snsRemoveMomentComment(momentId, commentId);
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
