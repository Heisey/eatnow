

import * as React from 'react'
import * as ReactTable from '@tanstack/react-table'

import * as Core from '@/core'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export interface MenuTableProps extends React.PropsWithChildren {
  columns: ReactTable.AccessorColumnDef<Core.I.MenuRecord, any>[]
  data: Core.I.MenuRecord
}

const MenuTable: React.FC<MenuTableProps> = (props) => {

  const table = ReactTable.useReactTable({
    data: props.data.appetizers || [],
    columns: props.columns,
    getCoreRowModel: ReactTable.getCoreRowModel()
  })

  return (
    <div>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map(row => (
            <TableRow key={row.id}>
              {row.headers.map(cell => (
                <TableHead key={cell.id}>
                  {cell.isPlaceholder ? null : ReactTable.flexRender(cell.column.columnDef.header, cell.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow id={row.id}>
              {row.getVisibleCells().map(cell => {
                console.log('puppy cell, ', cell.column.columnDef.cell)
                return (
                  <TableCell key={cell.id}>
                    {/* {cell.column.columnDef.cell || cell.getContext() || ''} */}
                    {ReactTable.flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {/* {cell.column.columnDef.cell || ''} */}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


export default MenuTable