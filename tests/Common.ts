import { PadLocalClient } from "../src/PadLocalClient";
import { stringifyPB } from "../src/utils/Utils";
import { Contact, LoginPolicy, LoginType, QRCodeEvent, SyncEvent } from "../src/proto/padlocal_pb";
import config from "config";
import { EnumValues } from "enum-values";
import Log from "../src/utils/Log";

// Log.getLogger().level("silly");

export async function prepareSignedOnClient(): Promise<PadLocalClient> {
  const token: string = config.get("padLocal.token");
  const padLocalClient = await PadLocalClient.create(token);

  await padLocalClient.api.login(LoginPolicy.DEFAULT, {
    onLoginStart: (loginType: LoginType) => {
      Log.info(`start login with type: ${EnumValues.getNameFromValue(LoginType, loginType)}`);
    },

    onOneClickEvent: (oneClickEvent: QRCodeEvent) => {
      Log.info(`on one click event: ${stringifyPB(oneClickEvent)}`);
    },

    onQrCodeEvent: (qrCodeEvent: QRCodeEvent) => {
      Log.info(`on qr code event: ${stringifyPB(qrCodeEvent)}`);
    },

    onLoginSuccess(contact: Contact) {
      Log.info(`on login success: ${stringifyPB(contact)}`);
    },

    onSync: (syncEvent: SyncEvent) => {
      for (const contact of syncEvent.getContactList()) {
        Log.info(`login on sync contact: ${stringifyPB(contact)}`);
        Log.info(Buffer.from(contact.serializeBinary()).toString("hex"));
      }

      for (const message of syncEvent.getMessageList()) {
        Log.info(`login on sync message: ${stringifyPB(message)}`);
        Log.info(Buffer.from(message.serializeBinary()).toString("hex"));
      }
    },
  });

  Log.info("login done, listen for notifications");

  padLocalClient.on("kickout", (e) => {
    Log.info(`client did kickout: ${JSON.stringify(e)}`);
  });

  return padLocalClient;
}
