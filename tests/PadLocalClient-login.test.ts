import { prepareSignedOnClient } from "./Common";

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
