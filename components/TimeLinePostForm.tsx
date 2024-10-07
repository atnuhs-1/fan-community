"use client";

import { useState } from "react";
import { createPost } from "@/app/actions/posts";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

type TimeLinePostFormProps = {
  onSubmit: (content: string) => Promise<void>;
  image?: string | null;
  isSignedIn: boolean;
  isJoined: boolean;
};

export default function TimeLinePostForm({
  onSubmit,
  image,
  isSignedIn,
  isJoined,
}: TimeLinePostFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(content.trim());
    if (!content.trim()) return;

    try {
      await onSubmit(content);
      setContent("");
    } catch (error) {
      console.error("Error submitting post: ", error);
    }
  };

  if (!(isSignedIn && isJoined)) {
    return (
      <div className="flex space-x-4">
        <Skeleton className="h-9 w-9 mr-2 rounded-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex  space-x-4">
      <Avatar className="h-9 w-9 mr-2 rounded-full">
        <AvatarImage src={image ?? "https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="なんか投稿しよう！"
          className="flex-1 mb-2"
        />
        <Button type="submit" className="w-20 h-7 self-end rounded-full px-4 py-2">
          投稿
        </Button>
      </div>
    </form>
  );
}
