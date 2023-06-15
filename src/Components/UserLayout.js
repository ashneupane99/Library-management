import React from 'react'
import { Header } from './Layout/Header'
import { Footer } from './Footer'
import { SideBar } from './side-bar/SideBar'

export const UserLayout = ({children}) => {
  return (
    <div className='d-flex'>
        <SideBar/>
        <div>
        <Header/>
        <div className="main">{children}</div>
        <Footer/>
        </div>
        
    </div>
    
  )
}
