"use client";
import { getLivesList } from "@/app/lib/live/data";
import { Button } from "../ui/button";
import Link from "next/link";
import { TimelineNavigationCard } from "./timeline-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LiveWithPerformances } from "@/types/live";


interface TimelineNavigationListProps {
  communityId: string;
  liveList: LiveWithPerformances[];
  title?: string;
}

export default function TimelineNavigationList({
  communityId,
  liveList,
  title = "公演別タイムライン",
}: TimelineNavigationListProps) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // 初期表示時にもチェック
      checkScroll();
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction * 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-8 ps-8 pt-4 pb-1 pe-8">
        <h2 className="flex w-full overflow-hidden font-semibold text-xl">
          {title}
        </h2>
        <Link href={`/community/${communityId}/timeline`} className="flex">
          <Button className="py-1" size="sm">
            すべての投稿
          </Button>
        </Link>
      </div>

      {liveList.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">
            ライブ・イベントがまだ登録されていません
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* 左矢印 */}
          {showLeftArrow && (
            <button
              onClick={() => scroll(-1)}
              className="absolute left-0 top-1/4 -translate-y-1/2 bg-background/80 p-2 rounded-full shadow-lg z-10 hover:bg-background transition-colors"
              aria-label="左にスクロール"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="overflow-y-hidden overflow-x-scroll hide-scrollbar px-8 py-2 pb-5 pt-1"
          >
            <ul className="flex w-fit flex-row">
              {liveList.map((live) => (
                <li key={live.id} className="mr-4 lg:mr-5">
                  <TimelineNavigationCard
                    live={live}
                    communityId={communityId}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* 右矢印 */}
          {showRightArrow && (
            <button
              onClick={() => scroll(1)}
              className="absolute right-0 top-1/4 -translate-y-1/2 bg-background/80 p-2 rounded-full shadow-lg z-10 hover:bg-background transition-colors"
              aria-label="右にスクロール"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}