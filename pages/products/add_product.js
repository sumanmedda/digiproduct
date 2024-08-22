import ProductDetails from "@/pages/components/ProductDetails"

export default function AddProduct() {
  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Add A New Product
              </h1>
            </div>
          </div>
        </div>
        <hr className="h-px border-0 bg-gray-300" />
        <div className="my-10 ">
          <ProductDetails />
        </div>
      </header>
    </>
  )
}
