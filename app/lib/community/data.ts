import { prisma } from "@/db"

export const fetchCommunityInfo = async (communityId: string) => {
  try {
    const community = await prisma.community.findUnique({
      where: {id: communityId}
    })
    return {
      success: true,
      id: community?.id,
      name: community?.name,
      description: community?.description,
      createdAt: community?.createdAt,
      updatedAt: community?.updatedAt
    };
  } catch (error) {
    console.log("コミュニティの取得に失敗しました: ", error);
    return { success: false, error: "コミュニティの取得に失敗しました" };
  }
}

