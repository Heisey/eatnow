
import * as MxReact from 'mobx-react'
import * as React from 'react'

import * as CtxApp from './'

const Provider: React.FC<React.PropsWithChildren> = (props) => {
  
  return (
    <CtxApp.Context.Provider
      value={{
        
      }}
    >
      {props.children}
    </CtxApp.Context.Provider>
  )
}

export const Component = MxReact.observer(Provider)