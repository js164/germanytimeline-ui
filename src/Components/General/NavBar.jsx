import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { desetAuth } from '../../ReduxStore/Action';

export default function NavBar(props) {

  // const [isAuth, setisAuth] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const AuthState = useSelector((state) => state.AuthStatus)


  const logOut = () => {
    axios.get('/auth/logout').then((response) => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    })
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    dispatch(desetAuth())
    navigate('/login', { replace: true })


  }
  return (
    <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand><Link to='/'><img src={"germanytimeline.png"} alt="GermanyTimeline" style={{ height: "50px" }} /></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Link to='/university' className='mx-1' style={{color:"white",textDecoration:"none"}}>University</Link>
            <Link to='/course' className='mx-1' style={{color:"white",textDecoration:"none"}}>Course</Link>
            <Link to='/visa' className='mx-1' style={{color:"white",textDecoration:"none"}}>Visa</Link>
            <Link to='/aps' className='mx-1' style={{color:"white",textDecoration:"none"}}>APS</Link>
            {AuthState ?
              <>
                <Link to='/profile'  ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-circle m-1" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg></Link>

                <Link to='/' className='mx-1 px-1' onClick={logOut} style={{color:"#cf2424",textDecoration:"none", border: "#cf2424 solid 2px", borderRadius:"0.5rem"}}>Log Out</Link>
              </> :
              <>
                <Link to='/login' className='mx-1 px-1' style={{color:"#0dcaf0",textDecoration:"none", border: "#0dcaf0 solid 2px", borderRadius:"0.5rem"}}>LogIn</Link>
                <Link to='/signup' className='mx-1 px-1' style={{color:"#0dcaf0",textDecoration:"none", border: "#0dcaf0 solid 2px", borderRadius:"0.5rem"}}>SignUp</Link>
              </>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

