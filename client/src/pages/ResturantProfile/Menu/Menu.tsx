
import * as React from 'react'

import * as Hooks from '@/hooks'
import { Button } from '@/components/ui/button'

export interface MenuProps extends React.PropsWithChildren {

}

const Menu: React.FC<MenuProps> = (props) => {

  const auth = Hooks.common.useAuth()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const resturant = Hooks.resturant.useGetById(user.data?.resturantId)
  const menu = Hooks.menu.useGetById(resturant.data?.menuId)

  if (auth.isLoading || user.isLoading || resturant.isLoading || menu.isLoading ) return <div>Loading</div>
  
  console.log('puppy menu, ', menu.data)
  return (
    <div>
      Menu
      {!menu.data?.id && (
        <div>
          <p>You have not created a menu yet</p>
        </div>
      )}
    </div>
  )
}


export default Menu