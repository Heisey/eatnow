
import * as React from 'react'

import App from './App'
import * as CtxApp from './context'

const Root: React.FC = () => {

  return (
    <CtxApp.Component>
      <App />
    </CtxApp.Component>
  )
}

export default Root