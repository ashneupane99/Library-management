import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { db } from "../../configuration/firebase-config"
import { toast } from "react-toastify"
import { updateBookAction } from "../books/bookAction"
import { setburrowHistorys } from "./burrowSlice"

export const addNewBurrowAction = (transactionObj) => async (dispatch) => {
    try { 
        // add new documetn in the database
        const docRefPending =  addDoc(collection(db, "burrow_history"), transactionObj)

        toast.promise(docRefPending, {
            pending: "Please wait..."
        })

        const docRef = await docRefPending
        
        
        if(docRef?.id ){
            toast.success("You have burrowed book successfully")
            // update the burrow status
            dispatch(updateBookAction({
                id: transactionObj.bookId, 
                isAvailable: false, 
                availableFrom: transactionObj.availableFrom
            }))

            // fetch all burrow history
            dispatch(getAllBurrowHistoryAction(transactionObj.userId))
        }
        
        
    } catch (error) {
        console.log(error)
        toast.error(error.message)
        
    }
}
export const getAllBurrowHistoryAction  = (uid) => async (dispatch) => {
    try {
        const q = query(collection(db, "burrow_history"), where('userId', "==" , uid))
        const querySnapshot = await getDocs(q)

        let history = []
        querySnapshot.forEach((doc)=> {
            const {id}= doc 
            const data = doc.data()
            

            history.push({
                ...data, id
            })
        })
        history.length && dispatch(setburrowHistorys(history))
    } catch (error) {
        console.log(error.message)
        
    }
}
export const updateBorrowAction = ({id, ...rest}) => async (dispatch) => {
    try { 
        // add new documetn in the database
        await setDoc(doc(db, "borrow_history", id), rest, {merge: true})
        
            toast.success("The book has been returned successfully")
            dispatch(getAllBurrowHistoryAction())
            // update book table
            
        }
        
        
     catch (error) {
        console.log(error)
        toast.error(error.message)
        
    }
}