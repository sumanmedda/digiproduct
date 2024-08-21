import { companyName } from "./utils"
import { useSession, signIn, signOut } from "next-auth/react"
export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <header className="bg-white">
          <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Welcome Back,{" "}
                  <span className="text-green-600">{session.user.name}</span>
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => signOut()}
                  className="inline-block rounded bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring"
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="h-32 rounded-lg bg-gray-200"></div>
          <div className="h-32 rounded-lg bg-gray-200"></div>
          <div className="h-32 rounded-lg bg-gray-200"></div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center max-w-4xl m-auto">
        <h1 className="text-4xl font-bold max-w-lg text-center">
          Welcome to Admin Panel of {companyName}
        </h1>
        <p>...</p>
        <p className="my-2">Login Into The Admin Panel</p>
        <button
          className="inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          onClick={() => signIn("google")}
        >
          Sign In with Google
        </button>
      </div>
    </>
  )
}
