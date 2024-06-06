

import * as React from 'react'
import * as ReactForm from 'react-hook-form'

import * as Validate from '@/validation'
import { FormDescription, FormField, FormItem } from '@/components/ui/form'

import MenuItem from '../MenuItem'
import { Button } from '@/components/ui/button'

export interface MenuProps extends React.PropsWithChildren {
  form: ReactForm.UseFormReturn<Validate.ResturantProfileValidation, any, undefined>
}


const Menu: React.FC<MenuProps> = (props) => {

  const appetizers = ReactForm.useFieldArray({
    control: props.form.control,
    name: 'menu.appetizers'
  })

  const mains = ReactForm.useFieldArray({
    control: props.form.control,
    name: 'menu.mains'
  })

  const drinks = ReactForm.useFieldArray({
    control: props.form.control,
    name: 'menu.drinks'
  })

  const deserts = ReactForm.useFieldArray({
    control: props.form.control,
    name: 'menu.deserts'
  })

 return (
   <div className='space-y-2'>
    <div>
      <h2 className='text-2xl font-bold'>Menu</h2>
      <FormDescription>
        Create your menu
      </FormDescription>
    </div>
    <FormField 
      control={props.form.control} 
      name='menu.appetizers' 
      render={args => {
        // console.log('puppy args, ', args)
        return (
          <FormItem className='flex flex-col gap-2'>
          {appetizers.fields.map((data, index) => (
            <MenuItem
              form={props.form}
              index={index}
              name='menu.appetizers'
              key={data.id}
              onRemove={() => appetizers.remove(index)}
            />
          ))}
        </FormItem>
        )
      }} 
    />
    <Button type='button' onClick={() => appetizers.append({ name: '', price: 0, ingredients: [], description: '', id: ''})}>Add Appetizer</Button>
   </div>
 )
}


export default Menu