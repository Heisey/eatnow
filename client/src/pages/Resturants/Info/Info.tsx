

import * as React from 'react'
import * as Router from 'react-router-dom'
import * as Lucide from 'lucide-react'

import * as App from '@/App'
import * as Core from '@/core'
import * as Hooks from '@/hooks'
import { Button } from '@/components/ui/button'

import Cuisines from './layout/Cuisines'
import Header from './layout/Header'
import MenuList from './layout/MenuList'

export interface InfoProps extends React.PropsWithChildren {


}


const Info: React.FC<InfoProps> = () => {
  
  const auth = Hooks.common.useAuth()
  const params = Hooks.common.useParams()
  const resturant = Hooks.resturantProfile.useGetById(params.id)
  const menu = Hooks.menu.useGetById(resturant.data?.menuId)
  const appCtx = App.Ctx.useContext()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  
  if (resturant.isLoading || menu.isLoading) return <div>Loading</div>

  const categories = Object.keys(menu.data || {}).filter(dataSet => dataSet !== 'id').filter(dataSet => dataSet !== '__v')

  const renderListItem = (args: Core.I.CartItem) => (
    <li className='flex justify-between items-center'>
      <span className='grow'>{args.name}</span>
      <div className='flex items-center'>
        <div className='mr-1'>
          <span className='mr-2'>x{args.quantity}</span>
          <span className=''>${args.price * args.quantity}</span>
        </div>
        <Button onClick={() => increaseQuanity(args)} className='p-0' variant='ghost'><Lucide.Plus size='15' /></Button>
        <Button onClick={() => decreaseQuantity(args)} className='p-0' variant='ghost'><Lucide.Minus size='15' /></Button>
      </div>
    </li>
  )

  const calcTotal = () => {
    if (appCtx.cart.length === 0) return 0
    let result = 0
    appCtx.cart.map(dataSet => result = result + (dataSet.price * dataSet.quantity))
    return result
  }

  const increaseQuanity = (args: Core.I.CartItem) => {
    appCtx.updateCart([ ...appCtx.cart.filter(dataSet => dataSet.id !== args.id), { ...args, quantity: args.quantity + 1 } ])
  }

  const decreaseQuantity = (args: Core.I.CartItem) => {
    if (args.quantity === 1) return appCtx.updateCart(appCtx.cart.filter(dataSet => dataSet.id !== args.id ))
    appCtx.updateCart([ ...appCtx.cart.filter(dataSet => dataSet.id !== args.id), { ...args, quantity: args.quantity - 1 } ])
  }

  const checkoutPath = user.data?.address ? Core.keys.paths.CHECKOUT_CART : Core.keys.paths.CHECKOUT_USER_INFO

  return (
    <div>
      <Header resturant={resturant.data!} />
      <Cuisines categories={categories} />
      <div className='flex gap-4'>
        <MenuList menu={menu.data!} categories={categories}  />
        <div className='border-2 border-orange-500 h-fit p-2 mt-[96px] max-w-[350px] min-w-[250px]'>
          <div className='flex justify-between items-center border-b-2 border-orange-500 pb-[5px] mb-2'>
            <span>Your Order</span>
            <span>${calcTotal()}</span>
          </div>

          <div className='mb-4'>
            <ul>
              {appCtx.cart.length === 0 && <li>you have no added anything yet</li>}
              {appCtx.cart.length > 0 && appCtx.cart.map(dataSet => renderListItem(dataSet))}
            </ul>
          </div>
          {!auth.user && <Button onClick={auth.loginWithGoogle} className='bg-orange-500 w-full text-white font-bold'>Login to Proceed</Button>}
          {auth.user && <Router.Link to={checkoutPath}><Button disabled={appCtx.cart.length === 0} className='bg-orange-500 w-full text-white font-bold'>Continue to Checkout</Button></Router.Link>}
        </div>
      </div>
    </div>
  )
}


export default Info