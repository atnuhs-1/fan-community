"use client";

import { Plus } from "lucide-react";
import { useCreatePost } from "./useCreatePost"; // 後で実装

export function CreatePostButton() {
  const { openModal } = useCreatePost();

  return (
    <button
      onClick={openModal}
      className="fixed right-4 bottom-4  p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      aria-label="投稿を作成"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}