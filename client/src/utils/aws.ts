
import * as AWS from 'aws-sdk'

export const uploadImage = (args: File) => {
  try {

    AWS.config.update({
      maxRetries: 3,
      httpOptions: { timeout: 30000, connectTimeout: 5000 },
      region: import.meta.env.VITE_AWS_REGION,
      accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY
    })
  
    const bucket = new AWS.S3()
    
    return bucket.upload({
      Body: args,
      Bucket: import.meta.env.VITE_AWS_BUCKET,
      Key: args.name,
      ContentType: 'image'
    }).promise()

    // return bucket.send((err, data) => {
    //   return data.Location
    // })

  } catch(err) {
    console.log(err)
  }

}
