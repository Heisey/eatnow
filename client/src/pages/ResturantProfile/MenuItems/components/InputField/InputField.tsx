
import * as React from 'react'
import * as ReactForm from 'react-hook-form'

import * as Utils from '@/utils'
import * as Validate from '@/validation'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export interface InputFieldProps extends React.PropsWithChildren {
  field: keyof Omit<Validate.MenuItemValidate, 'createdAt' | 'updatedAt'>
  placeholder: string
  type?: 'string' | 'number'
  register: ReactForm.UseFormRegisterReturn<keyof Omit<Validate.MenuItemValidate, 'createdAt' | 'updatedAt'>>
  form: ReactForm.UseFormReturn<Validate.MenuItemValidate, any, undefined>
}


const InputField: React.FC<InputFieldProps> = (props) => {


 return (
  <FormField
    control={props.form.control}
    name={props.field}
    render={() => (
      <FormItem>
        <FormLabel>
          {Utils.string.capitalizeAllWords(props.field)}
        </FormLabel>
        <FormControl>
          <Input
            { ...props.register }
            placeholder={props.placeholder}
            className='bg-white'
            type={props.type || 'string'}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
}


export default InputField