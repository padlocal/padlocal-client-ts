import { PadLocalClient } from "../src/PadLocalClient";
import { Utils } from "../src/utils/Utils";
import { LoginPolicy, LoginType, QRCodeEvent, SyncEvent } from "../src/proto/padlocal_pb";

test('login', async function () {
    const padLocalClient = new PadLocalClient("127.0.0.1", 8980, "TOKEN");

    await padLocalClient.api.login(LoginPolicy.DEFAULT, {
        onLoginStart: (loginType: LoginType) => {
            console.log(`start login with type: ${loginType}`);
        },

        onOneClickEvent: (oneClickEvent: QRCodeEvent) => {
            console.log(`on one click event: ${Utils.stringifyPB(oneClickEvent)}`);
        },

        onQrCodeEvent: (qrCodeEvent: QRCodeEvent) => {
            console.log(`on qr code event: ${Utils.stringifyPB(qrCodeEvent)}`);
        },

        onSync: (syncEvent: SyncEvent) => {
            for (const contact of syncEvent.getContactList()) {
                console.log(`login on sync contact: ${Utils.stringifyPB(contact)}`);
            }

            for (const message of syncEvent.getMessageList()) {
                console.log(`login on sync contact: ${Utils.stringifyPB(message)}`);
            }
        }
    });

    expect(padLocalClient.selfContact).not.toBeNull();

}, 60000);