import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import UserNotFound from "../components/UserNotFound"

export default function Settings() {
  const { data: session } = useSession()
  const router = useRouter()

  async function logout() {
    await router.push("/")
    await signOut()
  }

  if (session) {
    return (
      <>
        <header className="bg-white">
          <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  User Details
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <button
                  className="inline-block rounded bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
        <hr className="my-1 h-px border-0 bg-gray-300" />

        <div class="">
          <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                  Name
                </th>

                <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                  Email
                </th>

                <th
                  scope="col"
                  class="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
              <tr class="hover:bg-gray-50">
                <th class="px-6 py-4 font-medium text-gray-900">
                  {session.user.name}
                </th>

                <td class="px-6 py-4">{session.user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
  } else {
    return <UserNotFound />
  }
}
