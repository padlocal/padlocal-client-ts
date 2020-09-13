import { stringifyPB } from "../src/utils/Utils";
import { SocketClient } from "../src/link/SocketClient";
import { WeChatResponse } from "../src/proto/padlocal_pb";
import { Bytes } from "../src/utils/ByteUtils";

test("socket client", async () => {
  const socketClient = new SocketClient("180.96.2.187", 80, "testId", {
    onConnect: async () => {
      console.log("socket connect");
    },
    onReceive: async (data: Bytes): Promise<boolean> => {
      console.log(`socket onrecieve: ${data.toString("hex")}`);

      return false;
    },
  });

  await socketClient.send(Buffer.from("", "hex"));
});
