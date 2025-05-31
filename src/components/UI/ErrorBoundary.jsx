

export function ErrorBoundary({useRouteError}) {
    const error = useRouteError();
    console.error(error);
  
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
          <p className="mb-4">
            {error?.statusText || error?.message || "An unexpected error occurred"}
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

 