

import * as React from 'react'

import { Button } from '@/components/ui/button'

import * as Ctx from '../../context'
import LoginForm from '../../components/LoginForm'

export interface NewUserProps extends React.PropsWithChildren {


}


const NewUser: React.FC<NewUserProps> = (props) => {

  const loginCtx = Ctx.useContext()

  return (
    <div>
      <div>
        <h3>Create User</h3>
        <LoginForm />
      </div>
      <span>Already a user</span>
      <Button onClick={loginCtx.toggleCreateNew}>Go to login</Button>
    </div>
  )
}


export default NewUser