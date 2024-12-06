import { LogIn, PenSquare, Users } from "lucide-react";
import Link from "next/link";

export default function Guide() {
  return (
    <div className="p-8">
      <div className="p-5 rounded-lg bg-slate-100">
        <h2 className="font-bold text-xl mb-6">使い方</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/signin"
            className="flex flex-col items-center text-center p-4 bg-white rounded-lg transition-all hover:shadow-md cursor-pointer"
          >
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <LogIn className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">1. ログインする</h3>
            <p className="text-sm text-gray-600">
              アカウントを作成して、ログインしましょう
            </p>
          </Link>

          <Link
            href="/communities"
            className="flex flex-col items-center text-center p-4 bg-white rounded-lg transition-all hover:shadow-md cursor-pointer"
          >
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">2. コミュニティに参加</h3>
            <p className="text-sm text-gray-600">
              応援しているアーティストのコミュニティを見つけて参加
            </p>
          </Link>

          <Link
            href="/communities"
            className="flex flex-col items-center text-center p-4 bg-white rounded-lg transition-all hover:shadow-md cursor-pointer"
          >
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <PenSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">3. 情報を共有</h3>
            <p className="text-sm text-gray-600">
              ライブ情報や物販情報をみんなで共有しよう
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
