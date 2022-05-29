import { SocketClient } from "../src/link/SocketClient";
import { Bytes } from "../src/utils/ByteUtils";
import Log from "../src/utils/Log";

test("socket client", async () => {
  const socketClient = new SocketClient("180.96.2.187", 80, "testId", {
    onConnect: async () => {
      Log.info("socket connect");
    },
    onReceive: async (data: Bytes): Promise<boolean> => {
      Log.info(`socket onrecieve: ${data.toString("hex")}`);

      return false;
    },
  });

  await socketClient.send(Buffer.from("", "hex"));
});
