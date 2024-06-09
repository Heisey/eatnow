
import * as React from 'react'

import Component from './Outlet'
import * as Ctx from './context'

const Root: React.FC = () => {

  return (
    <Ctx.Component>
      <Component />
    </Ctx.Component>
  )
}

export default Root