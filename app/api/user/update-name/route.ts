import { auth } from "@/auth";
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({error: "認証されていません"}, {status: 401})
  }
  
  const {name} = await req.json();

  // このif文はクライアント上でバリデーションをすればいらないと思う
  if (!name) {
    return NextResponse.json({error: "名前は必須です"}, {status: 400})
  }

  try {
    const updateUser = await prisma.user.update({
      where: {id: session.user.id},
      data: {name: name},
    })

    // セッションを更新してisNewUserをfalseに設定　サーバー側のJWTを更新するためにいるらしい　よくわからん いらんかも
    // セッションの更新はauth()関数が自動的に処理するため、めいじてきなJWTの更新は不要になったらしい

    return NextResponse.json({message: "名前が更新されました", user: updateUser})
  } catch ( error) {
    
  }
}
