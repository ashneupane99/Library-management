import React, { useState } from 'react'
import { DefaultLayout } from '../../Components/DefaultLayout'
import { Button, Form } from 'react-bootstrap'
import { CustomInput } from '../../Components/Custominput/CustomInput'

export const Login = () => {
    const [forms, setForms] = useState ({})
    const handleOnChange = e => {
        const {name, value} = e.target
        setForms({
            ...forms,
            [name]:value,
        })
        console.log(forms)
    }
    const input =[
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
    ]
  return (
    <DefaultLayout>
    <div className="admin-form border p-3 shadow-lg rounded">
    <Form >
        <h1>Admin Login</h1>
        <hr/>
  {
    input.map((item, i)=> (
        <CustomInput {...item}  onChange= {handleOnChange}/>
    ))
  }



<p className="d-grid">
<Button variant="dark" type="submit">
    Sign In
  </Button>
</p>
  
</Form>
</div>
</DefaultLayout>
  )
}
