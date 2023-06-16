import React, { useEffect } from 'react'
import { UserLayout } from '../../Components/UserLayout'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { getAllBurrowHistoryAction, updateBorrowAction } from './burrowAction'
import { updateBookAction } from '../books/bookAction'

const BurrowHistory = () => {
    const dispatch = useDispatch()
    const {burrowHistoryList} = useSelector(state => state.burrowHistories)
    const {admin} = useSelector(state => state.adminInfo)
    

    useEffect (()=>{
      !burrowHistoryList.length &&   dispatch(getAllBurrowHistoryAction(admin.uid))
    }, [dispatch,burrowHistoryList,admin.uid] ) 


    const handleOnBookReturn = ({id, bookId,}) => {
        // burrow history table update: isReturn: ture, returnAT
        const burrowUpdateOj = {
            id,
            isReturn: true,
            availableFrom: Date.now()
        }
        dispatch(updateBorrowAction(burrowUpdateOj))

        const bookUpdateObj = {
            id: bookId,
            isAvailable: true,
            availableFrom: Date.now()
        }
        dispatch(updateBookAction(bookUpdateObj))
       
        // book table: isAvailable: true,  availableFrom
    }
  return (
   <UserLayout>
    History

    <Table striped bordered >
        <thead>
            <th>Thumbnail</th>
            <th>Book Details</th>
            <th>Burrowed At</th>
            <th>Return Date</th>
            <th>Action</th>
        </thead>
        <tbody>
            {
                burrowHistoryList.map(item => 
                <tr key={item.id}>
                    <td><img src={item.url} width={"100%"} alt=''></img></td>
                    <td><h3>{item.title}</h3></td>
                    <td>
                        {new Date(item.burrowedAt).toLocaleDateString()}
                    </td>
                    <td>
                        {new Date(item.availableFrom).toISOString()}
                    </td>
                    <td>
                        <Button variant="dark" onClick={() => handleOnBookReturn(item)}>Return Book</Button>
                    </td>
                </tr>)
            }
        </tbody>
    </Table>
   </UserLayout>
  )
}

export default BurrowHistory