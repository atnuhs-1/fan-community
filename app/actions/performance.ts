import { prisma } from "@/db";

export async function getPerformanceList() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const performanceList = await prisma.performance.findMany({
      where: {
        date: {
          gte: today
        }
      },
      include: {
        live: {
          select: {
            id: true,
            title: true,
            communityId: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    return performanceList;
  } catch (error) {
    console.error("Error fetching performances: ", error);
    throw new Error("Failed to fetch performances");
  } finally {
    await prisma.$disconnect;
  }
}