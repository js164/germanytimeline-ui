import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useDispatch } from 'react-redux';
import { setAlertShow } from '../../ReduxStore/Action';

export default function APS() {
    const [appliedDate, setAppliedDate] = useState('')
    const [receivedDate, setReceivedDate] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const dispatch = useDispatch()

    const saveAPS = () => {
        const data = {appliedDate, receivedDate, additionalInfo}
        axios.post('/APS/save', data).then(response => {
            console.log(response);
            if (response.data.success) {
                dispatch(setAlertShow('success', 'Congratulations!', response.data.message))
            }

        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get('/APS/').then(response => {
            console.log(response);
            if(response.data.success && response.data.data){
                setAppliedDate(response.data.data.appliedDate)
                setReceivedDate(response.data.data.receivedDate)
                setAdditionalInfo(response.data.data.additionalInfo)
            }
        })
    }, [])

    const dateConvert= (d) =>{
        if(d){
            return d.slice(0,10);
        }
        return ''
    }

    return (
        <>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        APS applied on:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="date" value={appliedDate ? dateConvert(appliedDate) : ""} onChange={e => setAppliedDate(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        APS received on:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="date" value={receivedDate ? dateConvert(receivedDate) : "" } onChange={e => setReceivedDate(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm="2">Additional Information:</Form.Label>
                    <Col sm="10">
                    <Form.Control as="textarea" rows={3} value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} placeholder="Enter any additional deatils realted to your APS process..." />
                    </Col>
                </Form.Group>

                <Button variant="primary" onClick={saveAPS}>
                    Save
                </Button>
            </Form>
        </>
    )
}
