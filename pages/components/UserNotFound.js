import Link from "next/link"

export default function UserNotFound() {
  return (
    <>
      <center className="my-40">
        <h1 className="">User Not Found. Please Go To Home Page and Login</h1>
        <Link
          className="my-10 inline-block rounded bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring"
          href={"/"}
        >
          Login Page
        </Link>
      </center>
    </>
  )
}
