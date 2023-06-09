
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/signin-signup/Login';
import { SignUp } from './Pages/signin-signup/SignUp';
import { Home } from './Pages/Home/Home';
import { ToastContainer,  } from 'react-toastify';
import { Dashboard } from './Pages/dashboard/Dashboard';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { getUserAction } from './Pages/signin-signup/user/userAction';
import { auth } from './configuration/firebase-config';
import { PrivateRoute } from './Components/private=route/PrivateRoute';
import Books from './Pages/books/Books.js'
import NewBook from './Pages/NewBook.js'
import EditBook from './Pages/books/EditBook.js'
import { useEffect } from 'react';
import { getAllBookAction } from './Pages/books/bookAction';
import BookLanding from './Pages/books/BookLanding';
import BurrowHistory from './Pages/burrow-history/BurrowHistory';

function App() {
  const dispatch = useDispatch()
  onAuthStateChanged(auth, (user)=>{
    user?.uid && dispatch(getUserAction(user.uid))
  })

  useEffect(()=> {
    dispatch(getAllBookAction())
  },[dispatch])
  return (
    <div className="">
    <Routes>

      {/* public routers  */}
      
      <Route path="/" element={<Home/>} />
      <Route path="/signin" element={<Login/>} />
      <Route path="/signup" element={<PrivateRoute><SignUp/></PrivateRoute>} />
      <Route path='book/:id' element= {<BookLanding/>}/>
      
      {/* private routers */}
      
      <Route path="/dashboard" element= {<PrivateRoute><Dashboard/></PrivateRoute> }/> 
    
    <Route path="/books" element= {<PrivateRoute><Books/></PrivateRoute> }/> 
    <Route path='/history' element={<PrivateRoute> <BurrowHistory /></PrivateRoute>}/>
    <Route path="/new-book" element= {<PrivateRoute><NewBook/></PrivateRoute> }/> 
    <Route path="edit-book/:id" element= {<PrivateRoute><EditBook /></PrivateRoute> }/> 
    </Routes>
    <ToastContainer/>
    </div>
  );
}

export default App;
