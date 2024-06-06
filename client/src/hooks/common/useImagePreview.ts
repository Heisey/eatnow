
import * as React from 'react'

export const useImagePreview = (image: File | null) => {
  const [imageFile, imageFileHandler] = React.useState(image)
  const [previewSrc, setPreviewSrc] = React.useState('');

  React.useEffect(() => {
    if (!imageFile) return setPreviewSrc('')

    const reader = new FileReader();

    reader.onloadend = () => setPreviewSrc(reader.result as string);

    reader.readAsDataURL(imageFile);

    return () => reader.abort()
  }, [imageFile]);

  return {
    file: imageFile,
    preview: previewSrc,
    updatePreview: imageFileHandler
  };
}