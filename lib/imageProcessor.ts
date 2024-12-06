"use client";

interface LoadImageOptions {
  canvas: boolean;
  orientation: boolean;
  quality: number;
  maxWidth?: number; // オプショナルとして追加
  maxHeight?: number; // オプショナルとして追加
}

export const processImage = async (file: File) => {
  // 動的インポート
  const heic2any = (await import("heic2any")).default;
  const loadImage = (await import("blueimp-load-image")).default;

  const isHeic = file.type === "image/heic" || file.type === "image/heif";

  let processedFile = file;
  if (isHeic) {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.9,
      });

      processedFile = new File(
        [Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob],
        file.name.replace(/\.(heic|heif)$/i, ".jpg"),
        { type: "image/jpeg" }
      );
    } catch (error) {
      console.error("HEIC conversion failed:", error);
      throw new Error("HEIC画像の変換に失敗しました");
    }
  }

  // 画像が一定サイズ以下の場合は、リサイズしない
  const maxDimension = 2000; // より大きな最大サイズを設定
  let options: LoadImageOptions = {
    canvas: true,
    orientation: true,
    quality: 0.92, // JPEG品質を上げる（0.8→0.92）
  };

  // 大きな画像の場合のみリサイズを適用
  if (file.size > 5 * 1024 * 1024) {
    // 5MB以上の場合のみ
    options = {
      ...options,
      maxWidth: maxDimension,
      maxHeight: maxDimension,
    };
  }

  const result = await loadImage(processedFile, options);

  return new Promise<Blob>((resolve) => {
    // Canvas要素であることを型アサーションで明示
    (result.image as HTMLCanvasElement).toBlob(
      (blob) => {
        resolve(blob!);
      },
      "image/jpeg",
      0.92
    );
  });
};
