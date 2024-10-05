"use client";

import { useState } from "react";
import { createPost } from "@/app/actions/posts";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

type postFormProps = {
  onSubmit: (content: string) => Promise<void>;
  isSignedIn: boolean;
  isJoined: boolean;
};

export default function PostForm({
  onSubmit,
  isSignedIn,
  isJoined,
}: postFormProps) {
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
      <div className="text-xl font-semibold mt-20">
        投稿するにはサインインして、コミュニティに参加しよう
      </div>
    );
  }

  return (
    <div className="mt-auto">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h2 className="font-bold text-xl">投稿フォーム</h2>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="なんか投稿しよう！"
        className="border rounded-xl h-52 p-2"
      />
      <Button type="submit" className="rounded-full px-4 py-2">
        投稿
      </Button>
    </form>
    </div>
    
  );
}
