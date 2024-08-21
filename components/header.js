import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"

function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const { pathname } = router
  const active = "text-green-500 transition hover:text-green-500/75"
  const inactive = "text-gray-500 transition hover:text-gray-500/75"

  if (session) {
    return (
      <>
        <header className="bg-white border-b sticky top-0">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a className="block text-teal-600" href="#">
                <span className="sr-only">Home</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </a>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-md">
                  <li>
                    <Link
                      className={location.pathname === "/" ? active : inactive}
                      href="/"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={
                        location.pathname === "/products" ? active : inactive
                      }
                      href="/products"
                    >
                      Products
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={
                        location.pathname === "/settings" ? active : inactive
                      }
                      href="/settings"
                    >
                      Settings
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <div class="h-10 w-10">
                    <img
                      class="h-full w-full rounded-full object-cover object-center"
                      src={session.user.image}
                      alt=""
                    />
                  </div>
                </div>

                <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}

export default Header
