
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/signin-signup/Login';
import { SignUp } from './Pages/signin-signup/SignUp';
import { Home } from './Pages/Home/Home';
import { ToastContainer,  } from 'react-toastify';

function App() {
  return (
    <div className="">
    <Routes>
    <Route path="/" element={<Home/>} />
      <Route path="/signin" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />

    </Routes>
    <ToastContainer/>
    </div>
  );
}

export default App;
