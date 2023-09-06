import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import type { FallbackProps } from 'react-error-boundary'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { store } from './redux/app'

const root = ReactDOM.createRoot(document.getElementById('root')!)

const ErrorPage = lazy(
  async () =>
    import(
      /* webpackChunkName: "ErrorPage" */ './views/pages/Error/Error.page'
    ),
)

const WrappedApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary
          FallbackComponent={(props: FallbackProps) => (
            <Suspense>
              <ErrorPage
                error={props.error}
                resetErrorBoundary={props.resetErrorBoundary}
              />
            </Suspense>
          )}
          onError={(err) => console.log('Error happened!', err)}
        >
          <App />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  )
}

// Setup MSW mock server in development
if (process.env.NODE_ENV === 'development') {
  // Certify MSW's Service Worker is available before start React app.
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start()
    }) // Run <App /> when Service Worker is ready to intercept requests.
    .then(() => {
      root.render(<WrappedApp />)
    })
  // Never setup MSW mock server in production
} else if (process.env.NODE_ENV === 'production') {
  root.render(<WrappedApp />)
}
