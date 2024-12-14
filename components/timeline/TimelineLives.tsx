import { prisma } from "@/db";
import { TimelineFilters } from "./TimelineFilters";

export default async function TimelineLives({communityId}: {communityId: string}) {
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
          venue: true,
        },
      },
    },
  })

  return <TimelineFilters communityId={communityId} lives={lives} />;
}