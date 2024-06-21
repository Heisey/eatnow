

import * as React from 'react'
import * as ReactTable from '@tanstack/react-table'

import * as Core from '@/core'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export interface MenuTableProps extends React.PropsWithChildren {
  columns: ReactTable.AccessorColumnDef<Core.I.MenuItemRecord, any>[]
  data?: Core.I.MenuItemRecord[]
}

const MenuTable: React.FC<MenuTableProps> = (props) => {

  if ((props.data || []).length === 0) return <div>Nothing to display</div>

  const table = ReactTable.useReactTable({
    data: props.data || [],
    columns: props.columns,
    getCoreRowModel: ReactTable.getCoreRowModel()
  })


  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(row => (
            <TableRow key={row.id}>
              {row.headers.map(cell => (
                <TableHead key={cell.id} className='max-w-[50px]'>
                  {cell.isPlaceholder ? null : ReactTable.flexRender(cell.column.columnDef.header, cell.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow id={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className={`max-w-[50px]`}>
                  {ReactTable.flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


export default MenuTable