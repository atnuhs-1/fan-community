import { Suspense } from "react";
import { getPosts } from "@/app/actions/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

// ローディング状態のコンポーネント
function PostsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 p-4 border rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

// 投稿一覧を表示するコンポーネント
async function Posts({ communityId }: { communityId: string }) {
  const result = await getPosts(communityId);
  
  if (!result.success || !result.posts) {
    return (
      <div className="p-4 text-center text-red-500">
        投稿の取得に失敗しました
      </div>
    );
  }

  if (result.posts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        投稿はありません
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {result.posts.map((post) => (
        <div key={post.id} className="flex gap-4 p-4 border rounded-lg">
          <Avatar>
            <AvatarImage src={post.author.image ?? undefined} />
            <AvatarFallback>
              {post.author.name?.[0] ?? '?'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), { 
                  locale: ja,
                  addSuffix: true 
                })}
              </div>
            </div>
            <p className="mt-1">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// タイムラインセクションコンポーネント
export function TimelineSection({ communityId }: { communityId: string }) {
  return (
    <div className="p-6 space-y-4">
      <h2 className="font-semibold text-xl">タイムライン</h2>
      <Suspense fallback={<PostsSkeleton />}>
        <Posts communityId={communityId} />
      </Suspense>
    </div>
  );
}