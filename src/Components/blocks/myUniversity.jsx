import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import list from "../../assets/listofuniversity"
import { useDispatch } from 'react-redux';
import { setAlertShow } from '../../ReduxStore/Action';

export default function MyUniversity(props) {
    const dispatch = useDispatch()
    const [selectedUniversity, setSelectedUniversity] = useState("")
    const [typedUniversity, setTypeddUniversity] = useState("")
    const [courseName, setCourseName] = useState("")
    const [applicationDate, setApplicationDate] = useState("")
    const [examDate, setExamDate] = useState("")
    const [interviewDate, setInterviewDate] = useState("")
    const [resultDate, setResultDate] = useState("")
    const results = [
        { name: 'Accepted', value: 'Accepted' },
        { name: 'Rejected', value: 'Rejected' },
        { name: 'No Response', value: 'No Response' },
    ];
    const [resultValue, setResultValue] = useState('');
    const enrollOptions = [
        { name: 'Yes', value: 'Yes' },
        { name: 'No', value: 'No' },
    ];
    const [enrollStatus, setenrollStatus] = useState('');
    

    const addNewUniversity = () => {

        let data = {
            universityName: selectedUniversity,
            courseName: courseName,
            applicationDate: applicationDate,
            examDate: examDate,
            interviewDate: interviewDate,
            resultDate: resultDate,
            result: resultValue,
            yourResponse: enrollStatus,
        }

        if (selectedUniversity === "Other") {
            data['universityName'] = typedUniversity
        }
        axios.post('/university/addUniversity', data).then(response => {
            console.log(response);
            if (response.data.success) {
                clearData()
                dispatch(setAlertShow('success', 'Congratulations!', response.data.message))
                props.universityClose()
            }

        }).catch(err => {
            console.log(err);
        })
    }

    const clearData = () => {
        setSelectedUniversity("")
        setTypeddUniversity("")
        setCourseName("")
        setApplicationDate("")
        setExamDate("")
        setInterviewDate("")
        setResultDate("")
        setResultValue("")
        setenrollStatus("")
    }


    

    return (
        <>
            <Modal size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered show={props.universityShow} onHide={props.universityClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add University</Modal.Title>
                </Modal.Header>

                <Card className='m-2 p-4'>
                    <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label column sm="2">University:</Form.Label>
                        <Col sm="10">
                            <Form.Control as="select" onChange={e => setSelectedUniversity(e.target.value)} required aria-label="Default select example">
                                <option>Choose University</option>
                                {list.map((uni, idx) => (
                                    <option key={idx} value={uni}>{uni}</option>
                                ))}
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    {selectedUniversity === "Other" &&
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                University name:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type='text' value={typedUniversity} onChange={e => setTypeddUniversity(e.target.value)} placeholder='Enter University name....' />
                            </Col>
                        </Form.Group>
                    }
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Course name:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type='text' value={courseName} onChange={e => setCourseName(e.target.value)} placeholder='Enter Course name....' />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Application date:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="date" value={applicationDate} onChange={e => setApplicationDate(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Exam date(if applicable):
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="date" value={examDate} onChange={e => setExamDate(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Interview date(if applicable):
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="date" value={interviewDate} onChange={e => setInterviewDate(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Acceptence/Rejection :
                        </Form.Label>
                        <Col sm="10">
                            <ButtonGroup>
                                {results.map((result, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`resultValue-${idx}`}
                                        type="radio"
                                        variant={idx === 0 ? 'outline-success' : (idx === 1 ? 'outline-danger' : 'outline-info')}
                                        name="resultValue"
                                        value={result.value}
                                        checked={resultValue === result.value}
                                        onChange={(e) => setResultValue(e.currentTarget.value)}
                                    >
                                        {result.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </Col>
                    </Form.Group>

                    {resultValue === "Accepted" &&
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Did you enroll:
                            </Form.Label>
                            <Col sm="10">
                                <ButtonGroup>
                                    {enrollOptions.map((r, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`enrollStatus-${idx}`}
                                            type="radio"
                                            variant={idx === 0 ? 'outline-success' : 'outline-danger'}
                                            name="enrollStatus"
                                            value={r.value}
                                            checked={enrollStatus === r.value}
                                            onChange={(e) => setenrollStatus(e.currentTarget.value)}
                                        >
                                            {r.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Col>
                        </Form.Group>
                    }
                    {resultValue != "No Response" && <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Acceptence/Rejection date:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="date" value={resultDate} onChange={e => setResultDate(e.target.value)} />
                        </Col>
                    </Form.Group>
                    }
                    <Modal.Footer>
                        <Button className='m-2' variant="primary" onClick={addNewUniversity}>
                            Save
                        </Button>
                        <Button className='m-2' variant="danger" onClick={props.universityClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Card>
            </Modal>
        </>
    )
}
