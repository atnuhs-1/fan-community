"use client"

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TimelinePostImageProps {
  images: Array<{
    id: string;
    url: string;
  }>;
}

export function TimelinePostImage({ images }: TimelinePostImageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="mt-2 grid gap-2 grid-cols-2">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt=""
            className="rounded-lg w-full h-auto cursor-pointer"
            onClick={() => setSelectedImage(image.url)}
          />
        ))}
      </div>

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
    </>
  );
}