
import * as React from 'react'
import * as Router from 'react-router-dom'

import * as Core from '@/core'
import Landing from '@/pages/Landing'
import UserProfile from '@/pages/UserProfile'

import ResturantsOutlet from '@/pages/Resturants/Outlet'
import ResturantSearch from '@/pages/Resturants/Search'
import ResturantInfo from '@/pages/Resturants/Info'

import ResturantProfileDetails from '@/pages/ResturantProfile/Details'
import ResturantProfileMenu from '@/pages/ResturantProfile/Menu'
import ResturantProfileMenuItems from '@/pages/ResturantProfile/MenuItems'
import ResturantProfileOutlet from '@/pages/ResturantProfile/Outlet/Outlet'
import ResturantProfileOverview from '@/pages/ResturantProfile/Overview'

import LoginModal from '@/pages/Modals/Login'

import { Toaster } from 'sonner'

import Standard from './template/Standard'

import './globals.css'

const App: React.FC = () => {

  return (
    <div>
      <Router.Routes>
        <Router.Route path='/' element={<Standard />}>
          <Router.Route path='/' index element={<Landing />} />
          <Router.Route path={Core.keys.paths.USER_PROFILE} element={<UserProfile />} />

          <Router.Route path={Core.keys.paths.RESTURANTS} element={<ResturantsOutlet />}>
            <Router.Route index  element={<ResturantSearch />} />
            <Router.Route path={Core.keys.paths.RESTURANTS_INFO} element={<ResturantInfo />} />
          </Router.Route>

          <Router.Route path={Core.keys.paths.RESTURANT_PROFILE} element={<ResturantProfileOutlet />}>
            <Router.Route index path={Core.keys.paths.RESTURANT_PROFILE_OVERVIEW} element={<ResturantProfileOverview />} />
            <Router.Route path={Core.keys.paths.RESTURANT_PROFILE_DETAILS} element={<ResturantProfileDetails />} />
            <Router.Route path={Core.keys.paths.RESTURANT_PROFILE_MENU} element={<ResturantProfileMenu />} />
            <Router.Route path={Core.keys.paths.RESTURANT_PROFILE_MENU_ITEMS} element={<ResturantProfileMenuItems />} />
          </Router.Route>
        </Router.Route>

        <Router.Route path='*' element={<Router.Navigate to='/' />} />
      </Router.Routes>

      <LoginModal />

      <Toaster visibleToasts={1} position='top-right' richColors />
    </div>
  )
}

export default App
