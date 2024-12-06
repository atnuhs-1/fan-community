import {
  Post,
  User,
  Image as PrismaImage,
  Live,
  Performance,
  PostType,
} from "@prisma/client";
import { User as UserIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TimelinePostProps {
  post: {
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
}

}

export function TimelinePost({ post }: TimelinePostProps) {
  // 投稿タイプに応じたバッジの設定
  const getPostTypeBadge = () => {
    switch (post.postType) {
      case "LIVE_INFO":
        return {
          bg: "bg-purple-100",
          text: "text-purple-700",
          label: "ライブ情報",
        };
      case "MERCH_STATUS":
        return {
          bg: "bg-orange-100",
          text: "text-orange-700",
          label: "物販情報",
        };
      default:
        return null;
    }
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const badge = getPostTypeBadge();

  // 画像クリック時のハンドラー
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="p-4">
      <div className="flex items-start gap-4">
        {/* ユーザーアバター */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          {post.author.image ? (
            <img
              src={post.author.image}
              alt={post.author.name || ""}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <UserIcon className="w-6 h-6 text-gray-400" />
          )}
        </div>

        {/* 投稿内容 */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{post.author.name}</span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: ja,
              })}
            </span>
          </div>

          {/* 投稿タイプバッジ */}
          {badge && (
            <div className="mt-1">
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${badge.bg} ${badge.text}`}
              >
                {badge.label}
              </span>
            </div>
          )}

          {/* 関連ライブ・公演情報 */}
          {post.live && (
            <div className="mt-1 text-sm text-gray-500">
              {post.live.title}
              {post.performance && ` - ${post.performance.venue}`}
            </div>
          )}

          {/* 投稿本文 */}
          <p className="mt-2 text-gray-800">{post.content}</p>

          {/* 画像表示 */}
          {post.images.length > 0 && (
            <div className="mt-2 grid gap-2 grid-cols-2">
              {post.images.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt=""
                  className="rounded-lg w-full h-auto cursor-pointer"
                  onClick={() => handleImageClick(image.url)}
                />
              ))}
            </div>
          )}

          {/* 画像モーダル */}
          <Dialog
            open={!!selectedImage}
            onOpenChange={() => setSelectedImage(null)}
          >
            <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
              {selectedImage && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={selectedImage}
                    alt=""
                    className="max-w-full max-h-[90vh] object-contain"
                    onClick={() => setSelectedImage(null)}
                  />
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
