import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookAction } from '../../Pages/books/bookAction'
import { Link } from 'react-router-dom'

export const BookTable = () => {
const dispatch = useDispatch()
const [displayList, setDisplayList] = useState([])

// pull books from the redux store
const {bookList} = useSelector((state)=>state.books)
    useEffect(()=> {
        // fetch booklist once component is rendered
        !bookList.length && dispatch(getAllBookAction())
        setDisplayList(bookList)
    }, [bookList, dispatch])

    const handleOnSearch = (e) => {
        const {value} = e.target 
        const filteredBook = bookList.filter((item)=> item.title.toLowerCase().includes(value.toLowerCase()))
        setDisplayList(filteredBook)


    }
  return (
    <div>
        <div className="text-end">
           < Form.Control
           onChange= {handleOnSearch} className='user-control ' placeholder='Search book by name'/>
           <br />

        </div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Thumbnail</th>
          <th>Name</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {displayList.map((item, i) =>  (
            <tr key={i}>
            <td>{i+1}</td>
            <td>
              <img src={item.url} alt="" /></td>
            <td><h3>{item.title}</h3>
            <p>
                {" "}
            {item.Name} · {item.year}
            </p>
  
            
            <p>{item.summary}</p></td>
            <td>
                <Link to={`/edit-book/${item.id}`}>
                <Button variant="warning">Edit </Button>
                </Link>
                </td>
          </tr>
          ))}
        
       
        
      </tbody>
    </Table>
    </div>
  )
}
