

import * as React from 'react'

import * as App from '@/App'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import * as Context from './context'
import Existing from './layout/Existing'
import NewUser from './layout/NewUser'

export interface LoginProps extends React.PropsWithChildren {


}


const Login: React.FC<LoginProps> = () => {

  const appCtx = App.Ctx.useContext()
  const loginCtx = Context.useContext()

  return (
    <Dialog open={appCtx.loginModalShow}>
      <DialogContent>
        {loginCtx.createNew && <NewUser />}
        {!loginCtx.createNew && <Existing />}
      </DialogContent>
    </Dialog> 
  )
}


export default Login