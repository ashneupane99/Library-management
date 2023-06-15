import React from 'react'
import { Header } from './Layout/Header'
import { Footer } from './Footer'
import { SideBar } from './side-bar/SideBar'

export const DefaultLayout = ({children}) => {
  return (
    <div >
        
        <Header/>
        <div className="main">{children}</div>
        <Footer/>
       
        
    </div>
    
  )
}
