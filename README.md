# padlocal-client-ts

[![NPM Version](https://badge.fury.io/js/padlocal-client-ts.svg)](https://www.npmjs.com/package/padlocal-client-ts)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
![Stage](https://img.shields.io/badge/Stage-beta-yellow)


本项目是 PadLocal 的 TypeScript 客户端，JavaScript 项目也可以。同时作为核心组件，为 [wechaty-puppet-padlocal](https://github.com/padlocal/wechaty-puppet-padlocal) 提供了聊天机器人相关功能的技术支持。

## 如何使用

### 和 Wechaty 一起使用
如果你是聊天机器人的初学者，建议先尝试 [Wechaty](https://github.com/wechaty/wechaty) 。Wechaty 是一个非常易用的聊天机器人框架，有丰富的技术文档和优秀的社区，被广大开发者喜爱。

如果你熟悉甚至已经在使用 Wechaty，那么你可以将 [wechaty-puppet-padlocal](https://github.com/padlocal/wechaty-puppet-padlocal) 作为 Wechaty 的 puppet 来使用，支持和其他 puppet 无缝切换。因为 wechaty-puppet-padlocal 是一个完整的 Wechaty puppet 实现，且由 padlocal-client-ts 提供技术支持。

![系统架构](https://user-images.githubusercontent.com/64943823/95648660-ad998f80-0b0b-11eb-8f75-16a6e64384b7.png)

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
* PadLocalClient.test.ts
* PadLocalClientApi.test.ts

## API
TODO:

## 设计理念

与其他一些 puppet 相比，PadLocal 在实现上最大的特点在于：
* 账号状态的托管方式
* 与 WeChatServer 的沟通方式

*拓扑图：*

![拓扑图](https://user-images.githubusercontent.com/64943823/95650055-a70f1600-0b13-11eb-88a0-108aa4481c47.png)

在其他 puppet 的实现中，托管账号状态由 puppet server 进行管理，所有请求都是通过 `puppet -> puppet server -> WeChatServer` 这样一条链路完成。同时 puppet 和 puppet server 之间建立长连接，用来进行消息推送。
这样的做法，在我们看来有几个潜在的风险：
1. 因为最终和 WeChatServer 通信的都是 puppet server。如果一个 puppet server 上托管了多个账号，且没有对各个账号配置对应的代理策略，那么这些账号将共享 puppet server 的 IP。从风控角度来看，容易产生风险。而且一旦其中某些账号风险等级比较高，容易对同一个 IP 池的其他账号造成污染，伤及无辜。
2. 所有流量都是通过 puppet server 转发，对其带宽产生了不小压力，特别是当托管账号中产生了大量图片、视频等多媒体资源时。
3. 由于 puppet server 维护了托管账号状态，所以 puppet server 是有状态的。从系统架构角度来看，有状态的服务器在系统稳定性、可用性、容量规划等方面都存在不小挑战。如果集群中某些服务器宕机，而备机切换机制设计不够完善的话，容易出现部分账号处于不可用的状态。  
4. 为了保证 puppet 有更好的可用性和体验，通常 puppet server 会缓存（不一定永久保存）某些数据（比如聊天数据）。也就是说，服务端无可避免地需要触碰托管账号的业务数据。这就需要 puppet 的提供者保持极高的行业自律，而且通过充分的机制保证客户数据的安全性。

基于以上一些问题的思考，我们将所有流量转发工作都放在了客户端来做，**这就是 PadLocal 中 Local 的来源**。我们利用 GRPC 支持双向通信这个机制，让客户端成为代理，并将所有流量通过客户端转发给 WeChatServer。同时由客户端来维持和 WeChatServer 之间的长连接。如此账号状态维护这样一个比较复杂的工作就在客户端完成，于是 PadLocal server 就可以设计为 stateless 的了，应对比如扩容等问题天然就会简单很多，simple is beautiful。 
