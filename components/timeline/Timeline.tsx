"use client";

import { TimelineFilters } from "./TimelineFilters";
import { TimelinePost } from "./TimelinePost";
import type { Post, Live, Performance, PostType, MerchandiseStatus } from "@prisma/client";
import { useCreatePost } from "./useCreatePost";
import { createPost } from "@/app/actions/posts";
import { CreatePostButton } from "./CreatePostButton";
import { CreatePostModal } from "./CreatePostModal";
import { upload } from "@vercel/blob/client";
import { processImage } from "@/lib/imageProcessor";

interface TimelineProps {
  communityId: string;
  liveId?: string;
  performanceId?: string;
  posts: Array<{
    id: string;
    createdAt: Date;
    content: string;
    postType: PostType;
    author: {
      id: string;
      name: string | null;
      image: string | null;
    };
    images: Array<{
      id: string;
      url: string;
    }>;
    live: {
      id: string;
      title: string;
    } | null;
    performance: {
      id: string;
      title: string | null;
      date: Date;
      venue: string;
    } | null;
  }>;
  lives: Array<{
    id: string;
    title: string;
    performances: Array<{
      id: string;
      title: string | null;
      date: Date;
      venue: string;
    }>;
  }>;
}

export function Timeline({
  communityId,
  liveId,
  performanceId,
  posts,
  lives,
}: TimelineProps) {
  const { isOpen, closeModal } = useCreatePost();

  const handleSubmit = async (formData: {
    content: string;
    postType: PostType;
    merchandiseStatus?: MerchandiseStatus;
    images: File[];
  }) => {
    try {
      // 画像の処理とアップロード
      const imageUrls = await Promise.all(
        formData.images.map(async (file) => {
          // 画像を処理
          const processedBlob = await processImage(file);

          // ファイル名に圧縮済みであることを示す接尾辞を追加
          const fileName = `${file.name.split(".")[0]}_compressed.jpg`;

          // 処理済み画像をアップロード
          const blob = await upload(fileName, processedBlob, {
            access: "public",
            handleUploadUrl: "/api/upload",
          });

          return blob.url;
        })
      );

      // 投稿の作成
      await createPost({
        content: formData.content,
        postType: formData.postType,
        merchandiseStatus: formData.merchandiseStatus,
        images: imageUrls,
        communityId,
        liveId,
        performanceId,
      });

      closeModal();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div>
      <TimelineFilters communityId={communityId} lives={lives} />
      <div className="divide-y">
        {posts.map((post) => (
          <TimelinePost key={post.id} post={post} />
        ))}
      </div>
      <CreatePostButton />
      <CreatePostModal
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        liveId={liveId}
        performanceId={performanceId}
      />
    </div>
  );
}
