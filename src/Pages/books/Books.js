import React from 'react'
import { UserLayout } from '../../Components/UserLayout'
import { BookTable } from '../../Components/book/BookTable'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Books = () => {
  return (
    <UserLayout>
    <h3 className='mt-2 ms-2'>Books</h3>
    <hr />
    <Container>
    <div className="text-end  mb-3">
      <Link to="/new-book">
      <Button variant= "primary" ><i class="fa-solid fa-plus"></i> Add new Book</Button></Link><br />
    </div>
    <BookTable/>
    </Container>
    </UserLayout>
  )
}
export default Books