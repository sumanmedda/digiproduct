import ProductDetails from "@/pages/components/ProductDetails"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Edit() {
  const router = useRouter()
  const { id } = router.query
  const [productInfo, setProductInfo] = useState(null)

  useEffect(() => {
    if (!id) {
      return
    } else {
      axios.get("/api/add-product?id=" + id).then((res) => {
        setProductInfo(res.data)
      })
    }
  }, [id])

  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Editing,{" "}
                <span className="text-green-400">{productInfo?.title}</span>
              </h1>
            </div>
          </div>
        </div>
        <hr className="h-px border-0 bg-gray-300" />
        <div className="my-10 ">
          {productInfo && <ProductDetails {...productInfo} />}
        </div>
      </header>
    </>
  )
}
