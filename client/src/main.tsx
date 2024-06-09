
import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Router from 'react-router-dom'
import * as Query from 'react-query'
import * as QueryTools from '@tanstack/react-query-devtools'

import App from './App'

import AuthProvider from '@/components/providers/Auth'
// import QueryProvider from '@/components/providers/Query'

const client = new Query.QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router.BrowserRouter>
      <Query.QueryClientProvider client={client}>
        <AuthProvider>
          {/* <App /> */}
        </AuthProvider>
        <QueryTools.ReactQueryDevtools initialIsOpen={false} />
      </Query.QueryClientProvider>
    </Router.BrowserRouter>
  </React.StrictMode>,
)
