

import * as React from 'react'
import * as Router from 'react-router-dom'
import * as ZHook from '@hookform/resolvers/zod'

import * as Api from '@/api'
import * as Hooks from '@/hooks'
import * as Validate from '@/validation'
import ProtectedRoute from '@/components/hoc/ProtectedRoute'
import Sidebar from '@/components/custom/Sidebar'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'

import Cuisine from '../components/Cuisine'
import Details from '../components/Details'
import ImageUpload from '../components/ImageUpload'
import Menu from '../components/Menu'
import LoadingButton from '@/components/custom/LoadingButton'

export interface ResturantProfileProps extends React.PropsWithChildren {


}


const ResturantProfile: React.FC<ResturantProfileProps> = (props) => {

  const form = Hooks.common.useForm<Validate.ResturantProfileValidation>({
    resolver: ZHook.zodResolver(Validate.resturantProfile),
    defaultValues: {
      cuisine: [],
      userId: 'a',
      // name: '',
      // address: '',
      // city: '',
      // country: '',
      // deliveryPrice: 3,
      // logo: '',
      // coverImage: '',
      // menu: {
      //   appetizers: { }
      // }
    }
  })

  const onSave = (data: any) => {
    console.log('puppy submit', form.getValues(), form.formState.errors, form.formState.isValid)
    console.log('puppy data, ', data)
    // form.handleSubmit(Api.resturant.create)

    console.log('userId, ', form.formState.errors['userId'])
    console.log('name, ', form.formState.errors['name'])
    console.log('address, ', form.formState.errors['address'])
    console.log('city, ', form.formState.errors['city'])
    console.log('country, ', form.formState.errors['country'])
    console.log('deliveryPrice, ', form.formState.errors['deliveryPrice'])
    console.log('logo, ', form.formState.errors['logo'])
    console.log('coverImage, ', form.formState.errors['coverImage'])
    console.log('cuisine, ', form.formState.errors['cuisine'])
    // e.preventDefault()
  }

  return (
    <div className='flex'>
      <Sidebar />
      <Router.Outlet />
      {/* <Form { ...form }>
        <form onSubmit={form.handleSubmit(Api.resturant.create)}>
          <Details form={form} />
          <Separator />
          <Cuisine form={form} />
          <Separator />
          <Separator />
          <ImageUpload form={form} />
          <LoadingButton isLoading={false} type='submit'>Submit</LoadingButton>
        </form>
      </Form> */}
    </div>
  )
}


export default ResturantProfile
// export default ProtectedRoute(ResturantProfile)