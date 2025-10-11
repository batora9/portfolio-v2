---
title: ConnectRPCを使ったスキーマ駆動開発ハンズオン
createdAt: '2025-09-07'
updatedAt: '2025-10-11'
description: '長期インターンでConnectRPCを使ったスキーマ駆動開発を経験したので、備忘録がてら記事にまとめてみました。'
published: true
---

# 実装してみる

ConnectRPCを使って、APIキーを用いた認証を行う簡単なサーバーを実装してみます。

サーバーサイドはNode.js(TypeScript)を採用します。ConnectRPCの公式サイトに簡単な導入方法が記載されていますのでそちらも参考にしてみてください。

https://connectrpc.com/docs/node/getting-started

## 実行環境

- Ubuntu 22.04
- Node.js v24.7.0

余談：Node.jsはv23.6.0からts-nodeやtsxなどのトランスパイラを介さずとも、直接TypeScriptを実行できるようになりました

## セットアップ

```bash
mkdir api-auth-example
cd api-auth-example
npm init -y
npm install typescript
npx tsc --init
npm install @bufbuild/buf @bufbuild/protobuf @bufbuild/protoc-gen-es @connectrpc/connect
```

## protobufの定義

`./schema/app/v1`ディレクトリを作成し、その中に`app.proto`ファイルを作成します。

```protobuf
syntax = "proto3";

package app.v1;

message PostRequest {
  string name = 1;
}

message PostResponse {
  string message = 1;
}

service PostService {
  rpc Post(PostRequest) returns (PostResponse) {}
}
```

## スキーマ定義ファイルからコード生成

`./schema`ディレクトリに`buf.yaml`ファイルを作成します。

```yaml
version: v2
modules:
  - path: .
lint:
  use:
    - STANDARD
breaking:
  use:
    - FILE
```

`./schema`ディレクトリに`buf.gen.yaml`ファイルを作成します。

```yaml
version: v2
plugins:
  - remote: buf.build/connectrpc/es
    out: gen
    opt:
      - target=ts
```

`./schema`ディレクトリに移動し、以下のコマンドを実行します。

```bash
buf generate
```

`./schema/app/v1`ディレクトリに`app_connect.ts`と`app_pb.ts`の2つのファイルが生成されます。

## サーバーの実装

作業ディレクトリで`server.ts`ファイルを作成し、以下のコードを記述します。

```typescript
import http from "http";
import { connectNodeAdapter } from "@connectrpc/connect-node";
import { Code, ConnectError, type ConnectRouter, type Interceptor } from "@connectrpc/connect";
import { PostService } from "./schema/gen/app/v1/app_pb.ts";
import dotenv from "dotenv";

dotenv.config();

const authInterceptor: Interceptor = (next) => async (req) => {
  const expectedApiKey = process.env.API_KEY;
  if (!expectedApiKey) {
    throw new ConnectError('API key not configured on server', Code.Internal);
  }
  const authHeader = req.header.get('authorization');
  if (!authHeader) {
    throw new ConnectError(
      'Authorization header is required',
      Code.Unauthenticated,
    );
  }
  // ヘッダーが "Bearer <API_KEY>" の形式であることを確認
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring('Bearer '.length);
    if (token !== expectedApiKey) {
      throw new ConnectError('Invalid API key', Code.Unauthenticated);
    }
  } else {
    throw new ConnectError(
      'Invalid authorization scheme',
      Code.Unauthenticated,
    );
  }
  return await next(req);
};

const routes = (router: ConnectRouter) => {
  router.service(PostService, {
    post: async (req) => {
      const name = req.name;
      console.log("Received name:", name);
      return { message: `Hello, ${name}!` };
    },
  });
}

const adapter = connectNodeAdapter({
  routes,
  interceptors: [authInterceptor],
});
const server = http.createServer(adapter);
server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
```

## APIキーの設定

作業ディレクトリに`.env`ファイルを作成し、以下の内容を記述します。

```plaintext
API_KEY=your_api_key_here # ここに任意のAPIキーを設定
```

APIキーは他人に知られないようにランダムな文字列を設定してください。

## 動作確認

サーバーを起動します。

```bash
node server.ts
```

curlコマンドを使って、APIキーを用いたリクエストを送信します。

```bash
curl -X POST http://localhost:8080/app.v1.PostService/Post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d '{"name": "batora9"}'
```

![curlコマンドを使った接続テスト](/images/connectrpc-intro/connect-test.png)

`{"message":"Hello, batora9!"}`というレスポンスが返ってきたので成功です。
