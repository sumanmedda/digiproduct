import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ReactSortable } from "react-sortablejs"
import toast from "react-hot-toast"

export default function Product({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "")
  const [description, setDescription] = useState(existingDescription || "")
  const [price, setPrice] = useState(existingPrice || "")
  const [images, setImages] = useState(existingImages || [])
  const router = useRouter()
  const [redirect, setRedirect] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const uploadImagesQueue = []

  async function createProduct(ev) {
    ev.preventDefault()

    // Check if there are new images to upload
    if (isUploading) {
      // Wait for the images to finish uploading
      await Promise.all(uploadImagesQueue)
    }

    // Now you can make the API request to save the product
    const data = {
      title,
      description,
      price,
      images,
    }

    if (_id) {
      await axios.put("/api/add-product", { ...data, _id })
      toast.success("Product updated!!")
    } else {
      await axios.post("/api/add-product", data)
      toast.success("Product created!!")
    }

    // Redirect after saving
    setRedirect(true)
  }

  async function uploadImages(ev) {
    setIsUploading(true)
    const files = ev.target?.files

    if (!files || files.length === 0) {
      alert("Please select some files to upload.")
      setIsUploading(false)
      return
    }

    const uploadImagesQueue = []

    for (const file of files) {
      const data = new FormData()
      data.append("file", file)

      uploadImagesQueue.push(
        await axios
          .post("/api/upload", data)
          .then((res) => {
            setImages((oldImages) => [...oldImages, ...res.data.links])
          })
          .catch((error) => {
            console.error("Error uploading image:", error)
            // Optionally, display an error message to the user.
          })
      )
    }

    await Promise.all(uploadImagesQueue).catch((error) => {
      console.error("One or more image uploads failed:", error)
      // Optionally, display a general error message to the user.
    })

    setIsUploading(false)
  }

  if (redirect) {
    router.push("/products")
    return null
  }

  function updateImagesOrder(images) {
    setImages(images)
  }

  function handleDeleteImage(index) {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)
    toast.success("image deleted successfully!!")
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={createProduct} className="space-y-5">
        {/* Title input */}
        <div className="grid grid-cols-2 items-center my-4">
          <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">
            Title
          </label>
          <div className="col-span-2">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
              placeholder="Title of product"
              required
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
          </div>
        </div>

        {/* Images upload */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <label className="text-lg font-medium text-gray-700 mr-2">
              Images
            </label>
            <div className="flex items-center justify-center rounded-lg">
              <label
                htmlFor="fileInput"
                className="flex items-center gap-1.5 px-3 py-2 text-center text-sm font-medium text-gray-500 border cursor-pointer hover:border-primary-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                Upload
              </label>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={uploadImages}
              />
            </div>
          </div>

          {/* Spinner during upload */}
          <div className="grid grid-cols-2 items-center rounded">
            {isUploading && "...Uploading"}
          </div>

          {/* Display uploaded images */}
          {!isUploading && (
            <div className=" grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-2">
              <ReactSortable
                list={images}
                setList={updateImagesOrder}
                className="w-[350px] h-auto  gap-2 flex  justify-between align-items-center"
              >
                {images?.map((link, index) => (
                  <div key={link} className="relative group">
                    <img
                      src={link}
                      alt="image"
                      className="object-cover h-32 w-44 rounded-md border p-2 cursor-pointer transition-transform transform-gpu group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100">
                      <button onClick={() => handleDeleteImage(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-orange-600 bg-white rounded-full"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </ReactSortable>
            </div>
          )}
        </div>

        {/* Description input */}
        <div className="grid grid-cols-2 items-center my-4">
          <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">
            Description
          </label>
          <div className="col-span-2">
            <textarea
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
              placeholder="Description about the product"
              rows={6}
              required
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </div>
        </div>

        {/* Price input */}
        <div className="grid grid-cols-2 items-center my-4">
          <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">
            Price
          </label>
          <div className="col-span-2">
            <input
              type="number"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
              placeholder="Price"
              required
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>

        {/* Save button */}
        <div className="items-center my-4">
          <div className="col-span-2 col-start-2">
            <button
              type="submit"
              className="rounded-lg border border-slate-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
            >
              Save Product
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

// import axios from "axios"
// import { useRouter } from "next/router"
// import { useState } from "react"
// import { ReactSortable } from "react-sortablejs"

// export default function ProductDetails() {
//   const router = useRouter
//   const [redirect, setRedirect] = useState(false)
//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [images, setImages] = useState([])
//   const [price, setPrice] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [uploading, setUploading] = useState(false)
//   const uploadImagesQueue = []

//   async function addProductinDB(event) {
//     setLoading(true)
//     event.preventDefault()

//     if (uploading) {
//       await Promise.all(uploadImagesQueue)
//     }

//     var data = { title, description, images, price }
//     await axios.post("/api/add-product", data)
//     setLoading(false)
//     setRedirect(true)
//   }

//   async function uploadImages(ev) {
//     setUploading(true)
//     const files = ev.target?.files

//     if (files?.length > 0) {
//       for (const file of files) {
//         const data = new FormData()
//         data.append("file", file)

//         uploadImagesQueue.push(
//           axios
//             .post("/api/upload", data)
//             .then((res) => {
//               setImages((oldImages) => [...oldImages, ...res.data.links])
//             })
//             .catch((error) => {
//               console.log("Error uploading image:", error)
//               // Optionally, display an error message to the user.
//             })
//         )
//       }

//       await Promise.all(uploadImagesQueue).catch((error) => {
//         console.log("One or more image uploads failed:", error)
//         // Optionally, display a general error message to the user.
//       })
//       setUploading(false)
//     } else {
//       alert("Some Error Occured")
//       setUploading(false)
//     }
//   }

//   if (redirect) {
//     router.push("/products")
//     return null
//   }

//   function updateImagesOrder(images) {
//     setImages(images)
//   }

//   function handleDeleteImages(index) {
//     const updateImages = [...images]
//     updateImage.splice(index, 1)
//     setImages(updateImages)
//   }

//   return (
//     <>
//       <form
//         className="mx-auto max-w-screen-sm"
//         type="submit"
//         onSubmit={addProductinDB}
//       >
//         <div className="mx-auto my-4">
//           <label
//             for="example1"
//             class="mb-1 block text-lg font-medium text-gray-700 p-1"
//           >
//             Title
//           </label>
//           <input
//             type="text"
//             id="example1"
//             class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border"
//             placeholder="Product Name"
//             value={title}
//             onChange={(t) => setTitle(t.target.value)}
//           />
//         </div>

//         <div className="mx-auto my-4">
//           <label
//             for="example1"
//             class="mb-1 block text-lg font-medium text-gray-700 p-1"
//           >
//             Description
//           </label>
//           <textarea
//             rows={3}
//             type="text"
//             id="example1"
//             class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border"
//             placeholder="Product Description"
//             value={description}
//             onChange={(t) => setDescription(t.target.value)}
//           />
//         </div>

//         <div className="mx-auto my-4">
//           <div class="mx-auto">
//             <label
//               for="example1"
//               class="mb-1 block text-lg font-medium text-gray-700 p-1"
//             >
//               Image
//             </label>
//             <label class="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
//               <div class="space-y-1 text-center">
//                 <div class="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke-width="1.5"
//                     stroke="currentColor"
//                     class="h-6 w-6 text-gray-500"
//                   >
//                     <path
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
//                     />
//                   </svg>
//                 </div>
//                 <div class="text-gray-600">
//                   <a
//                     href="#"
//                     class="font-medium text-primary-500 hover:text-primary-700"
//                   >
//                     Click to upload
//                   </a>{" "}
//                   or drag and drop
//                 </div>
//                 <p class="text-sm text-gray-500">
//                   SVG, PNG, JPG or GIF (max. 800x400px)
//                 </p>
//               </div>
//               <input
//                 id="fileInput"
//                 type="file"
//                 className="hidden"
//                 accept="image/*"
//                 multiple
//                 onChange={uploadImages}
//               />
//             </label>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 items-center rounded">
//           {uploading && "...uploading"}
//         </div>

//         {uploading && (
//           <div className="grid grid-cols-2 gap-4">
//             <ReactSortable
//               list={Array.isArray(images) ? images : []}
//               setList={updateImagesOrder}
//               animation={200}
//               className="grid grid-cols-2 gap-4"
//             >
//               {Array.isArray(images) &&
//                 images.map((link, index) => (
//                   <div key={link} className="relative group">
//                     <img
//                       src={link}
//                       alt="image"
//                       className="object-cover h-32 w-44 rounded-md p-2"
//                     />
//                     <div className="absolute top-2 right-2 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity">
//                       <button onClick={() => handleDeleteImages(index)}>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke-width="1.5"
//                           stroke="currentColor"
//                           class="size-6"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//             </ReactSortable>
//           </div>
//         )}

//         <div className="mx-auto my-4">
//           <label
//             for="example1"
//             class="mb-1 block text-lg font-medium text-gray-700 p-1"
//           >
//             Price
//           </label>
//           <input
//             type="number"
//             id="example1"
//             class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border"
//             placeholder="Product Price"
//             value={price}
//             onChange={(t) => setPrice(t.target.value)}
//           />
//         </div>

//         <div className="mx-auto my-4">
//           <button
//             className="inline-block rounded border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500 w-full"
//             type="submit"
//           >
//             {loading ? "... Wait ..." : "Submit"}
//           </button>
//         </div>
//       </form>
//     </>
//   )
// }
