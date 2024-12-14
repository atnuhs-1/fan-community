import { Suspense } from 'react';
import { TimelineFilters } from "./TimelineFilters";
import { TimelinePost } from "./TimelinePost";
import { TimelineActions } from "./TimelineActions";
import type { Post, Live, PostType } from "@prisma/client";
import { TimelinePostSkeleton } from "@/app/community/[communityId]/timeline/loading";

interface TimelineRootProps {
  communityId: string;
  liveId?: string;
  performanceId?: string;
  posts: Array<{
    id: string;
    createdAt: Date;
    content: string;
    postType: PostType;
    author: {
      id: string;
      name: string | null;
      image: string | null;
    };
    images: Array<{
      id: string;
      url: string;
    }>;
    live: {
      id: string;
      title: string;
    } | null;
    performance: {
      id: string;
      title: string | null;
      date: Date;
      venue: string;
    } | null;
  }>;
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

export function TimelineRoot({
  communityId,
  liveId,
  performanceId,
  posts,
  lives,
}: TimelineRootProps) {
  return (
    <div>
      <TimelineFilters communityId={communityId} lives={lives} />
      <Suspense
        fallback={
          <div className="divide-y">
            {[...Array(5)].map((_, i) => (
              <TimelinePostSkeleton key={i} />
            ))}
          </div>
        }
      >
        <div className="divide-y">
          {posts.map((post) => (
            <TimelinePost key={post.id} post={post} />
          ))}
        </div>
      </Suspense>
      <TimelineActions
        communityId={communityId}
        liveId={liveId}
        performanceId={performanceId}
      />
    </div>
  );
}