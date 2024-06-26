

import * as Lucide from 'lucide-react'
import * as React from 'react'
import * as ZHook from '@hookform/resolvers/zod'

import * as Core from '@/core'
import * as Hooks from '@/hooks'
import * as Utils from '@/utils'
import * as Validate from '@/validation'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'

export interface DetailsProps extends React.PropsWithChildren {

}

interface RenderField {
  field: keyof Omit<Validate.ResturantProfileValidation, 'cuisine' | 'menu' | 'logo' | 'coverImage' | 'menuItemsCreated'>
  label?: string
  className?: string
  type?: 'string' | 'number'
}

const Details: React.FC<DetailsProps> = () => {

  const auth = Hooks.common.useAuth()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const resturant = Hooks.resturantProfile.useGetById(user.data?.resturantId)
  const createResturant = Hooks.resturantProfile.useCreate()
  const logoImage = Hooks.common.useImagePreview(null)
  const navigate = Hooks.common.useNavigate()

  const [logoModalOpen, toggleLogoModalOpen] = Hooks.common.useToggle()

  const form = Hooks.common.useForm<Validate.ResturantProfileValidation>({
    resolver: ZHook.zodResolver(Validate.resturantProfile),
    defaultValues: {
      cuisine: [],
      userId: '',
      address: '',
      name: '',
      city: '',
      country: '',
      deliveryPrice: 0,
      logo: '',
      coverImage: ''

    }
  })

  React.useEffect(() => {
    if (resturant.data) form.reset((dataSet) => ({ ...dataSet, ...resturant.data}))
  }, [resturant.data])

  const cuisineArr = Object.keys(Core.keys.cuisine).map(dataSet => ({ label: dataSet, value: Core.keys.cuisine[dataSet as keyof typeof Core.keys.cuisine]}))

  if (user.isLoading) return <div>Loading</div>

  if (user.data?.id) form.setValue('userId', user.data.id)

  const renderField = (args: RenderField) => (
    <FormField 
      control={form.control} 
      name={args.field}
      render={(dataset) => (
        <FormItem className={`flex-1 mt-4 ${args.className}`}>
          <FormLabel>{args.label ? Utils.string.capitalizeAllWords(args.label) : Utils.string.capitalize(args.field)}</FormLabel>
          <FormControl>
            <Input { ...dataset.field } type={args.type || 'string'} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
    />
  )

  const renderLogoField = () => (
    <FormField
      control={form.control}
      name={'logo'}
      render={data => (
        <FormItem>
          <div className=''>
            <FormLabel>
              Drag or select file
            </FormLabel>
            <FormControl className='w-[40%]'>
              <Input
                className='bg-white'
                type='file'
                accept='.jpg, .jpeg, .png'
                onChange={e => data.field.onChange(onChangeLogo(e))}
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )

  const renderCuisineField = () => (
    <FormField 
      control={form.control} 
      name='cuisine' 
      render={(args) => (
        <FormItem>
          <div className='grid md:grid-cols-5 gap-1'>
            {cuisineArr.map(dataSet => (
              <FormItem key={dataSet.label} className='flex flex-row items-center space-x-1 space-y-0 mt-4'>
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
      )
    }
    />
  )

  const onChangeLogo =  (args: React.ChangeEvent<HTMLInputElement>) => {
    const file = args.target.files ? args.target.files[0] : null

    if (!file) return

    logoImage.updatePreview(file)

    return file
  }

  const onSave = async (args: Validate.ResturantProfileValidation) => {
    await createResturant.mutateAsync(args)
    if (createResturant.isSuccess) navigate(Core.keys.paths.RESTURANT_PROFILE_OVERVIEW)
  }

  const uploadLogo = async () => {
    if (!logoImage.file) return
    const logo = await Utils.aws.uploadImage(logoImage.file)
    if (!logo) return
    form.setValue('logo', logo.Location)
    toggleLogoModalOpen()
  }

  const closeLogoModal = () => {
    logoImage.updatePreview(null)
    toggleLogoModalOpen()
  }

  const renderLogo = () => (
    <div className='group relative w-full flex justify-center items-center'>
      <img src={form.getValues('logo') || resturant.data?.logo} className='h-[150px]' />
      <Button variant='ghost' className='border-4 border-orange-500 invisible absolute bottom-1 right-1 group-hover:visible hover:bg-orange-500 hover:border-transparent transition-all duration-300'>
        <Lucide.Pencil className='stroke-2 fill-orange-500' />
      </Button>
    </div>
  )

  return (
    <div className='p-3 w-full'>
      <Form {...form }>
        <Dialog open={logoModalOpen}>
          <form onSubmit={form.handleSubmit(onSave)}>
            <div className='flex items-center justify-center text-white font-bold tracking-wider text-xl-3 h-[300px] w-full bg-orange-500'>
              <h2 className='text-2xl font-bold'>{form.getValues('name') ? Utils.string.capitalizeAllWords(form.getValues('name')) : 'Resturant Name'}</h2>
              {/* <FormDescription>Enter Resturant Details</FormDescription> */}
            </div>

            <Card className='ml-[50px] w-[225px] h-[150px] flex items-center justify-center mt-[-30px]'>
              {(!!resturant.data?.logo || !!form.getValues('logo')) && renderLogo()}
              {(!resturant.data?.logo && !form.getValues('logo')) && <Button onClick={toggleLogoModalOpen} variant='ghost' type='button'>add logo</Button>}
            </Card>

            <div className='mt-4'>
              {renderField({ field: 'name' })}
              {renderField({ field: 'address' })}
              <div className='flex gap-4'>
                {renderField({ field: 'city'})}
                {renderField({ field: 'country'})}
              </div>
              {renderField({ field: 'deliveryPrice', type: 'number', label: 'delivery price', className: 'max-w-[25%]' })}
            </div>

            <div className='mt-4'>
              <p><span className='font-bold'>Select Cuisine you offer</span> <span>(must select atleast one)</span></p>
              {renderCuisineField()}
            </div>
            <div className='flex justify-end'>
              <Button type='submit' className='ml-auto mt-4 bg-orange-500'>Submit</Button>
            </div>
          </form>

          <DialogContent className='flex flex-col max-w-[900px] max-h-[600px] w-full h-full p-1'>
            <div className='grow border-2 border-b-orange-500 mt-[50px]'>
            {(!resturant.data?.logo && !logoImage.preview) && renderLogoField()}
            {(!!resturant.data?.logo || !!logoImage.preview) && <img src={resturant.data?.logo || logoImage.preview} className='max-h-[500px]' />}
            </div>
            <DialogFooter>
              {(!!resturant.data?.logo || !!logoImage.preview) && <Button onClick={() => logoImage.updatePreview(null)}>Change</Button>}
              <Button type='submit' onClick={closeLogoModal} className='bg-red-500 text-white'>Cancel</Button>
              <Button onClick={uploadLogo} disabled={!logoImage.preview} className='bg-orange-500 text-white'>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </Form>
    </div>
  )
}


export default Details