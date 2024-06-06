

import * as React from 'react'
import * as ReactHookForm from 'react-hook-form'

import * as Core from '@/core'
import * as Validate from '@/validation'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'

export interface CuisineProps extends React.PropsWithChildren {
  form: ReactHookForm.UseFormReturn<Validate.ResturantProfileValidation, any, undefined>
}


const Cuisine: React.FC<CuisineProps> = (props) => {

  const cuisineArr = Object.keys(Core.keys.cuisine).map(dataSet => ({ label: dataSet, value: Core.keys.cuisine[dataSet as keyof typeof Core.keys.cuisine]}))

  return (
    <div className='space-y-2'>
      <h2 className='text-2xl font-bold'>Cuisines</h2>
      <FormDescription>
        Select the cuisines that your resturant offers
      </FormDescription>
      <FormField 
        control={props.form.control} 
        name='cuisine' 
        render={(args) => (
          <FormItem>
            <div className='grid md:grid-cols-5 gap-1'>
              {cuisineArr.map(dataSet => (
                <FormItem key={dataSet.label} className='flex flex-row items-center space-x-1 space-y-0 mt-2'>
                  <FormControl>
                    <Checkbox 
                      checked={args.field.value.includes(dataSet.value)}
                      onCheckedChange={checked => {
                        if (checked) return args.field.onChange([ ...args.field.value, dataSet.value ])
                        else return args.field.onChange(args.field.value.filter(data => data !== dataSet.value))
                      }}
                    />
                  </FormControl>
                  <FormLabel className='text-sm font-normal'>
                    {dataSet.label}
                  </FormLabel>
                </FormItem>
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}


export default Cuisine