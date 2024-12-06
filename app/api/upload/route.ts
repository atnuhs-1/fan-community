// app/api/upload/route.ts
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
 
  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      // 必要に応じて認証チェックを追加
      onBeforeGenerateToken: async (pathname: string) => {
        // pathname に基づいてアップロードを許可するかどうかを決定
        return {
          allowedContentTypes: [
            'image/jpeg', 
            'image/png', 
            'image/gif',
            'image/heic',  // HEICをサポート
            'image/heif'   // HEIFをサポート
          ],
          maximumSizeInBytes: 5 * 1024 * 1024, // 5MB
        };
      },
      onUploadCompleted: async ({blob, tokenPayload}) => {
        console.log("blob upload completed", blob, tokenPayload);
      }
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}