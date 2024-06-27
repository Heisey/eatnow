

import * as React from 'react'
import *  as ReactTable from '@tanstack/react-table'

import * as App from '@/App'
import * as Core from '@/core'
import * as Utils from '@/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

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

  return (
    <div>
      <h2>Order</h2>
      <div>
        <Table className='mb-4 max-w-[900px] mx-auto'>
          <TableHeader>
            {table.getHeaderGroups().map(row => (
              <TableRow key={row.id}>
                {row.headers.map(cell => (
                  <TableHead key={cell.id}>
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
        <div className='max-w-[900px] mx-auto flex items-center justify-end'>
          <span className='mr-2 font-bold'>Sub Total</span>
          <span>{`$${calcSubTotal()}`}</span>
        </div>
      </div>
    </div>
  )
}


export default Cart