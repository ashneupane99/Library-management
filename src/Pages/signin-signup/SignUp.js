import React from 'react'
import { DefaultLayout } from '../../Components/DefaultLayout'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomInput } from '../../Components/Custominput/CustomInput';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../configuration/firebase-config';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getUserAction } from './user/userAction';
import { useDispatch } from 'react-redux';
import { UserLayout } from '../../Components/UserLayout';



export const SignUp = () => {
    const navigate = useNavigate()
     const dispatch = useDispatch()
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
       
         const { password, confirmPassword, ...rest } = form

         if (form.password !== confirmPassword){
             toast.error("Password do not match")
         }
        
        try{
            const authSnapPromise = createUserWithEmailAndPassword(
                auth, 
                form.email, 
                form.password
            )
            toast.promise(authSnapPromise, {
                pending:"Please wait...."
            })
            const {user} = await authSnapPromise 
            if (user?.uid){
              
              // add user to user table
              await setDoc(doc(db, "Users",user?.uid) ,rest)
              toast.success("New user has been created")

              //get user data into redux store
              dispatch(getUserAction(user.uid))
              

              ///refdirectting users to dashboard
              navigate("/dashboard")

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
            name: "number",
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
            required: true,
            minlength: 6
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
    <UserLayout>
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
        Register Now!
      </Button>
    </p>
      
    </Form>
    </div>
    </UserLayout>
  )
}
