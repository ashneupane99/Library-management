import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../../configuration/firebase-config"
import { setBooks,  } from "./bookSlice"
import {setSelectedBook} from "./bookSlice"


export const addNewBookAction = bookObj => async (dispatch) => {
    try { 
        // add new documetn in the database
        const docRefPending =  addDoc(collection(db, "books"), bookObj)

        toast.promise(docRefPending, {
            pending: "Please wait..."
        })

        const docRef = await docRefPending
        
        console.log(docRef)
        if(docRef?.id ){
            toast.success("New book has been added successfully")
            dispatch(getAllBookAction())
        }
        
        
    } catch (error) {
        console.log(error)
        toast.error(error.message)
        
    }
}
export const updateBookAction = ({id, ...rest}) => async (dispatch) => {
    try { 
        // add new documetn in the database
        await setDoc(doc(db, "books", id), rest, {merge: true})
        
            toast.success("New book has been added successfully")
            dispatch(getAllBookAction())
        }
        
        
     catch (error) {
        console.log(error)
        toast.error(error.message)
        
    }
}
export const getAllBookAction  = () => async dispatch => {
    try {
        const q = query(collection(db, "books"))
        const querySnapshot = await getDocs(q)

        let book = []
        querySnapshot.forEach((doc)=> {
            const {id}= doc 
            const data = doc.data()
            

            book.push({
                ...data, id
            })
        })
        dispatch(setBooks(book))
    } catch (error) {
        console.log(error.message)
        
    }
}
export const getBookAction  = (id) => async dispatch => {
    try {
        // const q = query(collection(db, "books"),where("id", "==", id))
        
        const bookSnapshot = await getDoc(doc(db, "books", id))
        if (bookSnapshot.exists()){
            // extract the book data and mount in the store

            const data = bookSnapshot.data()
         

            dispatch(setSelectedBook({...data, id}))
        }
       
    } catch (error) {
        console.log(error.message)
        
    }
}