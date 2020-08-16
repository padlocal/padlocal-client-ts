import { WeChatShortLinkProxy } from "../src/link/WeChatShortLinkProxy";
import { hexStringToBytes } from "../src/utils/ByteUtils";

const host = "short.weixin.qq.com";
const port = 80;
const traceId = "testTraceId";
const path = "/mmtls/fff6b2a4";
const sendData = hexStringToBytes(
  "16f10300d4000000d00103f101c02b4f955068aecc9562d9069d768ad5eab9d676d373ca3d83ff4b90db9bc5fe0a2ffff6b2a4000000a2010000009d00100200000047000000010041048b6c015e22fa159e00f90be44d4dfa9839d8745242a62ebe3e4b396ba552b6dbad6d9c69af91e1d21d09f4d82a081cd3583e017020d5ad4abed376f0e3f4617e00000047000000020041040a14ec88ff97f1fc4484763b8be270722cb5b1f30064188d35cc3ba097b62c336180de2fdfd2f96e9822b6d469efb6e21e81e3b0753bed8e7a3f035b0318eada00000001"
);

test("send data success", async () => {
  const shortlink = new WeChatShortLinkProxy(host, port, traceId);
  const responseData = await shortlink.send(path, sendData);

  expect(responseData && responseData instanceof Buffer && responseData.length).toBeTruthy();
});

test("send timeout and retry", async () => {
  const shortlink = new WeChatShortLinkProxy(host, port, traceId, 10);
  await expect(shortlink.send(path, sendData)).rejects.toThrow();
  expect(shortlink.retryStrategy.retryCount).toBe(shortlink.retryStrategy.maxRetry);
}, 60000);

test("send host not reachable and retry", async () => {
  const shortlink = new WeChatShortLinkProxy("unreachable_host", port, traceId);
  await expect(shortlink.send(path, sendData)).rejects.toThrow();
  expect(shortlink.retryStrategy.retryCount).toBe(shortlink.retryStrategy.maxRetry);
}, 60000);
