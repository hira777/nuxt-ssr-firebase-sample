# Nuxt SSR Firebase Sample

SSR モードの Nuxt.js アプリケーションを Firebase にホスティングするサンプル。

以下のように Cloud Functions と Firebase Hosting を利用して、SSR ができる。

[Cloud Functions を使用した動的コンテンツの配信とマイクロサービスのホスティング
](https://firebase.google.com/docs/hosting/functions?hl=ja)

## ホスティングするまでのセットアップ

### 1. インストールしていなければ Firebase CLI と Yarn をインストール

```bash
$ npm install -g firebase-tools
$ npm install -g yarn
```

### 2. Firebase のプロジェクトを作成

既存のプロジェクトがあればそれを利用しても良いが、プロジェクト設定によっては動作しない可能性もあるため注意。

### 3. Firebase のアカウントにログイン

```bash
$ firebase login
```

### 4. プロジェクトエイリアスを追加（ディレクトリとプロジェクトを紐づける）

```bash
$ firebase use --add
# 作成済みのプロジェクト一覧が表示されるので、
# 紐づけたいプロジェクトを選択し、エイリアス名をつける
# エイリアスを追加できれば .firebaserc が生成される。
```

## デプロイ

```bash
$ yarn deploy
```

## ローカルでの動作確認

```bash
$ yarn serve
```

## SSR をするための設定

以下は今回のサンプルで利用している`firebase.json`（ホスティングの設定ファイル）。

```json
{
  "hosting": {
    // Firebase Hosting にデプロイするディレクトリ
    "public": "dist/client",
    // リライトの設定。リライトを設定すれば以下のようなことができる。
    // - 複数の URL で同じコンテンツを表示する
    // - パターンに一致する URL を受け取って、クライアント側コードで表示内容を決定する
    "rewrites": [
      {
        // function を指定することで、Firebase Hosting の URL から Cloud Functions を提供できる
        // 今回の場合、拡張子が .js、.ico、.json 以外の存在しないファイル
        // またはディレクトリへのリクエストに対して`ssr`関数を実行する
        "source": "!/**/*.@(js|ico|json)",
        "function": "ssr"
      }
    ]
  },
  "functions": {
    // デプロイされるディレクトリ。デフォルトは`functions`
    "source": "dist/server"
  }
}
```

`rewrites`を指定することで、特定の URL のリクエストで Clound Function（`ssr`関数）が実行されるようにできる。

今回実行される`ssr`関数は、`yarn build`で出力される`dist/server/index.js`で定義されている`ssr`関数のこと。

```js
const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');
const app = express();

const config = {
  dev: false,
  buildDir: '.nuxt',
  build: {
    publicPath: '/assets/'
  }
};
const nuxt = new Nuxt(config);

app.use((_, res, next) => {
  // https://firebase.google.com/docs/hosting/manage-cache?hl=ja
  res.set('Cache-Control', 'public, max-age=10, s-maxage=10');
  next();
});
app.use(nuxt.render);
exports.ssr = functions.https.onRequest(app);
```