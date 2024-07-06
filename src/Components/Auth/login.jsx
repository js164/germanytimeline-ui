import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../General/NavBar';
import { useDispatch } from 'react-redux';
import { setAlertShow, setAuth } from '../../ReduxStore/Action';

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const  LogIn=(e)=> {
    e.preventDefault();
    let data = {
        "username": username,
        "password": password
    }

    axios.post('/auth/login', data).then((response) => {
        console.log(response);
        if (response.data.success) {
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('access_token', response.data.user.access_token);
            localStorage.setItem('refresh_token', response.data.user.refresh_token);
            localStorage.setItem('userId', response.data.user.userId);
            dispatch(setAuth())
            dispatch(setAlertShow('success','Congratulations!',response.data.message))
            navigate('/', { replace: true })
        }else{
            dispatch(setAlertShow('danger','Sorry!',response.data.message))
        }
    }).catch(err => {
        dispatch(setAlertShow('danger','Sorry!',err.message))
        console.log(err);
    })
}


  return (
    <>
    <NavBar />
      <div className='container'>
                <h2 className='text-center'>Login</h2>
                <Form onSubmit={LogIn}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername( e.target.value )} placeholder="Enter Username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value )} placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                    <Link to="/signup" className='m-2'>Create new account?</Link>
                </Form>
            </div>
    </>
  )
}
