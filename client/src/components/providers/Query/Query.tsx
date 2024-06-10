

import * as React from 'react'

import * as ReactQuery from '@tanstack/react-query'


export interface QueryProps extends React.PropsWithChildren {


}

const client = new ReactQuery.QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const Query: React.FC<QueryProps> = (props) => {

  

  return (
    <ReactQuery.QueryClientProvider client={client}>
      {props.children}
    </ReactQuery.QueryClientProvider>
  )
}


export default Query