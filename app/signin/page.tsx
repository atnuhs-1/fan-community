import { redirect } from "next/navigation"
import { signIn, auth } from "@/auth"
import { providerMap } from "@/auth.config"
import { AuthError } from "next-auth"
import { Github, Twitter } from "lucide-react"

const providerIcons = {
  github: <Github className="w-5 h-5" />,
  google: (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
      />
    </svg>
  )
}

export default async function SignInPage({ 
  searchParams 
}: { 
  searchParams: { callbackUrl: string | undefined }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            アカウントにログイン
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            以下のサービスからログインしてください
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {Object.values(providerMap).map((provider, index) => (
            <form
              key={index}
              action={async () => {
                "use server"
                try {
                  await signIn(provider.id, {
                    redirectTo: searchParams?.callbackUrl ?? "",
                  })
                } catch (error) {
                  throw error
                }
              }}
              className="w-full"
            >
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {providerIcons[provider.id as keyof typeof providerIcons]}
                <span>{provider.name}でログイン</span>
              </button>
            </form>
          ))}
        </div>

        {/* <div className="mt-4 text-center text-sm text-gray-500">
          ※ログインすることで、利用規約とプライバシーポリシーに同意したことになります
        </div> */}
      </div>
    </div>
  )
}