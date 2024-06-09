
import * as Lucide from 'lucide-react'
import * as React from 'react'
import * as ZHook from '@hookform/resolvers/zod'
import * as ReactForm from 'react-hook-form'

import * as Core from '@/core'
import * as Hooks from '@/hooks'
import * as Utils from '@/utils'
import * as Validate from '@/validation'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'



import * as Validator from 'zod'

interface RenderFieldArgs {
  field: keyof Omit<Validate.MenuItemValidate, 'createdAt' | 'updatedAt'>
  placeholder: string
  type?: 'string' | 'number'
  register: ReactForm.UseFormRegisterReturn<keyof Omit<Validate.MenuItemValidate, 'createdAt' | 'updatedAt'>>
}


export interface MenuItemsProps extends React.PropsWithChildren {


}


const MenuItems: React.FC<MenuItemsProps> = (props) => {

  const auth = Hooks.common.useAuth()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const menuItems = Hooks.menu.useGetAllByResturantId(user.data?.resturantId)
  const createMenuItem = Hooks.resturant.useCreateMenuItem()
  const [showInput, toggleShowInput] = Hooks.common.useToggle()
  const logoImage = Hooks.common.useImagePreview(null)

  const form = Hooks.common.useForm<Validate.MenuItemValidate>({
    resolver: ZHook.zodResolver(Validate.menuItem),
    defaultValues: {
      name: '',
      price: 0,
      resturantId: '',
      ingredients: '',
      description: '',
      image: ''
    }
  })

  React.useEffect(() => {
    if (!form.getValues('resturantId') && user.data?.resturantId) form.reset(dataSet => ({ ...dataSet, resturantId: user.data?.resturantId! }))
  }, [user.data?.resturantId])

  if (user.isLoading || menuItems.isLoading) return <div>loading</div>

  
  const nameRegister = form.register('name')
  const priceRegister = form.register('price')
  const descriptionRegister = form.register('description')
  const ingredientsRegister = form.register('ingredients')
  const imageRegister = form.register('image')
  
  const onChangeLogo =  (args: React.ChangeEvent<HTMLInputElement>) => {
    const file = args.target.files ? args.target.files[0] : null

    if (!file) return

    logoImage.updatePreview(file)

    form.setValue('image', 'imagePlaceholder', { shouldDirty: true, shouldTouch: true, shouldValidate: true })
  }

  const renderField = (args: RenderFieldArgs) => (
    <FormField
      control={form.control}
      name={args.field}
      render={() => (
        <FormItem>
          <FormLabel>
            {Utils.string.capitalizeAllWords(args.field)}
          </FormLabel>
          <FormControl>
            <Input
              { ...args.register }
              placeholder={args.placeholder}
              className='bg-white'
              type={args.type || 'string'}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  const renderTextArea = (args: RenderFieldArgs) => (
    <FormField
      control={form.control}
      name={args.field}
      render={() => (
        <FormItem>
          <FormLabel>
            {Utils.string.capitalizeAllWords(args.field)}
          </FormLabel>
          <FormControl>
            <Textarea
              { ...args.register }
              placeholder={Utils.string.capitalize(args.placeholder || '')}
              className='bg-white'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  const renderCustomInput = () => (
    <div className='relative'>
      <label className='bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2' htmlFor='image'>Select image</label>
      <Input { ...imageRegister } onChange={onChangeLogo} id='image' type='file' hidden className='absolute  invisible' />
    </div>
  )

  const onCancel = () => {
    toggleShowInput()
    form.reset()
  }

  const onSave = async (args: Core.I.MenuItemInfo) => {
    
    form.resetField('image')
    if (!logoImage.file) return
    console.log('puppy image')
    const awsResponse = await Utils.aws.uploadImage(logoImage.file)
    console.log('puppy aws, ', awsResponse)
    if (!awsResponse) return
    form.setValue('image', awsResponse.Location)
    await createMenuItem.mutateAsync(args)
    console.log('puppy server')
    toggleShowInput()
  }

  const onSubmit = async () => {
    form.trigger()
    if (form.formState.isValid) await onSave(form.getValues())
  }

  const onErrors = (args: any) => console.log('puppy erros, ', args)

  const renderInput = () => (

    <Form { ...form}>
      <form onSubmit={form.handleSubmit(onSave)}>
        <div>
      <div className='flex flex-row items-end gap-2'>
        {renderField({ field: 'name', placeholder: 'Cheese Pizza', register: nameRegister })}
        {renderField({ field: 'price', placeholder: '0', type: 'number', register: priceRegister })}
      </div>

      {renderTextArea({ field: 'description', placeholder: 'very cheesy', register: descriptionRegister })}
      {renderTextArea({ field: 'ingredients', placeholder: 'Cheese, Sauce', register: ingredientsRegister })}



      <div className='flex items-cente justify-between'>
        <div className='h-[200px] bg-orange-500 w-[300px] flex items-center justify-center'>
          {!logoImage.preview && <Lucide.Image className='fill-white h-[100px] w-[100px] stroke-orange-500' />}
          <img src={logoImage.preview} className='h-[200px] w-auto cover' />
        </div>
        <div className='flex justify-end'>
          {!logoImage.preview && renderCustomInput()}
          {logoImage.preview && <Button type='button' className='bg-orange-500 text-white' onClick={() => logoImage.updatePreview(null)}>Clear Image</Button>}
        </div>
      </div>
      
      <DialogFooter className='mt-4 flex justify-end'>
        <Button type='button' onClick={onCancel} className='mr-2'>Cancel</Button>
        <Button type='submit' disabled={!form.formState.isValid} className='bg-orange-500'>Save</Button>
      </DialogFooter>
      
        </div>
      </form>
    </Form>
  )

  return (
    <div className='p-3'>
      <Dialog open={showInput}>

      {(menuItems.data || [] ).length === 0 && <h2>You have not created any items yet</h2>}
      {(menuItems.data || []).length > 0 && menuItems.data?.map(dataSet => <span>{dataSet.id}</span>)}
      <Button type='button' disabled={showInput} onClick={toggleShowInput}>Create Menu Item</Button>
      
            <DialogContent>
              {renderInput()}
            </DialogContent>
      </Dialog>
    </div>
  )
}

export default MenuItems