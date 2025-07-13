# pullriku-blog

My tech blog created with [Astro](https://astro.build/).

- [Astro Docs](https://docs.astro.build)

## 記事を書く

`just new-article 記事ID`。消すときは`remove-article`。

### 画像

`src`以下ならどこでもいいが、以下にまとめている。
`/src/contents/images/posts/記事ID/`

### カバー画像

ファイル名は記事IDと同じにする。拡張子は以下の通り。
`/src/contents/images/posts/記事ID/記事ID.{png,jpg,jpeg,wep}`に配置する。

## 開発

### ディレクトリ構成

- docs: [Project Structure](https://docs.astro.build/en/basics/project-structure/)

### フォーマット

Biomeを使用する。

```sh
pnpm biome format --write .
```
