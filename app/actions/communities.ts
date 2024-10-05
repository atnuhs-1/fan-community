"use server";

import { prisma } from "@/db";

type CreateCommunityResult = {
  success: boolean;
  community?: {
    id: string;
    name: string;
    description: string | null;
  };
  error?: string;
};

type getCommunityListResult = {
  success: boolean;
  
}

export async function createCommunity(
  name: string,
  description: string | null
): Promise<CreateCommunityResult> {
  try {
    const community = await prisma.community.create({
      data: {
        name,
        description,
      },
    });

    return {
      success: true,
      community: {
        id: community.id,
        name: community.name,
        description: community.description,
      },
    };
  } catch (error) {
    console.error("Failed to create community:", error);
    return { success: false, error: "Failed to create community" };
  }
}

export async function getCommunityList() {
  try {
    const communityList = await prisma.community.findMany({});
    return communityList;
  } catch (error) {
    console.error("Error fetching communities: ", error);
    throw new Error("Failed to fetch communities");
  } finally {
    await prisma.$disconnect;
  }
}
