import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Signup(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const SignupUser = (e) => {
        e.preventDefault();
        let data = {
            "username": username,
            "password": password
        }

        console.log((data));
        axios.post('/auth/signup', data).then((response) => {
            console.log(response);
            if (response.data.success) {
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('access_token', response.data.user.access_token);
                localStorage.setItem('refresh_token', response.data.user.refresh_token);
                localStorage.setItem('isAdmin', response.data.user.isAdmin);
                navigate('/dashboard', { replace: true })
            } else {
                // this.props.dispatch(setAlertShow('danger','Sorry!',response.data.message))
            }
        }).catch(err => {
            // this.props.dispatch(setAlertShow('success','Sorry!',err.message))
            console.log(err);
        })
    };



    return (
        <div className='container'>
            <h2 className='text-center'>SignUp</h2>
            <Form onSubmit={SignupUser}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
                <Link to="/login" className='m-2'>Alredy have account?</Link>
            </Form>
        </div>
    )
}
