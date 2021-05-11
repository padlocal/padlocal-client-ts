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

当然 padlocal-client-ts 也支持直接单独使用。我们为你提供了一个可以快速开始的 [demo 项目](https://github.com/padlocal/padlocal-client-ts-demo)。

1. 安装 node https://nodejs.org/en/
2. 下载 demo 项目并安装依赖
```sh
$ git clone git@github.com:padlocal/padlocal-client-ts-demo.git

$ cd padlocal-client-ts-demo
$ npm install
```
将你的 PadLocal token 配置在代码 `main.ts` 中
```ts
  ////////////////// 在这里填入你的 PadLocal Token //////////////////
  const token: string = "puppet_padlocal_xxx";
  ////////////////////////////////////////////////////////////////
```
3. 运行 demo

```sh
$ npm run demo
```
命令行中则会出现二维码，然后扫码登录即可。
```
00:00:00 INFO
      ============================================================
                    Welcome to padlocal-client-ts !
                           version: 0.2.32
      ============================================================

start login
start login with type:  0

▼▼▼ Please scan following qr code to login ▼▼▼

▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▄▄████ █▄▄ ▄▀█ ▄▄▄▄▄ █
█ █   █ █ ▀█ ▄ ▀  █▄ ▀█ █   █ █
█ █▄▄▄█ █▄ ▄▄▀ ██ ██ ▀█ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄▀▄▀▄█▄▀▄▀ ▀▄█▄▄▄▄▄▄▄█
█▄▄ ▄██▄█ ▀████▀█▀▄ ▀█ ▀▀ ▄▄█ █
█▄▄ █▀ ▄▀ ██▀▀  █▀▄▀▀▀▄▄█▀▀▄▄▀█
█ █ ▀█▀▄ ▀ ▀ █▄█▄  ▀ █▄▀██▄▄▀▀█
█▄ ▄▀█▀▄█▄ ██ ▄█▀▀██   ▀██▄▄ ▄█
█▄ █▀  ▄▀▄  ▄▀ █ ██▀▄  █▀▄█▀ ██
█ ▄▄▄▄▄ ██▄ ▄▄▀▄████▄ █▄█ ▄█ ██
█ █   █ █▀▀ ▀ ▀▄█▀▀▀█▄ ▄    ▄ █
█ █▄▄▄█ █  ▄ ██ ▀▄▄▀█  █ ▀▀▄▀▄█
█▄▄▄▄▄▄▄█▄█▄███▄▄█▄▄█▄▄█████▄██
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
