"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, X } from "lucide-react";
import { PostType, MerchandiseStatus } from "@prisma/client";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PostFormData) => Promise<void>;
  liveId?: string;
  performanceId?: string;
}

interface PostFormData {
  content: string;
  postType: PostType;
  merchandiseStatus?: MerchandiseStatus;
  images: File[];
}

export function CreatePostModal({
  isOpen,
  onClose,
  onSubmit,
  liveId,
  performanceId,
}: CreatePostModalProps) {
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState<PostType>("GENERAL");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);

      // プレビュー用のURLを作成
      const previews = await Promise.all(
        files.map(async (file) => {
          if (file.type === "image/heic" || file.type === "image/heif") {
            // HEICの場合は変換してプレビュー
            const heic2any = (await import("heic2any")).default;
            const convertedBlob = await heic2any({
              blob: file,
              toType: "image/jpeg",
              quality: 0.8,
            });
            return URL.createObjectURL(
              Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob
            );
          } else {
            // 通常の画像の場合はそのままプレビュー
            return URL.createObjectURL(file);
          }
        })
      );
      setImagePreviews(previews);
    }
  };

  // 投稿のコンテキストを表示
  const getContextMessage = () => {
    if (liveId && performanceId) {
      return "この公演に関する投稿を作成";
    } else if (liveId) {
      return "このライブに関する投稿を作成";
    }
    return "投稿を作成";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        content,
        postType,
        images,
      });
      onClose();
      setContent("");
      setPostType("GENERAL");
      setImages([]);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setImages(Array.from(e.target.files));
  //   }
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getContextMessage()}</DialogTitle>
        </DialogHeader>

        {/* 投稿のコンテキストを視覚的に表示 */}
        {(liveId || performanceId) && (
          <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
            投稿先: {liveId ? "ライブページ" : "コミュニティページ"}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="flex gap-2">
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value as PostType)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="GENERAL">一般</option>
                <option value="LIVE_INFO">ライブ情報</option>
                <option value="MERCH_STATUS">物販情報</option>
              </select>
            </div>

            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="投稿内容を入力..."
              className="min-h-[100px]"
            />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="images"
                  className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <Image className="w-5 h-5" />
                  画像を追加
                </label>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/gif,image/heic,image/heif"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </div>

              {images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {imagePreviews.map((previewUrl, index) => (
                    <div key={index} className="relative">
                      <img
                        src={previewUrl}
                        alt=""
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          URL.revokeObjectURL(imagePreviews[index]); // メモリリーク防止
                          setImages(images.filter((_, i) => i !== index));
                          setImagePreviews(
                            imagePreviews.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting || !content.trim()}>
              {isSubmitting ? "投稿中..." : "投稿する"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
