import { Suspense } from "react";
import { fetchCommunityInfo } from "@/app/lib/community/data";
import { getLivesList } from "@/app/lib/live/data";
import { CommunityHeader } from "@/components/community/community-header";
import { TimelineSection } from "@/components/community/timeline-posts";
import { LivesSection } from "@/components/community/lives-section";
import { Skeleton } from "@/components/ui/skeleton";
import TimelineNavigationList from "@/components/community/timeline-list";

function LivesSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: { communityId: string };
}) {
  const { communityId } = params;
  const community = await fetchCommunityInfo(communityId);
  const liveList = await getLivesList(communityId);

  return (
    <div className="w-full h-full rounded-lg shadow-lg bg-white">
      <CommunityHeader
        name={community.name}
        description={community.description}
      />
      <TimelineNavigationList communityId={params.communityId} liveList={liveList}/>
      <TimelineSection communityId={communityId} />
      <Suspense fallback={<LivesSkeleton />}>
        <LivesSection communityId={communityId} />
      </Suspense>
    </div>
  );
}