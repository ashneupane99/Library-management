import React, { useState } from 'react'
import { UserLayout } from '../Components/UserLayout'
import { Button, Container, Form } from 'react-bootstrap'
import { CustomInput } from '../Components/Custominput/CustomInput'
import { useDispatch } from 'react-redux'
import { addNewBookAction } from './books/bookAction'
import { Link } from 'react-router-dom'

export const NewBook = () => {
    const dispatch = useDispatch()

    const [form, setForm] = useState({})
    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(addNewBookAction(form
            ))
    }
   
        const handleOnChange = (e) => {
            e.preventDefault()
            const {name, value} =e.target
            setForm({
                ...form,
                [name]: value
            })
           
        }
    const inputs =[
        {
            lable:"Book Title",
            name: "title",
            type: "text",
            placeholder: "JavaScript",
            required: true
        },
      
        {
            lable:"Author name",
            name: "Name",
            type: "text",
            placeholder: "Smith",
            required: true
        },
        {
            lable:"Published year",
            name: "year",
            type: "number",
            placeholder: "023421231",
            
        },
        {
            lable:"Image url",
            name: "url",
            type: "url",
            placeholder: "http://",
            required: true
        },
        {
            lable:"Summary",
            name: "summary",
            type: "text",
            as: "textarea",
            rows: "5",
            required: true,
           
        },
        
    ]
  return (
    <UserLayout>
        <Container>
        <h3 className='mt-2 ms-2'>New Book</h3>
        <hr />
        <Link to="/books">
        <Button variant='secondary'>Back</Button>
        </Link>

        <Form onSubmit={handleOnSubmit} >
            <div>Add New Book</div>
            <hr/>
      {
        inputs.map((item, i)=> (
            <CustomInput{...item} onChange= {handleOnChange}/>
        ))
      }

    <p className="d-grid">
    <Button variant="dark" type="submit">
        Add New Book 
      </Button>
    </p>
      
    </Form>

    </Container>

        </UserLayout>
  )
}
export default NewBook