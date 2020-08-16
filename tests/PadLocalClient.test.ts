import { prepareSignedOnClient } from "./TestUtils";
import { OnPushNewMessageEvent, PadLocalClient, EventName, OnPushContactEvent } from "../src/PadLocalClient";
import { stringifyPB } from "../src/utils/Utils";
import { bytesToHexString, fromBytes } from "../src/utils/ByteUtils";

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
    client.on(EventName.OnPushNewMessageEvent, (event: OnPushNewMessageEvent) => {
      console.log("on message:");
      for (const message of event.messageList) {
        console.log(bytesToHexString(fromBytes(message.serializeBinary())));
        console.log(stringifyPB(message));
      }
    });

    client.on(EventName.OnPushContactEvent, (event: OnPushContactEvent) => {
      console.log("on contact");

      for (const contact of event.contactList) {
        console.log(stringifyPB(contact));
      }
    });

    return new Promise(() => {});
  },
  Math.pow(2, 20)
);
