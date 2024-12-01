// app/communities/[communityId]/lives/page.tsx
import { getLivesList } from "@/app/lib/live/data";
import { LivesList } from "@/components/live-list";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function LivesPage({
  params: { communityId },
}: {
  params: { communityId: string };
}) {
  const lives = await getLivesList(communityId);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ライブ情報一覧</h1>
        <Link
          href={`/communities/${communityId}/lives/create`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          新規作成
        </Link>
      </div>

      {lives.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">登録されているライブ情報はありません</p>
        </div>
      ) : (
        <LivesList lives={lives} />
      )}
    </div>
  );
}