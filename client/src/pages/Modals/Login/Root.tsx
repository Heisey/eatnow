
import * as React from 'react'

import Login from './Login'
import * as Ctx from './context'

const Root: React.FC = () => {

  return (
    <Ctx.Component>
      <Login />
    </Ctx.Component>
  )
}

export default Root