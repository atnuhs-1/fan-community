import { fetchCommunityInfo } from "@/app/lib/community/data";
import { getLivesList } from "@/app/lib/live/data";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, MapPin, Info, SquareChartGantt } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { LiveType } from "@prisma/client";

// const tours = [
//   {
//     id: "1",
//     title: "ARTIST LIVE TOUR 2024",
//     description: "全国10都市で開催！",
//     startDate: "2024-04-01",
//     endDate: "2024-06-30",
//     eventCount: 10,
//   },
//   {
//     id: "1",
//     title: "ARTIST LIVE TOUR 2024",
//     description: "全国10都市で開催！",
//     startDate: "2024-04-01",
//     endDate: "2024-06-30",
//     eventCount: 10,
//   },
//   {
//     id: "1",
//     title: "ARTIST LIVE TOUR 2024",
//     description: "全国10都市で開催！",
//     startDate: "2024-04-01",
//     endDate: "2024-06-30",
//     eventCount: 10,
//   },
//   {
//     id: "1",
//     title: "ARTIST LIVE TOUR 2024",
//     description: "全国10都市で開催！",
//     startDate: "2024-04-01",
//     endDate: "2024-06-30",
//     eventCount: 10,
//   },
// ];

export default async function Page({
  params,
}: {
  params: { communityId: string };
}) {
  const { communityId } = params;
  const [community, lives] = await Promise.all([
    fetchCommunityInfo(communityId),
    getLivesList(communityId)
  ]);
  return (
    <div className="w-full h-full m-8 rounded-lg shadow-lg bg-white">
      <div className="p-6 space-y-6">
        <h1 className="font-bold text-3xl">{community.name}</h1>
        <p className="text-slate-700">{community.description}</p>
      </div>

      {/* タイムライン */}
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl">タイムライン</h2>
          <Link
            href={`/timeline/${communityId}`}
            className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <SquareChartGantt className="w-5 h-5" />
            タイムラインへ
          </Link>
        </div>

        <div className="h-32 p-4 shadow-inner shadow-gray-200 bg-white rounded-md">
          aa
        </div>
      </div>

      {/* ライブ情報 */}
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">ライブ情報</h1>

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
              <div
                key={live.id}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{live.title}</h2>
                    {live.description && (
                      <p className="text-gray-600 mt-1">{live.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                      {getLiveTypeLabel(live.liveType)}
                    </span>
                    <Link
                      href={`/live/${communityId}/${live.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      編集
                    </Link>
                  </div>
                </div>

                <div className="flex gap-6 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(live.startDate), "yyyy/MM/dd", { locale: ja })}
                    {" 〜 "}
                    {live.endDate && format(new Date(live.endDate), "yyyy/MM/dd", { locale: ja })}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    公演数: {live.performances.length}回
                  </div>
                </div>

                {/* 公演情報の詳細を表示（オプション） */}
                <div className="mt-4 pl-4 space-y-1">
                  {live.performances.map((performance) => (
                    <div key={performance.id} className="text-sm text-gray-600">
                      {format(new Date(performance.date), "yyyy/MM/dd (E)", { locale: ja })}
                      {" @ "}
                      {performance.venue}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <pre className="whitespace-pre-wrap break-all px-4 py-6">
        {JSON.stringify(community, null, 2)}
      </pre>
    </div>
  );
}

// LiveType のラベル変換関数
function getLiveTypeLabel(type: LiveType): string {
  const labels: Record<LiveType, string> = {
    TOUR: 'ツアー',
    SINGLE: '単発ライブ',
    FESTIVAL: 'フェス',
    STREAMING: '配信ライブ',
    FAN_MEETING: 'ファンミーティング',
    OTHER: 'その他'
  };
  return labels[type];
}