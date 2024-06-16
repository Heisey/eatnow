

import * as React from 'react'
import * as ZHook from '@hookform/resolvers/zod'

import * as Hooks from '@/hooks'
import * as Utils from '@/utils'
import * as Validation from '@/validation'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'


export interface LoginFormProps extends React.PropsWithChildren {


}


const LoginForm: React.FC<LoginFormProps> = (props) => {

  const form = Hooks.common.useForm<Validation.LoginValidate>({
    resolver: ZHook.zodResolver(Validation.login),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const renderField = (field: 'email' | 'password') => (
    <FormField
      control={form.control}
      name={field}
      render={(args) => (
        <FormItem>
          <FormLabel>
            {Utils.string.capitalizeAllWords(field)}
          </FormLabel>
          <FormControl>
            <Input { ...args.field } />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  return (
    <Form { ...form }>
      <form>
        {renderField('email')}
        {renderField('password')}
        <Button type='submit'>Login</Button>
      </form>
    </Form>
  )
}


export default LoginForm