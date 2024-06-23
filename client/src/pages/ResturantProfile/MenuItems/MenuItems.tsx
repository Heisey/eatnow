
import * as Lucide from 'lucide-react'
import * as React from 'react'
import * as ZHook from '@hookform/resolvers/zod'
import * as ReactTable from '@tanstack/react-table'

import * as Core from '@/core'
import * as Hooks from '@/hooks'
import * as Utils from '@/utils'
import * as Validate from '@/validation'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'

import InputField from './components/InputField'
import ItemsTable from './components/ItemsTable'
import TextAreaField from './components/TextAreaField'

export interface MenuItemsProps extends React.PropsWithChildren {

}

const MenuItems: React.FC<MenuItemsProps> = (props) => {

  const auth = Hooks.common.useAuth()
  const user = Hooks.user.useGetUserByEmail(auth.user?.email)
  const menuItems = Hooks.menu.useGetAllByResturantId(user.data?.resturantId)
  const createMenuItem = Hooks.resturantProfile.useCreateMenuItem()
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

  if (auth.isLoading || user.isLoading || menuItems.isLoading) return <div>loading</div>

  const columnConfig = ReactTable.createColumnHelper<Core.I.MenuItemRecord>()

  const columns = [
    columnConfig.accessor('image', { header: '', cell: dataSet => <img src={dataSet.getValue()} className='h-[75px] w-auto' alt='image of food' />}),
    columnConfig.accessor('name', { header: 'Name', cell: dataSet => Utils.string.capitalizeAllWords(dataSet.getValue())}),
    columnConfig.accessor('price', { header: 'Price', cell: dataSet => `$${dataSet.getValue()}`}),
    columnConfig.accessor('menuId', { header: 'On Menu', cell: dataSet => dataSet.getValue() ? 'Yes' : 'No'}),
    columnConfig.accessor('updatedAt', { header: 'Last Updated', cell: dataSet => dataSet.getValue()}),
  ]
  
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

  const renderImageInput = () => (
    <div className='relative'>
      <label className='bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2' htmlFor='image'>Select image</label>
      <Input { ...imageRegister } onChange={onChangeLogo} id='image' type='file' hidden className='absolute  invisible' />
    </div>
  )

  const onCancel = () => {
    toggleShowInput()
    form.reset()
  }

  const onSave = async () => {
    form.resetField('image')
    if (!logoImage.file) return
    const awsResponse = await Utils.aws.uploadImage(logoImage.file)
    if (!awsResponse?.Location) return
    form.setValue('image', awsResponse.Location)
    await createMenuItem.mutateAsync(form.getValues())
    logoImage.updatePreview(null)
    form.reset()
    toggleShowInput()
  }

  const renderForm = () => (
    <Form { ...form}>
      <form onSubmit={form.handleSubmit(onSave)}>
        <div>
          <div className='flex flex-row items-end gap-2'>
            <InputField field='name' placeholder='Cheese Pizza' register={nameRegister} form={form} />
            <InputField field='price' placeholder='0' register={priceRegister} form={form} />
          </div>

          <TextAreaField field='description' placeholder='very cheesy' register={descriptionRegister} form={form} />
          <TextAreaField field='ingredients' placeholder='Cheese Sauce' register={ingredientsRegister} form={form} />

          <div className='flex items-cente justify-between'>
            <div className='h-[200px] bg-orange-500 w-[300px] flex items-center justify-center'>
              {!logoImage.preview && <Lucide.Image className='fill-white h-[100px] w-[100px] stroke-orange-500' />}
              <img src={logoImage.preview} className='h-[200px] w-auto cover' />
            </div>
            <div className='flex justify-end'>
              {!logoImage.preview && renderImageInput()}
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
    <div className='p-3 w-full'>
      <Dialog open={showInput}>
        <div className='flex justify-end py-4'>
          <Button type='button' disabled={showInput} onClick={toggleShowInput}>Create Menu Item</Button>
        </div>
        {(menuItems.data || []).length > 0 && <ItemsTable columns={columns} data={menuItems.data!} />} 
        {(menuItems.data || [] ).length === 0 && <h2>You have not created any items yet</h2>}

        <DialogContent>
          {renderForm()}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MenuItems