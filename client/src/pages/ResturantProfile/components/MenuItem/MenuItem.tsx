

import * as React from 'react'
import * as ReactForm from 'react-hook-form'

import * as Utils from '@/utils'
import * as Validate from '@/validation'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export interface MenuItemProps extends React.PropsWithChildren {
  form: ReactForm.UseFormReturn<Validate.ResturantProfileValidation, any, undefined>
  index: number
  name: 'menu.appetizers'
  onRemove: () => void
}


const MenuItem: React.FC<MenuItemProps> = (props) => {
  const renderField = (field: 'name' | 'price', placeholder: string) => (
    <FormField
      control={props.form.control}
      name={`${props.name}.${props.index}.${field}`}
      render={data => (
        <FormItem>
          <FormLabel>
            {Utils.string.capitalizeAllWords(field)}
          </FormLabel>
          <FormControl>
            <Input
              { ...data.field }
              placeholder={placeholder}
              className='bg-white'
            />
          </FormControl>
        </FormItem>
      )}
    />
  )


  return (
    <div className='flex flex-row items-end gap-2'>
      {renderField('name', 'Cheese Pizza')}
      {renderField('price', '0.00')}

      <Button type='button' onClick={props.onRemove} className='bg-red-500 max-h-fit'>Remove</Button>
    </div>
  )
}


export default MenuItem