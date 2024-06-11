
import * as React from 'react'
import * as ReactTable from '@tanstack/react-table'

import * as Core from '@/core'
import * as Hooks from '@/hooks'
import * as Utils from '@/utils'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'

import AddItem from './components/AddItem'
import Table from './components/Table'

export interface MenuProps extends React.PropsWithChildren {

}

const Menu: React.FC<MenuProps> = (props) => {

  const auth = Hooks.common.useAuth()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const resturant = Hooks.resturant.useGetById(user.data?.resturantId)
  const menu = Hooks.menu.useGetById(resturant.data?.menuId)
  const menuItems = Hooks.menu.useGetAllByResturantId(user.data?.resturantId)
  const [addItemOpen, toggleAddItemOpen] = Hooks.common.useToggle()

  if (auth.isLoading || user.isLoading || resturant.isLoading || menu.isLoading || menuItems.isLoading) return <div>Loading</div>
  
  const columnConfig = ReactTable.createColumnHelper<Core.I.MenuItemRecord>()

  const columns = [
    columnConfig.accessor('image', { header: '', cell: dataSet => <img src={dataSet.getValue()} className='h-75 w-auto' /> }),
    columnConfig.accessor('name', { header: 'name', cell: dataSet => Utils.string.capitalizeAllWords(dataSet.getValue()) }),
  ]

  return (
    <div>
      <Dialog open={addItemOpen}>
        <h1>Menu</h1>
        <Button onClick={toggleAddItemOpen}>Add Menu Item</Button>
        {!menu.data?.id && (
          <div>
            <p>You have not created a menu yet</p>
          </div>
        )}
        {menu.data && <Table data={menu.data} columns={columns} />}
        <AddItem />
      </Dialog>
    </div>
    
  )
}


export default Menu