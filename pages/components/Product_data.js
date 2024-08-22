import Link from "next/link"

export default function ProductData({ product, index }) {
  return (
    <>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr>
          <th class=" px-6 py-4 font-small text-gray-900">
            {index + 1}
            <div class="relative h-7 w-10">
              <img
                class="h-10 w-10 rounded-full object-cover object-center"
                src={product.images}
                alt=""
              />
            </div>
          </th>
          <td class="px-6 py-4">{product.title}</td>
          <td class="px-6 py-4 max-w-xs">{product.description}</td>
          <td class="px-6 py-4">Rs {product.price}</td>

          <td class="flex justify-end gap-4 px-6 py-4 font-medium">
            <Link
              href={"/products/delete/" + product._id}
              className="text-red-500"
            >
              Delete
            </Link>
            <Link href={"/products/edit/" + product._id} class="text-green-400">
              Edit
            </Link>
          </td>
        </tr>
      </tbody>
    </>
  )
}
