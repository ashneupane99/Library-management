import React, { useEffect, useState } from 'react'

import { Button, Container, Form } from 'react-bootstrap'
import  CustomInput  from "../../Components/Custominput/CustomInput.js";
import { useDispatch, useSelector } from 'react-redux'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { UserLayout } from '../../Components/UserLayout'
import { updateBookAction, getBookAction } from './bookAction';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../configuration/firebase-config.js';
import { toast } from 'react-toastify';



export const EditBook = () => {
    const {id} = useParams()
    const navigate  = useNavigate()
    const dispatch = useDispatch()

    const [form, setForm] = useState({})

    const {selectedBook} = useSelector(state => state.books)


    useEffect(()=> {
       selectedBook?.id !== id && dispatch(getBookAction(id))
        setForm(selectedBook)
    },[dispatch, id, selectedBook, form?.id])
    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(updateBookAction(form
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

        const handleOnDelete = async ()   => {
            try {
                if(window.confirm("Do you really want to delete?")){
                     await deleteDoc(doc(db, "books", id))
                    toast.success("Delete Successful")
                    navigate("/books")
                }
                
            } catch (error) {
                toast.error(error.message)
            }
        }
    const inputs =[
        {
            lable:"Book Title",
            name: "title",
            type: "text",
            placeholder: "JavaScript",
            required: true,
            value: form?.title
        },
      
        {
            lable:"Author name",
            name: "Name",
            type: "text",
            placeholder: "Smith",
            required: true,
            value: form?.Name
        },
        {
            lable:"Published year",
            name: "year",
            type: "number",
            placeholder: "2013",
            value: form?.year
            
        },
        {
            lable:"Image url",
            name: "url",
            type: "url",
            placeholder: "http://",
            required: true,
            value: form?.url
        },
        {
            lable:"Summary",
            name: "summary",
            type: "text",
            as: "textarea",
            rows: "5",
            required: true,
            value: form?.summary
           
        },
        
    ]
  return (
    <UserLayout>
        <Container>
        <h3 className='mt-2 ms-2'>Edit Book</h3>
        <hr />
        <Link to="/books">
        <Button variant='secondary'>Back</Button><br /><br />
        </Link>

        <Form onSubmit={handleOnSubmit} >
            <div>Edit Book</div>
            <hr/>
      {
        inputs.map((item, i)=> (
            <CustomInput{...item} onChange= {handleOnChange}/>
        ))
    
      }

    <p className="d-grid">
    <Button variant="dark" type="submit">
        Update Book 
      </Button>
    </p>
      
    </Form>
    <Button variant="danger" type="submit" onClick={handleOnDelete}>
        Delete Book 
      </Button>

    </Container>

        </UserLayout>
  )
}
export default EditBook