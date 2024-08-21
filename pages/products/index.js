import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Products() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <header className="bg-white">
          <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  All Products
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  className="inline-block rounded bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring"
                  href={"products/add_product"}
                >
                  Add Product
                </Link>
              </div>
            </div>
          </div>
        </header>
        <hr className="my-1 h-px border-0 bg-gray-300" />
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <center>
            <h1>No Products Found</h1>
          </center>
        </div>
      </>
    )
  }
}
