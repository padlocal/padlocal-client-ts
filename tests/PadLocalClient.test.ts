import { prepareSignedOnClient } from "./TestUtils";
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
        console.log(bytesToHexString(fromBytes(message.serializeBinary())));
        console.log(stringifyPB(message));
      }
    });

    client.on("contact", (contactList: Contact[]) => {
      console.log("on contact");

      for (const contact of contactList) {
        console.log(stringifyPB(contact));
      }
    });

    return new Promise(() => {});
  },
  Math.pow(2, 20)
);
