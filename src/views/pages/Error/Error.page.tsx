import type { FallbackProps } from 'react-error-boundary'

const ErrorPage = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props
  console.log('ErrorPage - resetErrorBoundary:', resetErrorBoundary)
  console.log('ErrorPage - error:', error)

  return (
    <div className="text-center pt-5">
      <h2 className="mb-4">Oops, something went wrong</h2>
      <button onClick={resetErrorBoundary}>Reload page</button>
    </div>
  )
}

export default ErrorPage
