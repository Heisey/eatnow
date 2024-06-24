
import * as React from 'react'

import * as Images from '@/assets/images'
import ResturantSearch from '@/components/custom/ResturantSearch'

const Landing: React.FC = () => {

  return (
    <div className='flex flex-col gap-12'>
      <div className='bg-white rounder-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'>
        <h3 className='text-5xl font-bold tracking-tight text-orange-600'>Tuck into a takeway today</h3>
        <span className='text-xl'>Food is just a click away!</span>
        <ResturantSearch />
      </div>

      <div className='grid md:grid-cols-2 gap-5'>
        <img src={Images.landing} />
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <span className='font-bold text-3xl tracking-tighter'>
            Order takeaway even faster!
          </span>
          <span>
            Download the EatNow App for faster ordering and personilised recommendations
          </span>
          <img src={Images.appDownload} />
        </div>
      </div>
    </div>
  )
}

export default Landing