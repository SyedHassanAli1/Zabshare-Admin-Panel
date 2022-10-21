import React from 'react'
import SideDrawer from '../Screens/SideDrawer/SideDrawer'
import Dashboard from '../Screens/Dashboard/Dashboard'
import Users from '../Screens/Users/Users'
import PendingUsers from '../Screens/PendingUsers/PendingUsers'
import MainRoutes from '../Routes/MainRoutes'
import { Routes, Route } from "react-router-dom";
import Feedback from '../Screens/Feedback/Feedback'

export default function SideDrawerRoutes() {
  return (
    <div>

      <SideDrawer>
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route exact path='all-users' element={<Users />} />
          <Route exact path='pending-users' element={<PendingUsers />} />
          <Route exact path='/login' element={<MainRoutes/>} />
          <Route exact path='/feedback' element={<Feedback/>} />
        </Routes>
      </SideDrawer>

    </div>
  )
}
