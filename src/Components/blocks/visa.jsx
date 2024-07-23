import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useDispatch } from 'react-redux';
import { setAlertShow } from '../../ReduxStore/Action';
import ToggleButton from 'react-bootstrap/esm/ToggleButton';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';

export default function Visa() {
    const [appliedDate, setAppliedDate] = useState('')
    const [receivedDate, setReceivedDate] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [resultValue, setResultValue] = useState('')
    const [VFSlocation, setVFSlocation] = useState('')
    const [editMode, setEditMode] = useState(true)
    const dispatch = useDispatch()

    const VFS = [
        { name: 'Mumabi', value: 'Mumbai' },
        { name: 'Delhi', value: 'Delhi' },
        { name: 'Kolkata', value: 'Kolkata' },
        { name: 'Bangalore', value: 'Bangalore' },
        { name: 'Chennai', value: 'Chennai' },
        { name: 'Hyderabad', value: 'Hyderabad' }
    ];

    const saveVisa = () => {
        const data = { appliedDate, receivedDate, additionalInfo, VFSlocation, resultValue }
        axios.post('/visa/save', data).then(response => {
            console.log(response);
            if (response.data.success) {
                dispatch(setAlertShow('success', 'Congratulations!', response.data.message))
                setEditMode(false)
            }

        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get('/visa/').then(response => {
            console.log(response);
            if (response && response.data.success && response.data.data) {
                setAppliedDate(response.data.data.appliedDate)
                setReceivedDate(response.data.data.receivedDate)
                setAdditionalInfo(response.data.data.additionalInfo)
                setResultValue(response.data.data.resultValue)
                setVFSlocation(response.data.data.VFSlocation)
                setEditMode(false)
            }else{
                setEditMode(true)
            }
        })
    }, [])

    const dateConvert = (d) => {
        if (d) {
            return d.slice(0, 10);
        }
        return ''
    }

    return (
        <>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Visa applointment date:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control disabled={!editMode} type="date" value={appliedDate ? dateConvert(appliedDate) : ""} onChange={e => setAppliedDate(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Visa received on:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control disabled={!editMode} type="date" value={receivedDate ? dateConvert(receivedDate) : ""} onChange={e => setReceivedDate(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Visa Status:
                    </Form.Label>
                    <Col sm="10">
                        <ButtonGroup>
                            <ToggleButton
                                key="Approved"
                                disabled={!editMode}
                                id="resultValue-Approved"
                                type="radio"
                                variant="outline-success"
                                name="resultValue"
                                value="Approved"
                                checked={"Approved" === resultValue}
                                onChange={(e) => setResultValue(e.currentTarget.value)}
                            >
                                Approved
                            </ToggleButton>
                            <ToggleButton
                                key="Rejected"
                                disabled={!editMode}
                                id="resultValue-Rejected"
                                type="radio"
                                variant="outline-danger"
                                name="resultValue"
                                value="Rejected"
                                checked={"Rejected" === resultValue}
                                onChange={(e) => setResultValue(e.currentTarget.value)}
                            >
                                Rejected
                            </ToggleButton>
                        </ButtonGroup>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Select VFS:</Form.Label>
                    <Col sm="10">
                        {VFS.map((val) => (
                            <Form.Check // prettier-ignore
                                type="radio"
                                disabled={!editMode}
                                key={`${val.name}`}
                                id={`${val}`}
                                label={`VFS ${val.name}`}
                                name="VFSlocation"
                                value={val.value}
                                checked={VFSlocation === val.value}
                                onChange={(e) => setVFSlocation(e.currentTarget.value)}
                            />

                        ))}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm="2">Additional Information:</Form.Label>
                    <Col sm="10">
                        <Form.Control disabled={!editMode} as="textarea" rows={3} value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} placeholder="Enter any additional deatils realted to your visa process..." />
                    </Col>
                </Form.Group>

                <Button variant="primary" onClick={saveVisa} disabled={!editMode}>
                    Save
                </Button>
                <Button className='m-2' disabled={editMode} onClick={()=>setEditMode(true)}>
                    Edit
                </Button>
            </Form>
        </>
    )
}
