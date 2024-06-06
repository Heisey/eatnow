

import * as React from 'react'

import * as Hooks from '@/hooks'
import ProtectedRoute from '@/components/hoc/ProtectedRoute'

import ProfileForm from './components/ProfileForm'


export interface UserProfileProps extends React.PropsWithChildren {


}


const UserProfile: React.FC<UserProfileProps> = () => {

  const userApi = Hooks.server.useUser()

  return (
    <div className='space-y-4 bg-gray-50 rounded-lg md:p10'>
      <div>
        <h2 className='text-2xl font-bold'>User Profile Form</h2>
      </div>
      <ProfileForm onSave={userApi.update.mutateAsync} isLoading={userApi.update.isLoading} />
    </div>
  )
}


export default ProtectedRoute(UserProfile)