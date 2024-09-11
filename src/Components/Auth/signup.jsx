import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAlertShow, setAuth } from '../../ReduxStore/Action';
import Modal from 'react-bootstrap/Modal';


export default function Signup(props) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOTP] = useState('')
    const [showOTP, setShowOTP] = useState(false)
    const [otpError, setOtpError] = useState('')

    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleOTPClose = () => setShowOTP(false);
    const handleOTPShow = () => setShowOTP(true);
    const SignupUser = (e) => {
        e.preventDefault();
        let data = {
            "email": email,
            "username": username,
            "password": password
        }

        console.log((data));
        axios.post('/auth/signup', data).then((response) => {
            console.log(response);
            if (response && response.data && response.data.success) {
                localStorage.setItem('email', response.data.user.email);
                localStorage.setItem('userId', response.data.user.userId);
                localStorage.setItem('isActive', response.data.user.isActive);
                // dispatch(setAuth())
                dispatch(setAlertShow('success','Congratulations!',response.data.message))
                // navigate('/', { replace: true })
                handleOTPShow()
            } else {
                dispatch(setAlertShow('danger','Sorry!',response.data.message))
            }
        }).catch(err => {
            dispatch(setAlertShow('danger','Sorry!',err.message))
            console.log(err);
        })
    };

    const verifyOTP = (e) => {
        e.preventDefault();
        const data = {
            userId: localStorage.getItem('userId'),
            email: localStorage.getItem('email'),
            otp: otp
        }
        axios.post('/auth/verifyotp', data).then((response) => {
            console.log(response);
            if (response && response.data && response.data.success) {
                localStorage.setItem('email', response.data.user.email);
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('access_token', response.data.user.access_token);
                localStorage.setItem('refresh_token', response.data.user.refresh_token);
                localStorage.setItem('userId', response.data.user.userId);
                localStorage.setItem('isActive', response.data.user.isActive);
                dispatch(setAuth())
                dispatch(setAlertShow('success','Congratulations!',response.data.message))
                navigate('/', { replace: true })
            } else {
                setOtpError(response.data.message)
                setOTP('')
                setTimeout(()=>{
                    setOtpError('')
                },3000)
            }
        }).catch(err => {
            dispatch(setAlertShow('danger','Sorry!',err.message))
            console.log(err);
        })
    };



    return (
        <>
        <div className='container'>
            <h2 className='text-center'>SignUp</h2>
            <Form onSubmit={SignupUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter name" />
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
        <Modal show={showOTP} onHide={handleOTPClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Your Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please enter 6 digit code you received over your email.</Modal.Body>
        <Form.Group className="mb-3 p-3" controlId="formBasicEmail">
                    <Form.Control type="text" value={otp} onChange={(e) => setOTP(e.target.value)} placeholder="Enter OTP" />
            </Form.Group>
        <p style={{color:"red"}} className='mx-3'>{otpError}</p>    
        <Modal.Footer>
          <Button variant="primary" onClick={verifyOTP}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}
