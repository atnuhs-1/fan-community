import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { LiveType } from "@prisma/client";

export function getLiveTypeLabel(type: LiveType): string {
  const labels: Record<LiveType, string> = {
    TOUR: 'ツアー',
    SINGLE: '単発ライブ',
    FESTIVAL: 'フェス',
    STREAMING: '配信ライブ',
    FAN_MEETING: 'ファンミーティング',
    OTHER: 'その他'
  };
  return labels[type];
}
