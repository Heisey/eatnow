

import * as React from 'react'
import *  as ReactTable from '@tanstack/react-table'
import * as Router from 'react-router-dom'

import * as App from '@/App'
import * as Core from '@/core'
import * as Hooks from '@/hooks'
import * as Utils from '@/utils'
import Payment from '@/components/hoc/Payment'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

export interface CartProps extends React.PropsWithChildren {


}


const Cart: React.FC<CartProps> = (props) => {

  const appCtx = App.Ctx.useContext()


  const columnConfig = ReactTable.createColumnHelper<Core.I.CartItem>()

  const columns = [
    columnConfig.accessor('name', { header: 'Name', cell: dataSet => Utils.string.capitalizeAllWords(dataSet.getValue()) }),
    columnConfig.accessor('quantity', { header: 'Quantity', cell: dataSet => `x${dataSet.getValue()}`}),
    columnConfig.accessor('price', { header: 'Price', cell: dataSet => `$${dataSet.getValue()}`}),
    columnConfig.accessor('price', { header: () => <div className='text-right'>'Item Total'</div>, cell: dataSet => <div className='text-right'>`$${dataSet.row.getUniqueValues('quantity')[0] as number * dataSet.getValue()}`</div> })
  ]

  const table = ReactTable.useReactTable({
    data: appCtx.cart.items,
    columns: columns,
    getCoreRowModel: ReactTable.getCoreRowModel()
  })

  const calcSubTotal = () => {
    let result = 0
    appCtx.cart.items.map(dataSet => result = dataSet.quantity * dataSet.price)
    return result
  }

  const calcTax = calcSubTotal() * 0.05

  const makePayment = async () => {
    console.log('puppy start')
    const payment = await 
    console.log('puppy end')
    console.log('payment, ', payment)
  }

  return (
    <div className='max-w-[900px] mx-auto'>
      <h2 className='mb-8 font-bold text-2xl text-orange-500'>Order</h2>
      <div>
        <Table className='mb-4 border-b-2 border-orange-500'>
          <TableHeader>
            {table.getHeaderGroups().map(row => (
              <TableRow key={row.id}>
                {row.headers.map(cell => (
                  <TableHead key={cell.id + Math.random() * 1000}>
                    {cell.isPlaceholder ? null : ReactTable.flexRender(cell.column.columnDef.header, cell.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {ReactTable.flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='flex flex-col items-end'>
          <div className='flex items-center justify-end mb-2'>
            <span className='mr-2 font-bold'>Sub Total</span>
            <span>{`$${calcSubTotal()}`}</span>
          </div>
          <div className='flex items-center justify-end mb-2'>
            <span className='mr-2 font-bold'>Tax</span>
            <span>{`$${calcTax}`}</span>
          </div>
          <div className='flex items-center justify-end border-b-2 border-orange-500 mb-2'>
            <span className='mr-2 font-bold'>Delivery Price</span>
            <span>{`$${appCtx.cart.deliveryPrice}`}</span>
          </div>
          <div className='flex items-center justify-end'>
            <span className='mr-2 font-bold'>Total</span>
            <span>{`$${calcSubTotal() + calcTax + appCtx.cart.deliveryPrice}`}</span>
          </div>
          <div className='mt-4'>
            <Router.Link to={Core.keys.paths.CHECKOUT_PAYMENT}>Go To Payment</Router.Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Cart