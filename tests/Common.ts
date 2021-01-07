import { PadLocalClient } from "../src/PadLocalClient";
import { stringifyPB } from "../src/utils/Utils";
import { Contact, LoginPolicy, LoginType, QRCodeEvent, SyncEvent } from "../src/proto/padlocal_pb";
import config from "config";
import { EnumValues } from "enum-values";
import { log } from "brolog";

// log.level("silly");

export async function prepareSignedOnClient(): Promise<PadLocalClient> {
  const token: string = config.get("padLocal.token");
  const padLocalClient = await PadLocalClient.create(token);

  await padLocalClient.api.login(LoginPolicy.DEFAULT, {
    onLoginStart: (loginType: LoginType) => {
      log.info(`start login with type: ${EnumValues.getNameFromValue(LoginType, loginType)}`);
    },

    onOneClickEvent: (oneClickEvent: QRCodeEvent) => {
      log.info(`on one click event: ${stringifyPB(oneClickEvent)}`);
    },

    onQrCodeEvent: (qrCodeEvent: QRCodeEvent) => {
      log.info(`on qr code event: ${stringifyPB(qrCodeEvent)}`);
    },

    onLoginSuccess(contact: Contact) {
      log.info(`on login success: ${stringifyPB(contact)}`);
    },

    onSync: (syncEvent: SyncEvent) => {
      for (const contact of syncEvent.getContactList()) {
        log.info(`login on sync contact: ${stringifyPB(contact)}`);
        log.info(Buffer.from(contact.serializeBinary()).toString("hex"));
      }

      for (const message of syncEvent.getMessageList()) {
        log.info(`login on sync message: ${stringifyPB(message)}`);
        log.info(Buffer.from(message.serializeBinary()).toString("hex"));
      }
    },
  });

  log.info("login done, listen for notifications");

  padLocalClient.on("kickout", (e) => {
    log.info(`client did kickout: ${JSON.stringify(e)}`);
  });

  return padLocalClient;
}
