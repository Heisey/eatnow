
import * as React from 'react'

import * as CtxApp from './Context'

export const useContext = () => {
  let context = React.useContext(CtxApp.Context)

  if (context === null) throw Error(`
    Auth context must be in a provider, otherwise it weill not function properly
  `)

  return context
}