// src/components/ErrorPage.tsx
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function ErrorPage({ status }: { status?: number }) {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl mb-4">Oops!</h1>
      <p className="mb-2">
        {status === 404
          ? "We couldn’t find what you were looking for."
          : "Something went wrong on our end."}
      </p>
      <p className="text-sm italic text-gray-400">
        {isRouteErrorResponse(error)
          ? error.statusText
          : (error as Error).message}
      </p>
    </div>
  )
}
