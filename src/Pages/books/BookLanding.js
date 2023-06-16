import React from 'react'
import { DefaultLayout } from '../../Components/DefaultLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addNewBurrowAction } from '../burrow-history/burrowAction'

const fourteenDaysInMs= 14*24*60*60*1000
const BookLanding = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id}= useParams()
    const{bookList} = useSelector(state => state.books)
    const{admin} = useSelector(state => state.adminInfo)

    const selectedbook = bookList.find((item => item.id ===id))
    if (!selectedbook) return navigate("/")

    const { url, Name, title, year, summary, isAvailable, availableFrom} = selectedbook

    const handleOnBurrow = () => {
        const obj = {
            title,
            url,
            bookId: id,
            userId: admin.uid,
            userName: admin.fName,
            birrowedAt: Date.now(),
            availableFrom : Date.now() + fourteenDaysInMs
           

        }
        dispatch(addNewBurrowAction(obj))
    }

  return (
    <DefaultLayout>
        <Container>
            <Row className='mt-4'>
        <Link to={"/"}>
            <Button variant="secondary"> &lt; Back</Button> <br />
        </Link>
        </Row>
        <Row className='g-2'>
            <Col md={6}>
           
            <img src={url} alt='' width="100%" />
            
        


            </Col>
            <Col md={6}>
            <h3> {title}</h3>
            <p>
                Rating 
            </p>
            <p>
                {Name} - {year}
            </p>
            <p>
                { !admin?.uid ?(
                    <Link to="/signin"> <Button variant='dark'>Login to burrow</Button></Link> ) :
                   
                
                
                    isAvailable? (
                    <Button variant='dark' onClick={handleOnBurrow}>Burrow now</Button>
                    ) : (
                        <Button variant='secondary' disabled>Available from: {new Date(availableFrom).toDateString()}</Button>)
                    
                }
                
            </p>

            <p>
               <b>Summary: </b> {summary}
            </p>
            </Col>
        </Row>
        <Row>
            <Col className='border rounded mt-3' >
                reviews...
            </Col>
        </Row>
        </Container>
    </DefaultLayout>
  )
}

export default BookLanding