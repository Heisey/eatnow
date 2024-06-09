
import * as React from 'react'
import * as ReactForm from 'react-hook-form'

import * as Utils from '@/utils'
import * as Validate from '@/validation'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

export interface TextAreaFieldProps extends React.PropsWithChildren {
  field: keyof Omit<Validate.MenuItemValidate, 'createdAt' | 'updatedAt'>
  placeholder: string
  type?: 'string' | 'number'
  register: ReactForm.UseFormRegisterReturn<keyof Omit<Validate.MenuItemValidate, 'createdAt' | 'updatedAt'>>
  form: ReactForm.UseFormReturn<Validate.MenuItemValidate, any, undefined>
}


const TextAreaField: React.FC<TextAreaFieldProps> = (props) => {


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
          <Textarea
            { ...props.register }
            placeholder={Utils.string.capitalize(props.placeholder || '')}
            className='bg-white'
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
}


export default TextAreaField