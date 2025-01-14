import React from 'react'
import { useRoutes } from 'react-router-dom'
import App from './MyAccountPageApp/App'
import MyProfile from './MyProfile/MyProfile'
import MyTution from './MyTution/MyTution'
import AddTution from './AddTution/AddTution'
import MyReview from './MyReviews/MyReview'
import { LayoutWrapper } from '../Routes/Route'
import NotFound from '../404/404'

const MyProfileRoute = () => {
  const routes = useRoutes([
    {
      path:'/myprofile',
      element:<App><MyProfile/></App>
    },
    {
      path:'/mytutions',
      element:<App><MyTution/></App>
    },
    {
      path:'/addtution',
      element:<App><AddTution/></App>
    },
    {
      path:'/myreviews',
      element:<App><MyReview/></App>
    },
    {
      path:'*',
      element:<LayoutWrapper><NotFound/></LayoutWrapper>
    },
  ])
   return routes
}

export default MyProfileRoute