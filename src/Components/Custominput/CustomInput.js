
import React from 'react'
import { Form } from 'react-bootstrap'


export const CustomInput = ({lable, ...rest}) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{lable}</Form.Label>
        <Form.Control {...rest} />
        
      </Form.Group>
  )
}
