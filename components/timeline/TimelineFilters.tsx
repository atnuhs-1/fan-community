"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "lucide-react";

interface TimelineFiltersProps {
  communityId: string;
  lives: Array<{
    id: string;
    title: string;
    performances: Array<{
      id: string;
      title: string | null;
      date: Date;
      venue: string;
    }>;
  }>;
}

export function TimelineFilters({ communityId, lives }: TimelineFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLiveId = searchParams.get("liveId");
  const currentPerformanceId = searchParams.get("performanceId");

  const handleFilterChange = (
    liveId: string | null,
    performanceId: string | null
  ) => {
    const params = new URLSearchParams(searchParams);

    if (liveId) {
      params.set("liveId", liveId);
    } else {
      params.delete("liveId");
    }

    if (performanceId) {
      params.set("performanceId", performanceId);
    } else {
      params.delete("performanceId");
    }

    router.push(`/community/${communityId}/timeline?${params.toString()}`);
  };

  const selectedLive = currentLiveId
    ? lives.find((live) => live.id === currentLiveId)
    : null;

  return (
    <div className="sticky top-0 bg-white border-b z-10">
      {/* ライブフィルター */}
      <div className="p-4 flex items-center gap-2 overflow-x-auto hide-scrollbar">
        <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <button
          onClick={() => handleFilterChange(null, null)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
            !currentLiveId
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          すべて
        </button>
        {lives.map((live) => (
          <button
            key={live.id}
            onClick={() => handleFilterChange(live.id, null)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              currentLiveId === live.id && !currentPerformanceId
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {live.title}
          </button>
        ))}
      </div>

      {/* 選択されたライブの公演フィルター */}
      {selectedLive && selectedLive.performances.length > 0 && (
        <div className="px-4 pb-4 -mt-2 flex items-center gap-2 overflow-x-auto">
          {selectedLive.performances.map((performance) => (
            <button
              key={performance.id}
              onClick={() => handleFilterChange(currentLiveId, performance.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                currentPerformanceId === performance.id
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {`${performance.venue} (${new Date(
                performance.date
              ).toLocaleDateString("ja-JP", {
                month: "numeric",
                day: "numeric",
              })})`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
