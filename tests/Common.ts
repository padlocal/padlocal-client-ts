import { PadLocalClient } from "../src/PadLocalClient";
import { stringifyPB } from "../src/utils/Utils";
import { Contact, LoginPolicy, LoginType, QRCodeEvent, SyncEvent } from "../src/proto/padlocal_pb";
import config from "config";
import { LogLevel, setLogLevel } from "../src/utils/log";
import { EnumValues } from "enum-values";

// setLogLevel(LogLevel.DEBUG);

export async function prepareSignedOnClient(): Promise<PadLocalClient> {
  const host: string = config.get("padLocal.host");
  const port: number = config.get("padLocal.port");
  const token: string = config.get("padLocal.token");
  const tlsEnabled: boolean = config.get("padLocal.tls.enabled");
  const serverCAFilePath: string = config.get("padLocal.tls.serverCAFilePath");
  const padLocalClient = new PadLocalClient(`${host}:${port}`, token, tlsEnabled ? serverCAFilePath : undefined);

  await padLocalClient.api.login(LoginPolicy.DEFAULT, {
    onLoginStart: (loginType: LoginType) => {
      console.log(`start login with type: ${EnumValues.getNameFromValue(LoginType, loginType)}`);
    },

    onOneClickEvent: (oneClickEvent: QRCodeEvent) => {
      console.log(`on one click event: ${stringifyPB(oneClickEvent)}`);
    },

    onQrCodeEvent: (qrCodeEvent: QRCodeEvent) => {
      console.log(`on qr code event: ${stringifyPB(qrCodeEvent)}`);
    },

    onLoginSuccess(contact: Contact) {
      console.log(`on login success: ${stringifyPB(contact)}`);
    },

    onSync: (syncEvent: SyncEvent) => {
      for (const contact of syncEvent.getContactList()) {
        console.log(`login on sync contact: ${stringifyPB(contact)}`);
        console.log(Buffer.from(contact.serializeBinary()).toString("hex"));
      }

      for (const message of syncEvent.getMessageList()) {
        console.log(`login on sync message: ${stringifyPB(message)}`);
        console.log(Buffer.from(message.serializeBinary()).toString("hex"));
      }
    },
  });

  console.log("login done, listen for notifications");

  padLocalClient.on("kickout", (e) => {
    console.log(`client did kickout: ${JSON.stringify(e)}`);
  });

  return padLocalClient;
}
