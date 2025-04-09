import React from 'react'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { LogOutUser } from '@/redux/authSlice'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import StudentView from '@/componentpages/StudentComponents/header'
import StudentIndexPage from '@/componentpages/StudentComponents'

function StudentHomePage() {

  const dispatch=useDispatch()
  const navigate=useNavigate()


  return (
    <div>
        <StudentView/>
         <StudentIndexPage/>
        
    </div>
  )
}

export default StudentHomePage