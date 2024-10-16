"use client";

import { Post } from "@/types/post";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Heart, MessageCircle, Repeat, Share2 } from "lucide-react";

export default function PostItem({ post }: { post: Post }) {

  return (
    <div className="px-4 border-t hover:bg-gray-50 transition-colors duration-200 ease-in-out">
      <div className="flex space-x-4 pt-4 pb-3">
        <Avatar className="h-9 w-9 flex rounded-full">
          <AvatarImage
            src={post.author.image ?? "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-bold text-md">{post.author.name || "匿名"} <span className="font-normal text-gray-500">{post.createdAt.toLocaleString('ja-JP')}</span></p>
          <p>{post.content}</p>
          <div className="flex justify-between mt-2 text-gray-500">
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4 mr-1"/>
              <span>0</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Repeat className="w-4 h-4 mr-1"/>
              <span>0</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-1"/>
              <span>0</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-1"/>
              <span>0</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
