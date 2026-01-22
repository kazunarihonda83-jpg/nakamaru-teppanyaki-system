# 鉄板焼き居酒屋なかまる 受発注管理システム

## 会社情報

- **店舗名**: 鉄板焼き居酒屋なかまる
- **住所**: 〒252-0241 神奈川県相模原市中央区横山台2-9-8コーポ栗山103
- **電話**: 042-704-9657
- **Email**: takui.n@icloud.com
- **食べログ**: https://tabelog.com/kanagawa/A1407/A140701/14058526/

## ログイン情報

- **ユーザー名**: 鉄板焼き居酒屋なかまる
- **パスワード**: admin123

## ローカル開発環境

### バックエンド
```bash
cd nakamaru-order-management-system
node server/index.js
# ポート: 5001
```

### フロントエンド
```bash
cd nakamaru-order-management-system
npm run dev
# ポート: 3002
```

## アクセスURL

- **開発環境**: https://3002-iwz00ie3gdkhvxpx2ni1z-82b888ba.sandbox.novita.ai

## 機能一覧

### 📄 書類管理
- 見積書・発注書・納品書・請求書の作成
- プレビュー機能
- PDF出力機能
- 有効期限フィールド

### 📦 発注管理
- 発注データの作成・編集・削除
- 発注書の自動作成機能
- ステータス管理（発注済み・納品済み）

### 📊 在庫管理
- 在庫の登録・編集・削除
- 在庫アラート機能
- 在庫移動履歴

### 💰 会計管理
- 損益計算書
- 貸借対照表
- 仕訳データ管理

### 👥 顧客管理
- 顧客情報の登録・編集

### 🏢 仕入先管理
- 仕入先情報の登録・編集

### 📈 ダッシュボード
- 売上・支出の可視化
- 最近の書類・発注データ
- リアルタイム更新

## デプロイ

### Render (バックエンド)
1. https://render.com/ にアクセス
2. New → Web Service
3. リポジトリを選択
4. 設定:
   - Build Command: `npm install`
   - Start Command: `node server/index.js`
   - Environment Variables: `PORT=5001`

### Vercel (フロントエンド)
1. https://vercel.com/ にアクセス
2. New Project
3. リポジトリを選択
4. Environment Variables:
   - `VITE_API_URL`: https://your-backend-url.onrender.com/api

## システム構成

- **フロントエンド**: React + Vite
- **バックエンド**: Node.js + Express
- **データベース**: SQLite
- **認証**: JWT

## サポート

システムに関するお問い合わせは、開発元までご連絡ください。
