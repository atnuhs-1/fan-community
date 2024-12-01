import { LiveType } from "@prisma/client";
import { z } from "zod";

// 公演情報のスキーマ
const performanceSchema = z.object({
  date: z.coerce.date({
    required_error: "公演日を選択してください",
    invalid_type_error: "正しい日付形式で入力してください",
  }),
  venue: z.string()
    .min(1, "会場名を入力してください")
    .max(100, "会場名は100文字以内で入力してください"),
});

// ライブ情報全体のスキーマ
export const liveSchema = z.object({
  title: z.string()
    .min(1, "ライブタイトルを入力してください")
    .max(200, "ライブタイトルは200文字以内で入力してください"),
  
  description: z.string()
    .min(1, "説明を入力してください")
    .max(1000, "説明は1000文字以内で入力してください"),
  
  startDate: z.coerce.date({
    required_error: "開始日を選択してください",
    invalid_type_error: "正しい日付形式で入力してください",
  }),
  
  endDate: z.coerce.date({
    required_error: "終了日を選択してください",
    invalid_type_error: "正しい日付形式で入力してください",
  }),

  liveType: z.nativeEnum(LiveType, {
    required_error: "ライブタイプを選択してください",
  }),

  communityId: z.string().min(1, "コミュニティIDは必須です"),
  
  performances: z.array(performanceSchema)
    .min(1, "少なくとも1つの公演情報を入力してください")
    .max(50, "公演情報は50件まで登録可能です"),
}).refine(
  (data) => {
    // 開始日が終了日より前であることを確認
    return data.startDate <= data.endDate;
  },
  {
    message: "開始日は終了日より前の日付を選択してください",
    path: ["startDate"],
  }
).refine(
  (data) => {
    // すべての公演日が開始日と終了日の範囲内にあることを確認
    return data.performances.every(
      (performance) => 
        performance.date >= data.startDate && 
        performance.date <= data.endDate
    );
  },
  {
    message: "公演日は開始日と終了日の範囲内で選択してください",
    path: ["performances"],
  }
);

// 型定義の出力
export type LiveFormData = z.infer<typeof liveSchema>;