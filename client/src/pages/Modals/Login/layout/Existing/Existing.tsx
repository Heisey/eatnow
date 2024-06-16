

import * as React from 'react'

import { Button } from '@/components/ui/button'

import LoginForm from '../../components/LoginForm'
import * as Ctx from '../../context'

export interface ExistingProps extends React.PropsWithChildren {


}


const Existing: React.FC<ExistingProps> = () => {

  const loginCtx = Ctx.useContext()


  return (
    <div>
      <h3>Login</h3>
      <LoginForm />
      <span>Havent signed up?</span>
      <Button onClick={loginCtx.toggleCreateNew}>Sign up</Button>
    </div>
  )
}


export default Existing