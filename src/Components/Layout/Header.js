import { signOut } from 'firebase/auth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';
import { auth } from '../../configuration/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from '../../Pages/signin-signup/user/userSlice';

export const Header= () => {
    const dispatch = useDispatch()

    const {admin}=  useSelector(state => state.adminInfo)

    
    const handleOnLogout = () => {
        signOut(auth).then(()=>{
            dispatch (setAdmin({}))
        })
    }
  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container>
        <Navbar.Brand href="/">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to="/">Home</Link >
            {
                admin?.uid ? (
                <>
                <Link className="nav-link" to="/dashboard" onClick={handleOnLogout}>Dashboard</Link >
                <Link className="nav-link" to="/signup" onClick={handleOnLogout}>Sign Out</Link >
                </>): 
                (<Link  className="nav-link" to="/signin">Login</Link >)}
                
            
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

