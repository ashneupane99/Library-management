import React from 'react'
import { DefaultLayout } from '../../Components/DefaultLayout'
import Carousels from '../../Components/carousels/Carousels'
import { Col, Container, Row } from 'react-bootstrap'
import { CustomCard } from '../../Components/customcard/CustomCard'
import { useSelector } from 'react-redux'
import  './home.css'

export const Home = () => {

  const {bookList} = useSelector((state) => state.books)
  return (
    <DefaultLayout>
    <Carousels/>
      <Container>
        <Row>
          <Col>
            <h1 className="mt-5">Book List</h1>
          </Col>
        </Row>

        <Row>
          <Col className='d-flex justify-content-around flex-wrap gap-2'>
          {bookList.map((item) => (<CustomCard key={item.id} {...item}/>))}
          </Col>
      </Row>
      </Container>


     
      </DefaultLayout>
  )
}
export default Home
