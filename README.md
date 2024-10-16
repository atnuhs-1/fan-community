## コミュニティプラットフォーム（アプリ名未定、開発中）

#### アプリのリンク
https://fan-community.vercel.app/

アプリ画面
<img width="700" alt="あ" src="./docs/images/timeline.png">

##### 進捗
- コミュニティごとのタイムライン実装

### 概要

- ファンコミュニティごとにタイムラインを分けたSNS
- ノイズ（関係ない話）が交じることのないタイムラインで、アーティストの話をファン同士でシェアできる
- リアルタイムでファン同士が情報をシェアできるプラットフォーム
- Spotify連携による音楽体験の強化と共有

### 実装したい機能
1. **コミュニティ別タイムライン**
    - X（旧Twitter）ライクなインターフェースで各コミュニティの最新情報を表示
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

### 技術
- Next.js 14.2
- 認証
    - Next-auth 5.0.0-beta.21
- DB
    - Vercel Postgres
- ORM
    - Prisma
- デプロイ先
    - Vercel

### ER図
```mermaid
erDiagram
    User ||--o{ Account : has
    User ||--o{ Session : has
    User ||--o{ Post : creates
    User ||--o{ CommunityMember : belongs_to

    Community ||--o{ Post : contains
    Community ||--o{ CommunityMember : has

    CommunityMember }o--|| Community : belongs_to
    CommunityMember }o--|| User : is

    User {
        string id PK
        string name
        string email UK
        datetime emailVerified
        string image
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

    VerificationToken {
        string identifier
        string token UK
        datetime expires
    }

    Community {
        string id PK
        string name
        string description
        datetime createdAt
        datetime updatedAt
    }

    CommunityMember {
        string id PK
        string userId FK
        string communityId FK
        string role
        datetime joinedAt
    }

    Post {
        string id PK
        string content
        datetime createdAt
        datetime updatedAt
        string authorId FK
        string communityId FK
    }
```

### 問題
開発中に起きた問題はZennのスクラップに残していきます
[コミュニティプラットフォーム開発中に詰まったところ](https://zenn.dev/atnuhs/scraps/575baa55b1b80f)