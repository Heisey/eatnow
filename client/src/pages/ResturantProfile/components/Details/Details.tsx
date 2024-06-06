

import * as React from 'react'
import * as ReactHookForm from 'react-hook-form'

import * as Utils from '@/utils'
import * as Validate from '@/validation'
import { FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export interface DetailsProps extends React.PropsWithChildren {
  form: ReactHookForm.UseFormReturn<Validate.ResturantProfileValidation, any, undefined>

}

interface RenderField {
  field: keyof Omit<Validate.ResturantProfileValidation, 'cuisine' | 'menu' | 'logo' | 'coverImage'>
  label?: string
  className?: string
  type?: 'string' | 'number'
}


const Details: React.FC<DetailsProps> = (props) => {

  const renderField = (args: RenderField) => (
    <FormField 
      control={props.form.control} 
      name={args.field}
      render={(dataset) => (
        <FormItem className={`flex-1 ${args.className}`}>
          <FormLabel>{args.label ? Utils.string.capitalizeAllWords(args.label) : Utils.string.capitalize(args.field)}</FormLabel>
          <FormControl>
            <Input { ...dataset.field } type={args.type || 'string'} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
    />
  )

 return (
   <div className='space-y-2'>
    <div>
      <h2 className='text-2xl font-bold'>Details</h2>
      <FormDescription>Enter Resturant Details</FormDescription>
    </div>
    <div>
      {renderField({ field: 'name' })}
      {renderField({ field: 'address' })}
      <div className='flex gap-4'>
        {renderField({ field: 'city'})}
        {renderField({ field: 'country'})}
      </div>
      {renderField({ field: 'deliveryPrice', type: 'number', label: 'delivery price', className: 'max-w-[25%]' })}
    </div>
   </div>
 )
}


export default Details