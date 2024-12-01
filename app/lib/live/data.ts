import { prisma } from "@/db"

// app/actions/live.ts
export async function getLivesList(communityId: string) {
  try {
    const lives = await prisma.live.findMany({
      where: {
        communityId: communityId,
      },
      include: {
        performances: {
          orderBy: {
            date: 'asc',
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    });
    
    return lives;
  } catch (error) {
    console.error("Failed to fetch lives:", error);
    throw new Error("ライブ情報の取得に失敗しました");
  }
}