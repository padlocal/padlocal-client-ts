import { SocketClient } from "../src/link/SocketClient";
import { Bytes } from "../src/utils/ByteUtils";
import { log } from "brolog";

test("socket client", async () => {
  const socketClient = new SocketClient("180.96.2.187", 80, "testId", {
    onConnect: async () => {
      log.info("socket connect");
    },
    onReceive: async (data: Bytes): Promise<boolean> => {
      log.info(`socket onrecieve: ${data.toString("hex")}`);

      return false;
    },
  });

  await socketClient.send(Buffer.from("", "hex"));
});
