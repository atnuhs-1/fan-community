"use client";

import { useActionState, useState } from "react";
import { Plus, X } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ja } from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import { createLiveInfo } from "@/app/actions/live";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { liveSchema } from "@/app/actions/schema";
import { useFormState } from "react-dom";
import { LiveType } from "@prisma/client";

// LiveTypeの表示名を取得する関数
function getLiveTypeLabel(type: LiveType): string {
  const labels: Record<LiveType, string> = {
    TOUR: "ツアー",
    SINGLE: "単発ライブ",
    FESTIVAL: "フェス",
    STREAMING: "配信ライブ",
    FAN_MEETING: "ファンミーティング",
    OTHER: "その他",
  };
  return labels[type];
}

interface Performance {
  date: Date | null;
  venue: string;
}

// 日本語ロケールを登録
registerLocale("ja", ja);

export default function LiveForm({
  params,
}: {
  params: { communityId: string };
}) {
  const { communityId } = params;
  const [lastResult, action] = useFormState(createLiveInfo, undefined);
  // const Today = new Date();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: liveSchema });
    },
    defaultValue: {
      title: "",
      description: "",
      startDate: "", // 日付は空文字列で初期化
      endDate: "", // 日付は空文字列で初期化
      liveType: "", // 追加
      communityId, // 追加
      performances: [
        // 最低1つは必要なので、空の要素を1つ追加
        {
          date: "", // 日付は空文字列で初期化
          venue: "",
        },
      ],
    },
    shouldValidate: "onBlur",
  });

  // getFieldListを使うことで配列の各要素にアクセスすることができる
  const performances = fields.performances.getFieldList();

  return (
    <div className="w-full h-full p-6  bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">ライブ情報登録</h1>

      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        className="space-y-6"
        noValidate
      >
        {/* ツアー基本情報 */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor={fields.liveType.id}
              className="block text-sm font-medium mb-1"
            >
              ライブタイプ
            </label>
            <select
              name={fields.liveType.name}
              id={fields.liveType.id}
              className="w-full border rounded-lg p-2"
            >
              <option value="">選択してください</option>
              {Object.entries(LiveType).map(([key, value]) => (
                <option key={key} value={value}>
                  {getLiveTypeLabel(value)} {/* 後述する関数 */}
                </option>
              ))}
            </select>
            <div className="text-red-500">{fields.liveType.errors}</div>
          </div>
          <div>
            <label
              htmlFor={fields.title.id}
              className="block text-sm font-medium mb-1"
            >
              ライブタイトル
            </label>
            <input
              type="text"
              name={fields.title.name}
              id={fields.title.id}
              className="w-full border rounded-lg p-2"
              placeholder="ARTIST LIVE TOUR 2024"
            />
            <div className="text-red-500">{fields.title.errors}</div>
          </div>

          <div>
            <label
              htmlFor={fields.description.id}
              className="block text-sm font-medium mb-1"
            >
              説明
            </label>
            <textarea
              name={fields.description.name}
              className="w-full border rounded-lg p-2"
              rows={3}
              placeholder="ライブの説明を入力"
            />
            <div className="text-red-500">{fields.description.errors}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={fields.startDate.id}
                className="block text-sm font-medium mb-1"
              >
                開始日
              </label>
              <DatePicker
                name={fields.startDate.name}
                selected={
                  fields.startDate.value
                    ? new Date(fields.startDate.value)
                    : null
                }
                onChange={(date) => {
                  form.update({
                    name: fields.startDate.name,
                    value: date?.toISOString() ?? "", // ISO形式の文字列に変換
                  });
                }}
                locale="ja"
                dateFormat="yyyy/MM/dd"
                className="w-full border rounded-lg p-2"
                placeholderText="開始日を選択"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">終了日</label>
              <DatePicker
                name={fields.endDate.name}
                selected={
                  fields.endDate.value ? new Date(fields.endDate.value) : null
                }
                onChange={(date) => {
                  form.update({
                    name: fields.endDate.name,
                    value: date?.toISOString() ?? "", // ISO形式の文字列に変換
                  });
                }}
                minDate={
                  fields.startDate.value
                    ? new Date(fields.startDate.value)
                    : undefined
                }
                locale="ja"
                dateFormat="yyyy/MM/dd"
                className="w-full border rounded-lg p-2"
                placeholderText="終了日を選択"
              />
            </div>
          </div>
          {/* communityIdは hidden フィールドとして追加 */}
          <input
            type="hidden"
            name={fields.communityId.name}
            value={communityId}
          />
        </div>

        {/* 公演情報 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">公演情報</h2>
            <button
              {...form.insert.getButtonProps({
                name: fields.performances.name,
              })}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" />
              公演を追加
            </button>
          </div>

          <div className="space-y-4">
            {performances.map((performance, index) => {
              const performanceFields = performance.getFieldset();
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        日付
                      </label>
                      <DatePicker
                        name={performanceFields.date.name}
                        selected={
                          performanceFields.date.value
                            ? new Date(performanceFields.date.value)
                            : null
                        }
                        onChange={(date) => {
                          form.update({
                            name: performanceFields.date.name,
                            value: date?.toISOString() ?? "", // ISO形式の文字列に変換
                          });
                        }}
                        minDate={
                          fields.startDate.value
                            ? new Date(fields.startDate.value)
                            : undefined
                        }
                        maxDate={
                          fields.endDate.value
                            ? new Date(fields.endDate.value)
                            : undefined
                        }
                        locale="ja"
                        dateFormat="yyyy/MM/dd"
                        className="w-full border rounded-lg p-2"
                        placeholderText="公演日を選択"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        会場
                      </label>
                      <input
                        type="text"
                        name={performanceFields.venue.name}
                        className="w-full border rounded-lg p-2"
                        placeholder="会場名"
                      />
                    </div>
                  </div>
                  {index != 0 && (
                    <button
                      {...form.remove.getButtonProps({
                        name: fields.performances.name,
                        index,
                      })}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
