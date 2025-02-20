import { Suspense } from "react";
import { getPosts } from "@/app/actions/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { SquareChartGantt } from "lucide-react";

function PostsSkeleton() {
  return (
    <div className="">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 p-2 border bg-white rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

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
      <div className="p-4 text-center text-gray-500">投稿はありません</div>
    );
  }

  return (
    <div className="">
      {result.posts.map((post) => (
        <div
          key={post.id}
          className="flex gap-4 p-2 border rounded-lg bg-white"
        >
          <Avatar>
            <AvatarImage src={post.author.image ?? undefined} />
            <AvatarFallback>{post.author.name?.[0] ?? "?"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), {
                  locale: ja,
                  addSuffix: true,
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

export function TimelineSection({ communityId }: { communityId: string }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between px-8">
        <h2 className="font-semibold text-xl">タイムライン</h2>
        <Link href={`/community/${communityId}/timeline`} className="flex items-center gap-2 bg-slate-800 text-white px-2 py-1 rounded-lg hover:bg-blue-700">
          <SquareChartGantt  className="w-5 h-5"/>
          タイムラインへ
        </Link>
      </div>

      <div className="h-[300px] overflow-y-auto shadow-inner rounded-lg bg-gray-50 mx-8 p-1">
        <Suspense fallback={<PostsSkeleton />}>
          <Posts communityId={communityId} />
        </Suspense>
      </div>
    </div>
  );
}
