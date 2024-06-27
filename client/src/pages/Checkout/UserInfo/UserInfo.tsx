

import * as React from 'react'
import * as ZHook from '@hookform/resolvers/zod'

import * as Core from '@/core'
import * as Hooks from '@/hooks'
import * as Validate from '@/validation'
import * as Utils from '@/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export interface UserInfoProps extends React.PropsWithChildren {


}




const UserInfo: React.FC<UserInfoProps> = (props) => {

  const auth = Hooks.common.useAuth()
  const nav = Hooks.common.useNavigate()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const updateUser = Hooks.user.useUpdateById()

  if (auth.isLoading || user.isLoading) return <div>Loading</div>

  const form = Hooks.common.useForm<Validate.UserProfileValidate>({
    resolver: ZHook.zodResolver(Validate.userProfile),
    defaultValues: {
      email: auth.user?.email || '',
      id: user.data?.id || ''
    }
  })

  const renderField = (field: keyof Core.I.UserInfo, disabled?: boolean) => (
    <FormField
      control={form.control}
      name={field}
      disabled={disabled}
      render={(dataSet) => (
        <FormItem className='max-w-[50%]'>
          <FormLabel>{Utils.string.capitalizeAllWords(field)}</FormLabel>
          <FormControl>
            <Input { ...dataSet.field } />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  const onSave = async (args: Core.I.UserEntityInfo) => {
    await updateUser.mutateAsync({ ...user.data, ...args })
    if (updateUser.isSuccess) nav(Core.keys.paths.CHECKOUT_CART)
  }

  return (
    <div>
      <h2>Enter your information to proceed</h2>
      <Form { ...form }>
        <form onSubmit={form.handleSubmit(onSave)}>
          {renderField('name')}
          {renderField('address')}
          <div className='flex'>
            {renderField('city')}
            {renderField('country')}
          </div>
          <Button type='submit' disabled={!form.formState.isValid}>Proceed</Button>
        </form>
      </Form>
    </div>
  )
}


export default UserInfo