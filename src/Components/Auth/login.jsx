import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAlertShow, setAuth } from '../../ReduxStore/Action';
import Modal from 'react-bootstrap/Modal';

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOTP] = useState('')
    const [showOTP, setShowOTP] = useState(false)
    const [otpError, setOtpError] = useState('')
    const [otpMessage, setOtpMessage] = useState('')
    const [otpCountdown, setOTPCountdown] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOTPClose = () => setShowOTP(false);
    const handleOTPShow = () => setShowOTP(true);

    const LogIn = (e) => {
        e.preventDefault();
        let data = {
            "email": email,
            "password": password
        }

        axios.post('/auth/login', data).then((response) => {
            console.log(response);
            if (response && response.data && response.data.success) {
                localStorage.setItem('email', response.data.user.email);
                localStorage.setItem('userId', response.data.user.userId);
                localStorage.setItem('isActive', response.data.user.isActive);
                if (response.data.user.isActive) {
                    localStorage.setItem('access_token', response.data.user.access_token);
                    localStorage.setItem('refresh_token', response.data.user.refresh_token);
                    dispatch(setAuth())
                    dispatch(setAlertShow('success', 'Congratulations!', response.data.message))
                    navigate('/', { replace: true })
                } else {
                    handleOTPShow()
                    resendOTPTimer()
                }
            } else {
                dispatch(setAlertShow('danger', 'Sorry!', response.data.message))
            }
        }).catch(err => {
            dispatch(setAlertShow('danger', 'Sorry!', err.message))
            console.log(err);
        })
    }

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
                dispatch(setAlertShow('success', 'Congratulations!', response.data.message))
                navigate('/', { replace: true })
            } else {
                setOtpError(response.data.message)
                setOTP('')
                setTimeout(() => {
                    setOtpError('')
                }, 3000)
            }
        }).catch(err => {
            dispatch(setAlertShow('danger', 'Sorry!', err.message))
            console.log(err);
        })
    };

    const resendOTP = (e) =>{
        e.preventDefault();
        const data = {
            userId: localStorage.getItem('userId'),
            email: localStorage.getItem('email'),
        }
        axios.post('/auth/resendotp', data).then((response) => {
            if(response && response.data && response.data.success){
                setOtpMessage(response.data.message)
                setTimeout(()=>{
                    setOtpMessage('')
                },3000)
                resendOTPTimer()
            }
        }).catch(err => {
            dispatch(setAlertShow('danger','Sorry!',err.message))
            console.log(err);
        })
    }

    const resendOTPTimer = ()=>{
        let n= 10
                var interval=setInterval(()=>{
                    n = n - 1
                    setOTPCountdown(n)
                    if(n === 0){
                        clearInterval(interval);
                        setOTPCountdown('')
                    }
                },1000)
    }



    return (
        <>
            <div className='container'>
                <h2 className='text-center'>Login</h2>
                <Form onSubmit={LogIn}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                    <Link to="/signup" className='m-2'>Create new account?</Link>
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
                <p style={{ color: "red" }} className='mx-3'>{otpError}</p>
                <p style={{ color: "green" }} className='mx-3'>{otpMessage}</p>
                <Modal.Footer>
                    <Button disabled={otpCountdown} onClick={resendOTP}> Resend OTP {otpCountdown && `in ${otpCountdown} sec`} </Button>
                    <Button variant="primary" onClick={verifyOTP} disabled={otp.length < 6}>
                        Verify
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
