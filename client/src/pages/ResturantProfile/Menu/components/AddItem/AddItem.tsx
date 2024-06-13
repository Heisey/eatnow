

import * as React from 'react'

import * as Core from '@/core'
import * as Hooks from '@/hooks'
import * as Utils from '@/utils'
import { DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

type Categories = keyof typeof Core.keys.menuCategories

export interface AddItemProps extends React.PropsWithChildren {
  categories: [Categories]
  closeModal: () => void
}

const AddItem: React.FC<AddItemProps> = (props) => {

  const auth = Hooks.common.useAuth()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const resturant = Hooks.resturant.useGetById(user.data?.resturantId)
  const menu = Hooks.menu.useGetById(resturant.data?.menuId)
  const menuItems = Hooks.menu.useGetAllByResturantId(user.data?.resturantId)
  const updateMenu = Hooks.menu.useUpdateById()
  const addItemToMenu = Hooks.menu.useAddItem()
  const [itemSelectOpen, toggleItemSelectOpen] = Hooks.common.useToggle()
  const [menuItemSelected, menuItemSelectedHandler] = React.useState<string>('')
  const [categorySelected, categorySelectedHandler] = React.useState<Categories>(props.categories[0])

  const onSave = async () => {
    if (!menu.data) return
    await addItemToMenu.mutateAsync({ menuId: menu.data.id, category: categorySelected, menuItemId: menuItemSelected })
    // const oldMenuSection = menu.data[categorySelected]
    // const menuItem = menuItems.data?.filter(dataSet => dataSet.id === menuItemSelected)[0]
    // const updatedMenu: Core.I.MenuInfo = { ...menu.data, [categorySelected]: oldMenuSection ? [ ...oldMenuSection, menuItem] : [menuItem]}
    // await updateMenu.mutateAsync({ ...updatedMenu, id: menu.data.id })
    menu.refetch()
    props.closeModal()
  }

  const buttonDisabled = () => menuItemSelected === ''

  return (
    <DialogContent>
      <div>
        <h2>Category</h2>
        <RadioGroup defaultValue={categorySelected} className='flex justify-between' onValueChange={dataSet => categorySelectedHandler(dataSet)}>
          {props.categories.map(dataSet => (
            <div className='flex align-center justify-center'>
              <RadioGroupItem value={dataSet} id={dataSet} className='mr-2'  />
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
          </PopoverContent>
          <Button disabled={buttonDisabled()} onClick={onSave}>Add</Button>
        </Popover>
      </div>
    </DialogContent>
  )
}


export default AddItem