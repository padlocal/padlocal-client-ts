import { prepareSignedOnClient } from "./Common";
import { Contact, ImageType, Message } from "../src/proto/padlocal_pb";
import { log } from "brolog";
import { stringifyPB } from "../src/utils/Utils";
import { Bytes, bytesToHexString, fromBytes } from "../src/utils/ByteUtils";
import { PadLocalClient } from "../src/PadLocalClient";
import { appMessageParser, AppMessageType } from "./message-parser/message-appmsg";

enum WechatMessageType {
  Text = 1,
  Image = 3,
  Voice = 34,
  VerifyMsg = 37,
  PossibleFriendMsg = 40,
  ShareCard = 42,
  Video = 43,
  Emoticon = 47,
  Location = 48,
  App = 49,
  VoipMsg = 50,
  StatusNotify = 51,
  VoipNotify = 52,
  VoipInvite = 53,
  MicroVideo = 62,
  VerifyMsgEnterprise = 65,
  Transfer = 2000, // 转账
  RedEnvelope = 2001, // 红包
  MiniProgram = 2002, // 小程序
  GroupInvite = 2003, // 群邀请
  File = 2004, // 文件消息
  SysNotice = 9999,
  Sys = 10000,
  Recalled = 10002, // NOTIFY 服务通知
}

async function getMessagePayload(client: PadLocalClient, message: Message) {
  const messageType = message.getType() as WechatMessageType;

  switch (messageType) {
    case WechatMessageType.Image:
      if (message.getBinarypayload()) {
        const thumbData = Buffer.from(message.getBinarypayload());
        log.info(`message:${message.getId()} embeded thumb image len:${thumbData.length}`);
      }

      let response = await client.api.getMessageImage(message.getContent(), message.getTousername(), ImageType.THUMB);
      expect(response.imageData.length).toBeGreaterThan(0);
      log.info(
        `message:${message.getId()} get thumb image ret type:${response.imageType} data len: ${
          response.imageData.length
        }`
      );

      response = await client.api.getMessageImage(message.getContent(), message.getTousername(), ImageType.NORMAL);
      expect(response.imageData.length).toBeGreaterThan(0);
      log.info(
        `message:${message.getId()} get normal image ret type:${response.imageType} data len: ${
          response.imageData.length
        }`
      );

      response = await client.api.getMessageImage(message.getContent(), message.getTousername(), ImageType.HD);
      expect(response.imageData.length).toBeGreaterThan(0);
      log.info(
        `message:${message.getId()} get hd image ret type:${response.imageType} data len: ${response.imageData.length}`
      );

      break;

    case WechatMessageType.Voice:
      let audioData: Bytes;
      if (message.getBinarypayload()) {
        audioData = Buffer.from(message.getBinarypayload());
      } else {
        audioData = await client.api.getMessageVoice(message.getId(), message.getContent(), message.getTousername());
      }

      expect(audioData.length).toBeGreaterThan(0);

      log.info(`message:${message.getId()} get voice data len:${audioData.length}`);

      break;

    case WechatMessageType.Video:
      const videoData = await client.api.getMessageVideo(message.getContent(), message.getTousername());

      expect(videoData.length).toBeGreaterThan(0);

      log.info(`message:${message.getId()} get video data len:${videoData.length}`);

      break;

    case WechatMessageType.App:
      const appMsgPayload = await appMessageParser(message.toObject());
      switch (appMsgPayload.type) {
        case AppMessageType.Attach:
          const fileData = await client.api.getMessageAttach(message.getContent(), message.getTousername());

          expect(fileData.length).toBeGreaterThan(0);

          log.info(`message:${message.getId()} get file data len:${fileData.length}`);
          break;

        case AppMessageType.Url:
          if (appMsgPayload.thumburl) {
            log.info(`message:${message.getId()} get thumburl:${appMsgPayload.thumburl}`);
          } else {
            const thumbData = await client.api.getMessageAttach(message.getContent(), message.getTousername());
            log.info(`message:${message.getId()} get thumbdata len:${thumbData.length}`);
          }
          break;
      }
      break;
  }
}

test(
  "receive push",
  async () => {
    const client = await prepareSignedOnClient();
    client.on("message", async (messageList: Message[]) => {
      log.info("on message:");
      for (const message of messageList) {
        log.info(stringifyPB(message));
        log.info(bytesToHexString(fromBytes(message.serializeBinary())));

        await getMessagePayload(client, message);
      }
    });

    client.on("contact", (contactList: Contact[]) => {
      log.info("on contact");

      for (const contact of contactList) {
        log.info(stringifyPB(contact));
        log.info(bytesToHexString(fromBytes(contact.serializeBinary())));
      }
    });

    return new Promise(() => {});
  },
  Math.pow(2, 30)
);
