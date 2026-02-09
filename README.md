# 麺家弍色 SYSTEM CLOUD

## 会社情報

- **店舗名**: 麺家弍色
- **住所**: 〒080-0101 北海道河東郡音更町大通6-6
- **電話**: 070-2184-0992
- **Email**: 0hp2c84c787541j@ezweb.ne.jp
- **業種**: 飲食業

## ログイン情報

- **ユーザー名**: 麺家弍色
- **パスワード**: admin123

## システム構成

- **フロントエンド**: React + Vite
- **バックエンド**: Node.js + Express
- **データベース**: SQLite
- **認証**: JWT

## 機能一覧

### 📊 ホーム (ダッシュボード)
- 売上・支出の可視化
- 最近の活動
- リアルタイム更新

### 👥 顧客管理
- 顧客情報の登録・編集・削除
- 法人/個人の分類

### 📥 受注取引管理
- 受注取引一覧
- 受注取引一覧アップロード

### 📤 発注取引管理
- 発注データの作成・編集・削除
- 発注書の自動作成機能
- ステータス管理

### 📦 在庫管理
- 在庫の登録・編集・削除
- 在庫アラート機能
- 在庫移動履歴

### 📄 書類管理
- 見積書・発注書・納品書・請求書の作成
- プレビュー機能
- PDF出力機能

### 🏢 仕入先管理
- 仕入先情報の登録・編集

### 📚 会計帳簿
- 税額控除帳
- 請求判明書
- 現金出納簿
- キャッシュフロー計算書

## ローカル開発環境

### バックエンド
```bash
cd menya-nishiki-order-management-system
node server/index.js
# ポート: 10000
```

### フロントエンド
```bash
cd menya-nishiki-order-management-system
npm run dev
# ポート: 5173
```

## デプロイ

### Render (バックエンド)
1. https://render.com/ にアクセス
2. New → Web Service
3. リポジトリを選択
4. 設定:
   - Build Command: `npm install`
   - Start Command: `node server/index.js`
   - Environment Variables:
     - `NODE_ENV=production`
     - `PORT=10000`
     - `SERVE_FRONTEND=false`
     - `JWT_SECRET=menya-nishiki-secret-2026`

### Vercel (フロントエンド)
1. https://vercel.com/ にアクセス
2. New Project
3. リポジトリを選択
4. Environment Variables:
   - `VITE_API_URL`: https://your-backend-url.onrender.com/api
   - `NODE_ENV=production`
   - `VERCEL=1`

## サポート

システムに関するお問い合わせは、開発元までご連絡ください。
