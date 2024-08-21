import { useRef, useState } from "react"

export default function ProductDetails() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState([])
  const [price, setPrice] = useState("")

  function addProductinDB() {
    console.log("Add Button")
  }

  return (
    <>
      <form
        className="mx-auto max-w-screen-sm"
        type="submit"
        onSubmit={addProductinDB}
      >
        <div className="mx-auto my-4">
          <label
            for="example1"
            class="mb-1 block text-lg font-medium text-gray-700 p-1"
          >
            Title
          </label>
          <input
            type="text"
            id="example1"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border"
            placeholder="Product Name"
            value={title}
            onChange={(t) => setTitle(t.target.value)}
          />
        </div>

        <div className="mx-auto my-4">
          <label
            for="example1"
            class="mb-1 block text-lg font-medium text-gray-700 p-1"
          >
            Description
          </label>
          <textarea
            rows={3}
            type="text"
            id="example1"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border"
            placeholder="Product Description"
            value={description}
            onChange={(t) => setDescription(t.target.value)}
          />
        </div>

        <div className="mx-auto my-4">
          <div class="mx-auto">
            <label
              for="example1"
              class="mb-1 block text-lg font-medium text-gray-700 p-1"
            >
              Image
            </label>
            <label class="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
              <div class="space-y-1 text-center">
                <div class="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6 text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </div>
                <div class="text-gray-600">
                  <a
                    href="#"
                    class="font-medium text-primary-500 hover:text-primary-700"
                  >
                    Click to upload
                  </a>{" "}
                  or drag and drop
                </div>
                <p class="text-sm text-gray-500">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
              <input id="example5" type="file" class="sr-only" />
            </label>
          </div>
        </div>

        <div className="mx-auto my-4">
          <label
            for="example1"
            class="mb-1 block text-lg font-medium text-gray-700 p-1"
          >
            Price
          </label>
          <input
            type="number"
            id="example1"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border"
            placeholder="Product Price"
            value={price}
            onChange={(t) => setPrice(t.target.value)}
          />
        </div>

        <div className="mx-auto my-4">
          <button
            className="inline-block rounded border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500 w-full"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}
