

import * as React from 'react'

import * as Hooks from '@/hooks'
import * as Utils from '@/utils'
import { DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

export interface AddItemProps extends React.PropsWithChildren {


}


const AddItem: React.FC<AddItemProps> = (props) => {

  const auth = Hooks.common.useAuth()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const resturant = Hooks.resturant.useGetById(user.data?.resturantId)
  const menu = Hooks.menu.useGetById(resturant.data?.menuId)
  const menuItems = Hooks.menu.useGetAllByResturantId(user.data?.resturantId)
  const [itemSelectOpen, toggleItemSelectOpen] = Hooks.common.useToggle()
  const [menuItemSelected, menuItemSelectedHandler] = React.useState<string>('')

  const categories = Object.keys(menu.data || {}).filter(dataSet => dataSet !==  '__v').filter(dataSet => dataSet !== 'id')

  return (
    <DialogContent>
      <div>
        <h2>Category</h2>
        <RadioGroup defaultValue={categories[0]} className='flex justify-between'>
          {categories.map(dataSet => (
            <div className='flex align-center justify-center'>
              <RadioGroupItem value={dataSet} id={dataSet} className='mr-2' />
              <Label htmlFor={dataSet}>{dataSet}</Label>
            </div>
          ))}
        </RadioGroup>

        <Popover open={itemSelectOpen} onOpenChange={toggleItemSelectOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline' role='combobox' aria-expanded={itemSelectOpen}>
              {menuItemSelected && menuItems.data?.find(dataSet => dataSet.id === menuItemSelected) ? menuItems.data.find(dataSet => dataSet.id === menuItemSelected)?.name : 'Select Item'}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder='Search Menu Items' />

              <CommandList>
                <CommandEmpty>No Menu Item Found</CommandEmpty>
              <CommandGroup>
                {(menuItems.data || []).map(dataSet => (
                  <CommandItem 
                    key={dataSet.id} 
                    value={dataSet.id} 
                    onSelect={data => {
                      menuItemSelectedHandler(data)
                      toggleItemSelectOpen()
                    }}
                  >
                    {Utils.string.capitalizeAllWords(dataSet.name)}
                  </CommandItem>
                ))}
              </CommandGroup>
                </CommandList>
            </Command>
            <Button>Add</Button>
          </PopoverContent>
        </Popover>
      </div>
    </DialogContent>
  )
}


export default AddItem