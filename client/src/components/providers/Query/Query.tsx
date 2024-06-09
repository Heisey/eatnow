

import * as React from 'react'

import * as ReactQuery from 'react-query'


export interface QueryProps extends React.PropsWithChildren {


}


const Query: React.FC<QueryProps> = (props) => {

  const client = new ReactQuery.QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <ReactQuery.QueryClientProvider client={client}>
      {props.children}
    </ReactQuery.QueryClientProvider>
  )
}


export default Query