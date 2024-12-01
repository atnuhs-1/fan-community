"use server";

import { parseWithZod } from "@conform-to/zod";
import { liveSchema } from "./schema";
import { redirect } from "next/navigation";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export const createLiveInfo = async (
  prevState: unknown,
  formData: FormData
) => {
  console.log("--createLiveInfo---");
  console.log("送信されたフォームの内容: ", formData);

  // フォームデータのバリデーション
  const submission = parseWithZod(formData, {
    schema: liveSchema,
  });

  try {
    const session = auth();
    if (!session) {
      return submission.reply({
        formErrors: ["認証されていません"],
      });
    }
  } catch (error) {
    return submission.reply({
      formErrors: ["認証確認中にエラーが起きました"]
    })
  }

  // バリデーションエラーがある場合
  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    // データベースに保存
    const result = await prisma.live.create({
      data: {
        title: submission.value.title,
        description: submission.value.description,
        startDate: submission.value.startDate,
        endDate: submission.value.endDate,
        liveType: "TOUR",
        communityId: submission.value.communityId,
        performances: {
          create: submission.value.performances.map((performance) => ({
            date: performance.date,
            venue: performance.venue,
          })),
        },
      },
    });

    console.log("result: ", result);

    // キャッシュの再検証
    revalidatePath(`/communities/${submission.value.communityId}`);

   
  } catch (error) {
    console.error("Save error:", error);

    // エラー時のレスポンス
    return submission.reply({
      formErrors: ["保存中にエラーが発生しました"],
    });
  }

  redirect(`/community/${submission.value.communityId}`);
};
