// export const dynamic = 'force-dynamic';
import { Suspense } from "react";
import { TimelineFiltersSkeleton, TimelinePostSkeleton } from "./loading";
import TimelineLives from "@/components/timeline/TimelineLives";
import TimelinePosts from "@/components/timeline/TimelinePosts";
import { TimelineActions } from "@/components/timeline/TimelineActions";

interface TimelinePageProps {
  params: { communityId: string };
  searchParams: {
    liveId?: string;
    performanceId?: string;
  };
}

export default async function TimelinePage({
  params: { communityId },
  searchParams: { liveId, performanceId },
}: TimelinePageProps) {
  return (
    <div className="w-full h-full rounded-lg shadow-lg bg-white">
      <Suspense fallback={<TimelineFiltersSkeleton />}>
        <TimelineLives communityId={communityId} />
        {/* LivesとFiltersを含むコンポーネント */}
      </Suspense>
      <Suspense fallback={<TimelinePostSkeleton />}>
        <TimelinePosts
          communityId={communityId}
          liveId={liveId}
          performanceId={performanceId}
        />
      </Suspense>
      <TimelineActions communityId={communityId} />
      {/* URLパラメータを内部で取得 */}
    </div>
  );
}
