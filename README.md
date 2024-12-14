## FanSync

#### リンク
https://fan-community.vercel.app/

アプリ画面

<img width="700" alt="あ" src="./docs/images/home.png">
<img width="700" alt="あ" src="./docs/images/timeline.png">

### 概要

- ファン同士がライブ・イベント情報をリアルタイムに共有できるプラットフォーム
- アーティストごとのコミュニティで、より充実したファン体験を実現
- Spotify連携による音楽体験の強化と共有

### 実装予定の機能
1. **コミュニティ・ライブ別タイムライン**
    - コミュニティに関する情報やライブ・公演の情報を投稿するタイムライン
2. **ライブイベント情報ハブ**
    - 会場アクセス情報
    - グッズ販売状況のリアルタイム更新
    - 入場列の現況レポート
3. **ユーザープロフィール**
    - 推しアーティスト設定
    - 参加コミュニティの管理
4. **Spotify連携機能**
    - ユーザーの再生履歴表示
    - トップトラックとトップアーティストの表示
    - プレイリストの共同編集機能
5. **音楽データ共有**
    - Spotifyのデータを基にした音楽趣味の可視化
    - コミュニティ内での音楽傾向分析
6. **アーティスト情報データベース**
    - Wikipediaのように誰でも編集できる

### 技術スタック
- Next.js 14.2
- 認証
    - Next-auth 5.0.0-beta.21
- DB
    - Vercel Postgres
- ORM
    - Prisma
- デプロイ先
    - Vercel

### DB
```mermaid
erDiagram
    User ||--o{ Account : has
    User ||--o{ Session : has
    User ||--o{ Post : writes
    User ||--o{ CommunityMember : has

    Community ||--o{ CommunityMember : has
    Community ||--o{ Post : contains
    Community ||--o{ Live : has

    Post ||--o{ Image : has
    
    Live ||--o{ Performance : has

    User {
        string id PK
        string name
        string email UK
        datetime emailVerified
        string image
        enum role
        boolean isProfileComplete
    }

    Account {
        string id PK
        string userId FK
        string type
        string provider
        string providerAccountId
        string refresh_token
        string access_token
        int expires_at
        string token_type
        string scope
        string id_token
        string session_state
    }

    Session {
        string id PK
        string sessionToken UK
        string userId FK
        datetime expires
    }

    Community {
        string id PK
        string name UK
        string description
        datetime createdAt
        datetime updatedAt
    }

    CommunityMember {
        string id PK
        string userId FK
        string communityId FK
        enum role
        datetime joinedAt
    }

    Post {
        string id PK
        string content
        enum postType
        enum merchandiseStatus
        datetime createdAt
        datetime updatedAt
        string authorId FK
        string communityId FK
    }

    Image {
        string id PK
        string url
        string postId FK
        datetime createdAt
    }

    Live {
        string id PK
        string title
        string description
        datetime startDate
        datetime endDate
        enum liveType
        string communityId FK
        datetime createdAt
        datetime updatedAt
    }

    Performance {
        string id PK
        string title
        datetime date
        string venue
        enum status
        string liveId FK
        datetime createdAt
        datetime updatedAt
    }

    VerificationToken {
        string identifier
        string token UK
        datetime expires
    }
```

### 問題
開発中に起きた問題はZennのスクラップに残していきます
[コミュニティプラットフォーム開発中に詰まったところ](https://zenn.dev/atnuhs/scraps/575baa55b1b80f)