

import * as React from 'react'
import * as ZHook from '@hookform/resolvers/zod'
import * as Sonner from 'sonner'

import * as App from '@/App'
import * as Core from '@/core'
import * as Hooks from '@/hooks'
import * as Validate from '@/validation'

import LoadingButton from '@/components/custom/LoadingButton'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export interface ProfileFormProps extends React.PropsWithChildren {
  onSave: (args: Validate.UserProfileValidate) => void
  isLoading: boolean
}

interface UserInfoForm extends Core.I.UserInfo, Omit<Core.I.Credentials, 'auth0id'> {}

type FormFields = keyof UserInfoForm

const ProfileForm: React.FC<ProfileFormProps> = (props) => {

  const appCtx = App.Ctx.useContext()

  const [defaultUser, defaultUserHandler] = React.useState<Core.I.UserRecord | undefined>(appCtx.user)

  const form = Hooks.common.useForm<Validate.UserProfileValidate>({ 
    resolver: ZHook.zodResolver(Validate.userProfile),
    defaultValues: {
      email: '',
      name: '',
      address: '',
      city: '',
      country: '',
      id: ''
    }
  })

  // Loads default user into form
  React.useEffect(() => {
    if (!defaultUser && appCtx.user) defaultUserHandler(appCtx.user)
    form.reset(defaultUser)
  }, [defaultUser, appCtx.user, defaultUserHandler])

  // Shows toast notification on success
  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) Sonner.toast.success('User Profile Updated')
  }, [form.formState.isSubmitSuccessful])

  const buttonDisabled = () => {
    let result = true
    const values = Object.values(form.formState.touchedFields)
    values.map(dataSet => {
      if (dataSet) result = false
    })
    return result
  }

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
    if (props.isLoading) result = `${result} bg-organge-500`
    return result
  }

  const loadingButtonText = () => props.isLoading ? 'Loading' : 'Submit'

  return (
    <Form { ...form }>
      <form onSubmit={form.handleSubmit(props.onSave)}>
        {renderField('email', true)}
        {renderField('name')}
        <div className='flex flex-col md:flex-row gap-4'>
          {renderField('address')}
          {renderField('city')}
          {renderField('country')}
        </div>
        <LoadingButton className={loadingButtonClassName()} disabled={buttonDisabled()} type='submit'>{loadingButtonText()}</LoadingButton>
      </form>
    </Form>
  )
}


export default ProfileForm