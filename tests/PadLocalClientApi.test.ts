import { TestUtils } from "./TestUtils";
import { PadLocalClient } from "../src/PadLocalClient";
import { Utils } from "../src/utils/Utils";
import config from "config";
import * as fs from "fs";
import { AddContactScene, AppMessageLink, AppMessageMiniProgram, Message } from "../src/proto/padlocal_pb";
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

describe("sns", () => {});
