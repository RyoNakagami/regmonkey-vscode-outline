# Regmonkey Outline

- ドキュメントの折りたたみ可能なアウトラインツリービューを提供する Visual Studio Code 拡張機能です
- 見出しを階層的なツリー形式で表示することで、ファイルの構造を視覚化し、コンテンツ内の移動を容易にします

## 機能

- **インタラクティブなアウトラインビュー**: Explorer サイドバーで折りたたみ可能なツリー形式でドキュメントの構造を表示
- **自動更新**: ドキュメントの編集に応じてアウトラインが自動的に更新
- **クリックで移動**: アウトライン内の見出しをクリックすると、ファイル内の該当セクションに直接移動
- **マルチ言語サポート**: 以下を含む複数のファイルタイプに対応:
  - Markdown
  - Python
  - R
  - その他の言語も設定可能

## 必要要件

- Visual Studio Code バージョン 1.102.0 以上

## 拡張機能の設定

この拡張機能は以下の設定を提供します：

* `RegmonkeyOutline.availableLanguages`: アウトラインを有効にする言語IDをカンマ区切りで指定
  - デフォルト: `python`
  - 例: 追加の言語を有効にするには、カンマ区切りリストに追加: `python, R, javascript, typescript`

```json
"RegmonkeyOutline.availableLanguages": "quarto, python, R",
```


## 使用方法

1. サポートされているファイルタイプ（Python、R、その他設定された言語）を開く
2. Explorer サイドバーで "CustomOutline" ビューを探す
3. アウトライン内の見出しをクリックしてファイル内の該当セクションに移動
4. 矢印アイコンでセクションの展開/折りたたみ

この拡張機能は、ファイル内のMarkdownスタイルの見出し（##、###など）を自動的に検出し、ナビゲート可能なツリー構造を作成します。

## 既知の問題

- 現在はMarkdownスタイルの見出し（#で始まる）のみをサポート
- 見出しレベルは##から開始（単一の#見出しは含まれません）

## リリースノート

### 0.0.1

- 初回リリース
- デフォルトでPythonとRファイルをサポート
- 設定可能な言語サポート
- 自動更新するアウトラインビュー
- クリックによるナビゲーション機能

## 貢献

バグを見つけた場合や機能リクエストがありますか？GitHubリポジトリでissueを開いてください。

---

## 拡張機能の開発

### 拡張機能のビルド

1. リポジトリをクローン
2. `npm install` で依存関係をインストール
3. `F5` を押して開発モードで拡張機能を実行

### スクリプト

- `npm run compile`: 拡張機能のコンパイルとリント
- `npm run watch`: 開発中の変更監視
- `npm run package`: 配布用の拡張機能パッケージ作成
- `npm run test`: テストスイートの実行

VS Code拡張機能の開発についての詳細は以下をご覧ください：
- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [VS Code Extension API](https://code.visualstudio.com/api)
