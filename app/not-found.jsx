import Link from "next/link";

function notFound() {
  return (
    <div className="flex flex-col flex-center w-full max-w-full mb-64">
        <h1 className="head_text text-center mt-32">Error 404</h1>
        <h3 className="text-xl font-normal text-gray-500">Oops! This page was not found.</h3>
        <Link href='/' className="mt-5 font-medium text-blue-600 hover:underline">Go back to the homepage &gt;</Link>
    </div>
  )
}

export default notFound;