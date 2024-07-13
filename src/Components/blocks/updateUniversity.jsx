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
import { useDispatch } from 'react-redux';
import { setAlertShow } from '../../ReduxStore/Action';

export default function UpdateUniversity(props) {
    const dispatch = useDispatch()
    const [universityName, setUniversityName] = useState("")
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
    const [uniId, setUniId] = useState('');

    const updateUniversity = () => {

        let data = {
            universityName : universityName,
            courseName: courseName,
            applicationDate: applicationDate,
            examDate: examDate,
            interviewDate: interviewDate,
            resultDate: resultDate,
            result: resultValue,
            yourResponse: enrollStatus,
        }

        axios.post('/university/updateUniversity/' + uniId, data).then(response => {
            console.log(response);
            if (response.data.success) {
                clearData()
                dispatch(setAlertShow('success', 'Congratulations!', response.data.message))
                props.updateUniversityClose()
            }

        }).catch(err => {
            console.log(err);
        })
    }

    const clearData = () => {
        setUniversityName("")
        setCourseName("")
        setApplicationDate("")
        setExamDate("")
        setInterviewDate("")
        setResultDate("")
        setResultValue("")
        setenrollStatus("")
        setUniId("")
    }

    const dateConvert= (d) =>{
        if(d){
            return d.slice(0,10);
        }
        return null
    }

    useEffect(()=>{
        if(props.uni){
            setUniversityName(props.uni.universityName)
            setCourseName(props.uni.courseName)
            setApplicationDate(props.uni.applicationDate)
            setExamDate(props.uni.examDate)
            setInterviewDate(props.uni.interviewDate)
            setResultDate(props.uni.resultDate)
            setResultValue(props.uni.result)
            setenrollStatus(props.uni.yourResponse)
            setUniId(props.uni._id)
        }
    },[props.uni])

    

    return (
        <>  
            <Modal size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered show={props.updateUniversityShow} onHide={props.updateUniversityClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Update University</Modal.Title>
                </Modal.Header>

                <Card className='m-2 p-4'>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                University name:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type='text' value={universityName ? universityName : "" } disabled/>
                            </Col>
                        </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Course name:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type='text' value={courseName ? courseName : ""} onChange={e => setCourseName(e.target.value)} placeholder='Enter Course name....' />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Application date:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="date" value={applicationDate ? dateConvert(applicationDate) : ""} onChange={e => setApplicationDate(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Exam date(if applicable):
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="date" value={examDate ? dateConvert(examDate) : ""} onChange={e => setExamDate(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Interview date(if applicable):
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="date" value={interviewDate ? dateConvert(interviewDate) : ""} onChange={e => setInterviewDate(e.target.value)} />
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
                                        checked={result.value === resultValue}
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
                                            checked={r.value === enrollStatus}
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
                            <Form.Control type="date" value={resultDate ? dateConvert(resultDate) : ""} onChange={e => setResultDate(e.target.value)} />
                        </Col>
                    </Form.Group>
                    }
                    <Modal.Footer>
                        <Button className='m-2' variant="primary" type="submit" onClick={updateUniversity}>
                            Save
                        </Button>
                        <Button className='m-2' variant="danger" type="submit" onClick={props.universityClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Card>
            </Modal>
        </>
    )
}
