# Nuxt SSR Firebase Sample

SSR モードの Nuxt.js アプリケーションを Firebase にホスティングするサンプル。

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