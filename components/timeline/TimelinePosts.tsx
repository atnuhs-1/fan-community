import { TimelinePost } from "./TimelinePost";
import { prisma } from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export default async function TimelinePosts({
  communityId,
  liveId,
  performanceId,
}: {
  communityId: string;
  liveId?: string;
  performanceId?: string;
}) {
  
  noStore();

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
        },
      },
      images: {
        select: {
          id: true,
          url: true,
        },
      },
      live: {
        select: {
          id: true,
          title: true,
        },
      },
      performance: {
        select: {
          id: true,
          title: true,
          date: true,
          venue: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="divide-y">
      {posts.map((post) => (
        <TimelinePost key={post.id} post={post} />
      ))}
    </div>
  );
}
