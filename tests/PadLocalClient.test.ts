import { prepareSignedOnClient } from "./Common";
import { stringifyPB } from "../src/utils/Utils";
import { bytesToHexString, fromBytes } from "../src/utils/ByteUtils";
import { Contact, Message } from "../src/proto/padlocal_pb";

test("login", async () => {
  const client = await prepareSignedOnClient();

  expect(client.selfContact).not.toBeNull();
  expect(client.isOnline).toBeTruthy();

  client.shutdown();
}, 600000);

test(
  "receive push",
  async () => {
    const client = await prepareSignedOnClient();
    client.on("message", (messageList: Message[]) => {
      console.log("on message:");
      for (const message of messageList) {
        console.log(stringifyPB(message));
        console.log(bytesToHexString(fromBytes(message.serializeBinary())));
      }
    });

    client.on("contact", (contactList: Contact[]) => {
      console.log("on contact");

      for (const contact of contactList) {
        console.log(stringifyPB(contact));
        console.log(bytesToHexString(fromBytes(contact.serializeBinary())));
      }
    });

    return new Promise(() => {});
  },
  Math.pow(2, 30)
);
