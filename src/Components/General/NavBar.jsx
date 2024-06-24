import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function NavBar(props) {

    // const [isAuth, setisAuth] = useState(false);
    const navigate = useNavigate();
    

  
   const logOut = () => {
    axios.get('/auth/logout').then((response) => {
      console.log(response);
      if (response && response.data.success) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('username')
        navigate('/login', { replace: true })
      }
  }).catch(err => {
      console.log(err);
  })
    

   }
    return (
      <>
       <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand to="/dashboard"><img src={''} alt="GermanyTimeline" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
            {true?
            <>
            <Link to='/university' className='mx-1'>University</Link>
            <Link to='/course' className='mx-1'>Course</Link>
            <Link to='/visa' className='mx-1'>Visa</Link>
            <Link to='/profile'  ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-circle m-1" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></Link>
            </>:
            <>
            <Link to='/login' className='mx-1'>LogIn</Link>
            <Link to='/signup' className='mx-1'>SignUp</Link>
            </>
            }
        </Navbar.Collapse>
      </Container>
    </Navbar> 
      </>
    )
  }

