import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { LiveCard } from "./live-card";
import { getLivesList } from "@/app/lib/live/data";

export async function LivesSection({ communityId }: { communityId: string }) {
  const lives = await getLivesList(communityId);
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">ライブ情報</h2>
        <Link
          href={`/live/${communityId}/create`}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5" />
          新規ツアー作成
        </Link>
      </div>

      <div className="grid gap-4">
        {lives.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">登録されているライブ情報はありません</p>
          </div>
        ) : (
          lives.map((live) => (
            <LiveCard
              key={live.id}
              {...live}
              communityId={communityId}
            />
          ))
        )}
      </div>
    </div>
  );
}