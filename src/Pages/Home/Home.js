import React from 'react'
import { DefaultLayout } from '../../Components/DefaultLayout'
import Carousels from '../../Components/carousels/Carousels'
import { Col, Container, Row } from 'react-bootstrap'

export const Home = () => {
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

        </Row>
      </Container>


     
      </DefaultLayout>
  )
}
export default Home
