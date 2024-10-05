import { NextResponse } from 'next/server';
import { prisma } from '@/db';

export async function POST(req: Request) {
  const { content, authorId, communityId } = await req.json();
  
  try {
    const post = await prisma.post.create({
      data: { content, authorId, communityId },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const communityId = searchParams.get('communityId');

  if (!communityId) {
    return NextResponse.json({ error: 'Community ID is required' }, { status: 400 });
  }
  
  try {
    const posts = await prisma.post.findMany({
      where: { communityId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}