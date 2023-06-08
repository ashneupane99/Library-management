import React from 'react'
import { DefaultLayout } from '../../Components/DefaultLayout'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomInput } from '../../Components/Custominput/CustomInput';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../configuration/firebase-config';
import { toast } from 'react-toastify';



export const SignUp = () => {
    const [form, setForm] = useState({})
    const handleOnChange = e => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]:value,
        })
    
    }
    const handleOnSubmit = async (e) => {
         e.preventDefault()
         console.log(form)
         const { password, confirmPassword } = form

         if (password !== confirmPassword){
             toast.error("Password do not match")
         }
        
        try{
            const authSnap = await  createUserWithEmailAndPassword(auth, form.email, password)
            if (authSnap?.user.uid){
              toast.success("New user has been created")
            }
      } catch (error){
          console.log(error)
          let msg = error.message
  
          if (msg.includes("auth/email-already-in-use")){
              msg= "Email already in use"
          }
          toast.error(msg)
      }
    } 
   

    const inputs =[
        {
            lable:"First name",
            name: "fName",
            type: "text",
            placeholder: "jdnfsd",
            required: true
        },
      
        {
            lable:"Last name",
            name: "lName",
            type: "text",
            placeholder: "jdnfsd",
            required: true
        },
        {
            lable:"Phone",
            name: "lName",
            type: "number",
            placeholder: "04xxxxxxxx",
            required: true
        },
        {
            lable:"Email",
            name: "email",
            type: "email",
            placeholder: "x@x.com",
            required: true
        },
        {
            lable:"Password",
            name: "password",
            type: "password",
            placeholder: "********",
            required: true
        },
        {
            lable:"Confirm Password",
            name: "confirmPassword",
            type: "password",
            placeholder: "*********",
            required: true
           
        },
    ]
  return (
    <DefaultLayout>
        <div className="admin-form border p-3 shadow-lg rounded ">
        <Form onSubmit={handleOnSubmit} >
            <h1>Admin Registration</h1>
            <hr/>
      {
        inputs.map((item, i)=> (
            <CustomInput{...item} onChange= {handleOnChange}/>
        ))
      }
    

    <p className="d-grid">
    <Button variant="dark" type="submit">
        Submit
      </Button>
    </p>
      
    </Form>
    </div>
    </DefaultLayout>
  )
}
