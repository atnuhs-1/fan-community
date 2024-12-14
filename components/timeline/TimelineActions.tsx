"use client";

import { MerchandiseStatus, PostType } from "@prisma/client";
import { CreatePostButton } from "./CreatePostButton";
import { CreatePostModal } from "./CreatePostModal";
import { useCreatePost } from "./useCreatePost";
import { processImage } from "@/lib/imageProcessor";
import { upload } from "@vercel/blob/client";
import { createPost } from "@/app/actions/posts";
import { SessionProvider } from "next-auth/react";

interface TimelineActionsProps {
  communityId: string;
  liveId?: string;
  performanceId?: string;
}

export function TimelineActions({
  communityId,
  liveId,
  performanceId,
}: TimelineActionsProps) {
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
    <SessionProvider>
      <CreatePostButton />
      <CreatePostModal
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        liveId={liveId}
        performanceId={performanceId}
      />
    </SessionProvider>
  );
}