"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "lucide-react";
import { useState, useTransition } from "react";

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
  const [isPending, startTransition] = useTransition();
  const [activeFilter, setActiveFilter] = useState<{
    liveId: string | null;
    performanceId: string | null;
  }>({
    liveId: searchParams.get("liveId"),
    performanceId: searchParams.get("performanceId"),
  });

  const handleFilterChange = (
    liveId: string | null,
    performanceId: string | null
  ) => {
    setActiveFilter({ liveId, performanceId });
    
    const params = new URLSearchParams(searchParams.toString());
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

    startTransition(() => {
      router.push(`/community/${communityId}/timeline?${params.toString()}`);
    });
  };

  const selectedLive = activeFilter.liveId
    ? lives.find((live) => live.id === activeFilter.liveId)
    : null;

  const getButtonState = (liveId: string | null, performanceId: string | null) => {
    const isActive = 
      activeFilter.liveId === liveId && 
      activeFilter.performanceId === performanceId;

    return {
      className: `px-4 py-2 rounded-full text-sm whitespace-nowrap relative ${
        isActive
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      } ${isPending ? "opacity-70" : ""}`,
      disabled: isPending,
    };
  };

  return (
    <div className="sticky top-0 bg-white border-b z-10">
      {/* ライブフィルター */}
      <div className="p-4 flex items-center gap-2 overflow-x-auto hide-scrollbar">
        <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <button
          onClick={() => handleFilterChange(null, null)}
          {...getButtonState(null, null)}
        >
          すべて
          {isPending && activeFilter.liveId === null && (
            <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse" />
          )}
        </button>
        {lives.map((live) => {
          const state = getButtonState(live.id, null);
          return (
            <button
              key={live.id}
              onClick={() => handleFilterChange(live.id, null)}
              {...state}
            >
              {live.title}
              {isPending && activeFilter.liveId === live.id && (
                <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* 選択されたライブの公演フィルター */}
      {selectedLive && selectedLive.performances.length > 0 && (
        <div className="px-4 pb-4 -mt-2 flex items-center gap-2 overflow-x-auto">
          {selectedLive.performances.map((performance) => {
            const state = getButtonState(activeFilter.liveId, performance.id);
            return (
              <button
                key={performance.id}
                onClick={() => 
                  handleFilterChange(activeFilter.liveId, performance.id)
                }
                {...state}
              >
                {`${performance.venue} (${new Date(
                  performance.date
                ).toLocaleDateString("ja-JP", {
                  month: "numeric",
                  day: "numeric",
                })})`}
                {isPending && activeFilter.performanceId === performance.id && (
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}