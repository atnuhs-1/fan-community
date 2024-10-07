'use server'

import { auth } from '@/auth';
import {prisma} from '@/db';

export async function joinCommunity(communityId: string) {
  const session = await auth();
  const userId = session?.user.id;

  if(!userId) {
    return {
      success: false,
      error: "Not Authenticated"
    }
  } 

  try {
    const communityMember = await prisma.communityMember.create({
      data: { userId, communityId },
      include: {
        // includeでauthor情報も一緒に取得できるようにしている
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return { success: true, communityMember };
  } catch (error) {
    console.log("error", error);
    return { success: false, error: 'Failed to join community' };
  }
}

export async function getCommunityMembers(communityId: string) {
  try {
    const members = await prisma.communityMember.findMany({
      where: { communityId },
      include: { user: true },
    });
    return { success: true, members };
  } catch (error) {
    return { success: false, error: 'Failed to fetch community members' };
  }
}