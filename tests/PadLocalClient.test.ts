import { prepareSignedOnClient } from "./Common";
import { stringifyPB } from "../src/utils/Utils";
import { bytesToHexString, fromBytes } from "../src/utils/ByteUtils";
import { Contact, Message } from "../src/proto/padlocal_pb";
import { log } from "brolog";

test("login", async () => {
  const client = await prepareSignedOnClient();

  expect(client.selfContact).not.toBeNull();
  expect(client.isOnline).toBeTruthy();

  client.shutdown();
}, 6000000);

test("logout", async () => {
  const client = await prepareSignedOnClient();
  await client.api.logout();
});

test(
  "receive push",
  async () => {
    const client = await prepareSignedOnClient();
    client.on("message", (messageList: Message[]) => {
      log.info("on message:");
      for (const message of messageList) {
        log.info(stringifyPB(message));
        log.info(bytesToHexString(fromBytes(message.serializeBinary())));
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
