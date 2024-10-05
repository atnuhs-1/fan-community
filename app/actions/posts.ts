"use server";

import { auth } from "@/auth";
import { prisma } from "@/db";

export async function createPost(content: string, communityId: string) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const post = await prisma.post.create({
      data: { content, authorId: session.user.id, communityId },
      include: {
        // includeでauthor情報も一緒に取得できるようにしている
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return {
      success: true,
      post: {
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
        author: {
          name: post.author.name,
          image: post.author.image,
        }
      },
    };
  } catch (error) {
    console.error("Failed to create post: ", error);
    return { success: false, error: "Failed to create post" };
  }
}

export async function getPosts(communityId: string) {
  try {
    const posts = await prisma.post.findMany({
      where: { communityId },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      posts: posts.map((post) => ({
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
        author: {
          name: post.author.name,
          image: post.author.image,
        }
      })),
    };
  } catch (error) {
    console.log("Failed to fetch posts: ", error);
    return { success: false, error: "Failed to fetch posts" };
  }
}
