import { prisma } from "@/db";
import { Timeline } from "@/components/timeline/Timeline";

interface TimelinePageProps {
  params: { communityId: string };
  searchParams: {
    liveId?: string;
    performanceId?: string;
  };
}

export default async function TimelinePage({ 
  params: { communityId }, 
  searchParams: { liveId, performanceId } 
}: TimelinePageProps) {
  // ライブ情報の取得
  const lives = await prisma.live.findMany({
    where: { communityId },
    select: {
      id: true,
      title: true,
      performances: {
        select: {
          id: true,
          title: true,
          date: true,
          venue: true
        }
      }
    }
  });

  // 投稿の取得
  const posts = await prisma.post.findMany({
    where: {
      communityId,
      ...(liveId && { liveId }),
      ...(performanceId && { performanceId }),
    },
    select: {
      id: true,
      createdAt: true,
      content: true,
      postType: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        }
      },
      images: {
        select: {
          id: true,
          url: true,
        }
      },
      live: {
        select: {
          id: true,
          title: true,
        }
      },
      performance: {
        select: {
          id: true,
          title: true,
          date: true,
          venue: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  return (
    <div className="w-full h-full rounded-lg shadow-lg bg-white">
      <Timeline 
        communityId={communityId}
        liveId={liveId}
        performanceId={performanceId}
        posts={posts}
        lives={lives}
      />
    </div>
  );
}