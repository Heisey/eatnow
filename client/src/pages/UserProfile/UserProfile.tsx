

import * as React from 'react'
import * as ZHook from '@hookform/resolvers/zod'
import * as Sonner from 'sonner'

import * as Core from '@/core'
import * as Hooks from '@/hooks'
import * as Validate from '@/validation'
import LoadingButton from '@/components/custom/LoadingButton'
import ProtectedRoute from '@/components/hoc/ProtectedRoute'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export interface UserProfileProps extends React.PropsWithChildren {


}

interface UserInfoForm extends Core.I.UserInfo, Omit<Core.I.Credentials, 'firebaseId'> {}

type FormFields = keyof UserInfoForm

const UserProfile: React.FC<UserProfileProps> = () => {

  const auth = Hooks.common.useAuth()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const updateUser = Hooks.user.useUpdateById()
  
  const form = Hooks.common.useForm<Validate.UserProfileValidate>({ 
    resolver: ZHook.zodResolver(Validate.userProfile),
    defaultValues: {
      email: user.data?.email || '',
      name: user.data?.name || '',
      address: user.data?.address || '',
      city: user.data?.city || '',
      country: user.data?.country || '',
      id: user.data?.country || ''
    }
  })

  if (user.isLoading || auth.isLoading) return <div>is Loading</div>

  if (!user.data?.id && !user.isLoading) return <div>failed to load user</div>

  // Load Form with values from server
  // React.useEffect(() => {
  //   if (!form.getValues('id') && user.data?.id) form.reset((dataSet) => ({ ...dataSet, ...user.data }))
  // }, [user.data?.id])

  // Shows toast notification on success
  React.useEffect(() => {
    if (updateUser.isSuccess) Sonner.toast.success('User Profile Updated')
    else if (updateUser.isError) Sonner.toast.error('Something went wrong')
  }, [form.formState.isSubmitSuccessful])

  const renderField = (field: FormFields, disabled?: boolean) => (
    <FormField 
      control={form.control} 
      name={field}
      disabled={disabled}
      render={(args) => (
        <FormItem className='flex-1'>
          <FormLabel>{field.toUpperCase()}</FormLabel>
          <FormControl>
            <Input { ...args.field } />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
    />
  )

  const loadingButtonClassName = () => {
    let result = ''
    if (updateUser.isPending) result = `${result} bg-organge-500`
    return result
  }

  const loadingButtonText = () => updateUser.isPending ? 'Loading' : 'Submit'

  const onSave = (args: Core.I.UserEntityInfo) => {
    
    updateUser.mutateAsync({ ...args, id: user.data?.id! })
  }

  return (
    <div className='space-y-4 bg-gray-50 rounded-lg md:p10'>
      <div>
        <h2 className='text-2xl font-bold'>User Profile Form</h2>
      </div>
      <Form { ...form }>
        <form onSubmit={form.handleSubmit(onSave)}>
          {renderField('email', true)}
          {renderField('name')}
          <div className='flex flex-col md:flex-row gap-4'>
            {renderField('address')}
            {renderField('city')}
            {renderField('country')}
          </div>
          <LoadingButton className={loadingButtonClassName()} disabled={!form.formState.isValid} type='submit'>{loadingButtonText()}</LoadingButton>
        </form>
      </Form>
    </div>
  )
}


export default ProtectedRoute(UserProfile)