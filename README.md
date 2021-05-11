# padlocal-client-ts

[![NPM Version](https://badge.fury.io/js/padlocal-client-ts.svg)](https://www.npmjs.com/package/padlocal-client-ts)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
![Stage](https://img.shields.io/badge/Stage-beta-yellow)


本项目是 PadLocal 的 TypeScript 客户端，JavaScript 项目也可以。同时作为核心组件，为 [wechaty-puppet-padlocal](https://github.com/padlocal/wechaty-puppet-padlocal) 提供了聊天机器人相关功能的技术支持。

## 如何使用

### 和 Wechaty 一起使用
如果你是聊天机器人的初学者，建议先尝试 [Wechaty](https://github.com/wechaty/wechaty) 。Wechaty 是一个非常易用的聊天机器人框架，有丰富的技术文档和优秀的社区，被广大开发者喜爱。

如果你熟悉甚至已经在使用 Wechaty，那么你可以将 [wechaty-puppet-padlocal](https://github.com/padlocal/wechaty-puppet-padlocal) 作为 Wechaty 的 puppet 来使用，支持和其他 puppet 无缝切换。因为 wechaty-puppet-padlocal 是一个完整的 Wechaty puppet 实现，且由 padlocal-client-ts 提供技术支持。

![系统架构](https://user-images.githubusercontent.com/64943823/103167459-3f40af80-4866-11eb-8b8e-2d06c3c584a8.png)

### 直接使用

当然 padlocal-client-ts 也支持直接单独使用。
```
const token: string = "";             // padlocal token
const client = await PadLocalClient.create(token);

client.on("message", (messageList: Message[]) => {
  for (const message of messageList) {
    console.log("on message: ", JSON.stringify(message.toObject()));
  }
});

client.on("contact", (contactList: Contact[]) => {
  for (const contact of contactList) {
    console.log("on contact: ", JSON.stringify(contact.toObject()));
  }
});

console.log("start login");

await client.api.login(LoginPolicy.DEFAULT, {
  onLoginStart: (loginType: LoginType) => {
    console.log("start login with type: ", loginType);
  },
  onOneClickEvent: (oneClickEvent: QRCodeEvent) => {
    console.log("on one click event: ", JSON.stringify(oneClickEvent.toObject()));
  },
  onQrCodeEvent: (qrCodeEvent: QRCodeEvent) => {
    console.log("on qr code event: ", JSON.stringify(qrCodeEvent.toObject()));
  },
  onLoginSuccess(contact: Contact) {
    console.log("on login success: ", JSON.stringify(contact.toObject()));
  },
  onSync: (syncEvent: SyncEvent) => {
    for (const contact of syncEvent.getContactList()) {
      console.log("login on sync contact: ", JSON.stringify(contact.toObject()));
    }

    for (const message of syncEvent.getMessageList()) {
      console.log("login on sync message: ", JSON.stringify(message.toObject()));
    }
  },
});

console.log("login done");
```

你也可以查阅本项目的测试用例，里面有大量的详细使用示例：https://github.com/padlocal/padlocal-client-ts/tree/master/tests 。
可以特别关注如下文件：
* Common.ts
* PadLocalClient-login.test.ts
* PadLocalClient-push.test.ts
* PadLocalClient-api.test.ts

## API
所有支持的 API 请参见:
* PadLocalClientApi.ts

## How to apply token
[TOKEN 申请方法](https://github.com/padlocal/wechaty-puppet-padlocal/wiki/How-to-Apply-Token)
