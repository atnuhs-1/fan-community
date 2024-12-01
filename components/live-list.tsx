// app/communities/[communityId]/lives/lives-list.tsx
"use client";

import { LiveType } from "@prisma/client";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

type LiveWithPerformances = {
  id: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  liveType: LiveType;
  performances: {
    id: string;
    date: Date;
    venue: string;
  }[];
};

export function LivesList({ lives }: { lives: LiveWithPerformances[] }) {
  return (
    <div className="space-y-6">
      {lives.map((live) => (
        <div
          key={live.id}
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold">{live.title}</h2>
              <p className="text-sm text-gray-600 mt-1">
                {format(new Date(live.startDate), "yyyy年M月d日", { locale: ja })}
                {" - "}
                {live.endDate && format(new Date(live.endDate), "yyyy/MM/dd", { locale: ja })}
              </p>
            </div>
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
              {getLiveTypeLabel(live.liveType)}
            </span>
          </div>

          {live.description && (
            <p className="text-gray-700 mb-4">{live.description}</p>
          )}

          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-2">公演スケジュール</h3>
            <div className="grid gap-2">
              {live.performances.map((performance) => (
                <div
                  key={performance.id}
                  className="flex items-center gap-4 text-sm"
                >
                  <span className="text-gray-600">
                    {format(new Date(performance.date), "M/d (E)", {
                      locale: ja,
                    })}
                  </span>
                  <span>{performance.venue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

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