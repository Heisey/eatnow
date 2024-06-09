

import * as React from 'react'
import * as ReactForm from 'react-hook-form'

import * as Hooks from '@/hooks'
import * as Utils from '@/utils'
import * as Validate from '@/validation'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export interface ImageUploadProps extends React.PropsWithChildren {
  form: ReactForm.UseFormReturn<Validate.ResturantProfileValidation, any, undefined>
}

interface RenderFieldArgs {
  field: 'logo' | 'coverImage'
  label?: string
  onChangeImage: (args: React.ChangeEvent<HTMLInputElement>) => File | undefined
  onSave: () => void
  onClear: () => void
  preview?: string
}


const ImageUpload: React.FC<ImageUploadProps> = (props) => {

  const coverImage = Hooks.common.useImagePreview(null)
  const logoImage = Hooks.common.useImagePreview(null)

  const onChangeLogo =  (args: React.ChangeEvent<HTMLInputElement>) => {
    const file = args.target.files ? args.target.files[0] : null

    if (!file) return

    logoImage.updatePreview(file)

    return file
  }

  const onChangeCoverImage =  (args: React.ChangeEvent<HTMLInputElement>) => {
    const file = args.target.files ? args.target.files[0] : null

    if (!file) return

    coverImage.updatePreview(file)

    return file
  }

  const onSaveLogo = async () => {
    if (!logoImage.file) return
    const logo = await Utils.aws.uploadImage(logoImage.file)
    if (logo) props.form.setValue('logo', logo.Location)
  }

  const onSaveCoverImage = async () => {
    if (!coverImage.file) return
    const imgUrl = await Utils.aws.uploadImage(coverImage.file)
    if (imgUrl) props.form.setValue('coverImage', imgUrl.Location)
  }

  const renderField = (args: RenderFieldArgs) => (
    <FormField
      control={props.form.control}
      name={args.field}
      render={data => (
        <FormItem className='flex flex-col gap-2'>
          <div className='flex items-center gap-4'>
            <FormLabel className='w-[15%]'>
              {Utils.string.capitalizeAllWords(args.label || args.field)}
            </FormLabel>
            <FormControl className='w-[40%]'>
              <Input
                className='bg-white'
                type='file'
                accept='.jpg, .jpeg, .png'
                onChange={e => data.field.onChange(args.onChangeImage(e))}
              />
            </FormControl>
            {args.preview && <Button type='button' onClick={args.onSave}>Save</Button>}
            {args.preview && <Button type='button' onClick={args.onClear} className='bg-red-500'>Remove</Button>}
          </div>
          {args.preview && (
            <img className=''
              src={args.preview}

            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )

 return (
   <div className='space-y-2'>
    <div>
      <h2 className='text-2xl font-bold'>Image</h2>
      <FormDescription>
        Add images that will be displayed on your profile
      </FormDescription>
    </div>
    <div className='flex flex-col gap-8'>
      {renderField({ field: 'logo', onChangeImage: onChangeLogo, onSave: onSaveLogo, preview: logoImage.preview, onClear: () => logoImage.updatePreview(null) })}
      {renderField({ field: 'coverImage', onChangeImage: onChangeCoverImage, onSave: onSaveCoverImage, preview: coverImage.preview, label: 'cover image', onClear: () => coverImage.updatePreview(null) })}
    </div>
   </div>
 )
}


export default ImageUpload