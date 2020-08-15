import { TestUtils } from "./TestUtils";
import { PadLocalClient } from "../src/PadLocalClient";
import { Utils } from "../src/utils/Utils";
import { ByteUtils } from "../src/utils/ByteUtils";

test("login", async function () {
  const client = await TestUtils.prepareSignedOnClient();

  expect(client.selfContact).not.toBeNull();
  expect(client.isOnline).toBeTruthy();

  return new Promise(() => {});

  client.shutdown();
}, 600000);

test(
  "receive push",
  async () => {
    const client = await TestUtils.prepareSignedOnClient();
    client.on(PadLocalClient.Event.OnPushNewMessageEvent, (event: PadLocalClient.OnPushNewMessageEvent) => {
      console.log("on message:");
      for (const message of event.messageList) {
        console.log(ByteUtils.bytesToHexString(ByteUtils.fromBytes(message.serializeBinary())));
        console.log(Utils.stringifyPB(message));
      }
    });

    client.on(PadLocalClient.Event.OnPushContactEvent, (event: PadLocalClient.OnPushContactEvent) => {
      console.log("on contact");

      for (const contact of event.contactList) {
        console.log(Utils.stringifyPB(contact));
      }
    });

    return new Promise(() => {});
  },
  Math.pow(2, 20)
);
