import React, { useEffect, useState } from 'react'
import { DefaultLayout } from '../../Components/DefaultLayout'
import { Button, Form } from 'react-bootstrap'
import { CustomInput } from '../../Components/Custominput/CustomInput'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../configuration/firebase-config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAction } from './user/userAction'

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [forms, setForms] = useState ({
        
    })
    
    const {admin}= useSelector(state=> state.adminInfo)

    useEffect(()=> {
        admin?.uid && navigate("/dashboard")
    }, [admin, navigate])
    const handleOnChange = e => {
        const {name, value} = e.target
        setForms({
            ...forms,
            [name]:value,
        })
        console.log(forms)
    } 
    const handleOnSubmit = async (e) => {
        try {
        e.preventDefault()

        const { email, password} = forms

        const signInPromise = signInWithEmailAndPassword(
                auth,
                email,
                password,
            )
           
            toast.promise(signInPromise, {
                pending:"Please wait...."
            })
            const {user} = await signInPromise
           
            if (user?.uid){
                toast.success("Logged in")
                dispatch(getUserAction(user?.uid))
              
            }
                
            } catch(error){
                console.log(error)
                let msg = error.message
                if (msg.includes("auth/user-not-found")){
                    msg = "User not found"
                }
            
 
         toast.error(msg)
        }
    }

    const input =[
        {
            lable:"Email",
            name: "email",
            type: "email",
            placeholder: "x@x.com",
            required: true,
            
        },
        {
            lable:"Password",
            name: "password",
            type: "password",
            placeholder: "********",
            required: true,
            
        },
    ]
  return (
    <DefaultLayout>
    <div className="admin-form border p-3 shadow-lg rounded">
    <Form onSubmit={handleOnSubmit}>
        <h1>Admin Login</h1>
        <hr/>
  {
    input.map((item, i)=> (
        <CustomInput {...item}  onChange= {handleOnChange}/>
        
    ))
  }



<p className="d-grid">
<Button variant="dark" type="submit" >
    Sign In
  </Button>
</p>
  
</Form>
</div>
</DefaultLayout>
  )
}
