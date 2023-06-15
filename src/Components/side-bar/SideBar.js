import React from 'react'
import { Link } from 'react-router-dom'
import { Books } from '../../Pages/books/Books'

export const SideBar = () => {
  return (
    <div className='w-25 bg-dark text-light' style={{width: "250px"}}>
        <div className="mt-4 text-center mb-5 top">Admin</div>
        <div>
            <ul className='list-unstyled'style={{marginLeft: "1rem"}}>
                <li>
                    <Link className='nav-link w-75' to ="/dashboard" >Dashboard</Link>                </li>
                    <li>
                    <Link className='nav-link' to ="/books" element={<Books/>}>Books</Link>                </li>
                    <li>
                    <Link className='nav-link' to ="/clients">Clients</Link>                </li>
                    <li>
                    <Link className='nav-link' to ="/history">History</Link>                </li>
                    <li>
                    <Link className='nav-link' to ="/signup">Add Admin</Link>                </li>
                
            </ul>
        </div>
    </div>
  )
}
