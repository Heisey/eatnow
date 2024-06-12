

import * as React from 'react'
import * as ReactTable from '@tanstack/react-table'

import * as Core from '@/core'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export interface TableProps extends React.PropsWithChildren {
  columns: ReactTable.AccessorColumnDef<Core.I.MenuItemRecord, any>[]
  data: Core.I.MenuItemRecord[]

}

const ItemsTable: React.FC<TableProps> = (props) => {

  const table = ReactTable.useReactTable({
    data: props.data || [],
    columns: props.columns,
    getCoreRowModel: ReactTable.getCoreRowModel()
  })

 return (
    <div className='w-full flex'>
      <Table className='max-w-[1000px]'>
        <TableHeader>
          {table.getHeaderGroups().map(dataSet => (
            <TableRow key={dataSet.id}>
              {dataSet.headers.map(data => (
                <TableHead key={data.id}>
                  {data.isPlaceholder ? null : ReactTable.flexRender(data.column.columnDef.header, data.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => {
                console.log('puppy testing, ', cell.column.columnDef.cell)
                return (
                  <TableCell key={cell.id}>
                    {ReactTable.flexRender(cell.column.columnDef.cell, cell.getContext())}
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


export default ItemsTable