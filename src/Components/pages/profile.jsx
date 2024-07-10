import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button';
import MyUniversity from '../blocks/myUniversity';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Moment from 'react-moment';
import { setAlertShow } from '../../ReduxStore/Action';
import { useDispatch } from 'react-redux';
import UpdateUniversity from '../blocks/updateUniversity';

export default function Profile(props) {
    const dispatch = useDispatch()

    const [universityShow, setUniversityShow] = useState(false);
    const [updateUniversityShow, setUpdateUniversityShow] = useState(false);

    const universityClose = () => {
        setUniversityShow(false);
        getMyUniversityList();
    }
    const addUniversityShow = () => setUniversityShow(true);
    const [myUniversityList, setmyUniversityList] = useState([]);
    const [uni, setUni] = useState([])


    useEffect(() => {
        getMyUniversityList()
    }, [])

    const getMyUniversityList = () => {
        axios.get('/university/all').then(response => {
            if (response.data.success) {
                setmyUniversityList(response.data.data)
                console.log(response);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const deleteUniversity = (id) => {
        axios.delete('/university/delete/'+id).then(response => {
            console.log(response);
            if (response.data.success) {
                dispatch(setAlertShow('success', 'Congratulations!', response.data.message))
            }

        }).catch(err => {
            console.log(err);
        })
    }

    const updateUniversity = (uni) =>{
        setUpdateUniversityShow(true)
        setUni(uni)
    }

    const updateUniversityClose = () =>{
        setUpdateUniversityShow(false);
        setUni([])
        getMyUniversityList();
    }

    return (
        <>
            <Container>
                <br />
                <h1>Welcome {localStorage.username}</h1>
                <hr />
                <div className='Timeline'>
                    <div className="universityList">
                        <h1 className="text-info">Universities</h1>
                        <h5 className="text-secondary">Add universities where you applied!</h5>
                        <Button className='m-2' variant="primary" type="submit" onClick={addUniversityShow}>
                            + Add University
                        </Button>
                        <MyUniversity universityShow={universityShow} universityClose={universityClose}></MyUniversity>
                        <UpdateUniversity uni={uni} updateUniversityShow={updateUniversityShow} updateUniversityClose={updateUniversityClose}></UpdateUniversity>
                        <Accordion defaultActiveKey="0" >
                            {myUniversityList && myUniversityList.map((uni, idx) =>
                                <Accordion.Item eventKey={idx} key={idx}>
                                    <Accordion.Header>
                                        {uni.universityName} - {uni.courseName}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col>University:</Col>
                                            <Col> {uni.universityName} </Col>
                                        </Row>
                                        <Row>
                                            <Col>Coruse:</Col>
                                            <Col> {uni.courseName} </Col>
                                        </Row>
                                        <Row>
                                            <Col>Applied On:</Col>
                                            <Col><Moment format="Do MMMM, YYYY">{uni.applicationDate}</Moment></Col>
                                        </Row>
                                        {uni.examDate &&
                                            <Row>
                                                <Col>Exam Date:</Col>
                                                <Col><Moment format="Do MMMM, YYYY">{uni.examDate}</Moment></Col>
                                            </Row>
                                        }
                                        {uni.interviewDate &&
                                            <Row>
                                                <Col>Interview Date:</Col>
                                                <Col><Moment format="Do MMMM, YYYY">{uni.interviewDate}</Moment></Col>
                                            </Row>
                                        }
                                        {uni.result !== "No Response" &&
                                            <Row>
                                                <Col>Result Date:</Col>
                                                <Col><Moment format="Do MMMM, YYYY">{uni.resultDate}</Moment></Col>
                                            </Row>
                                        }
                                        <Row>
                                            <Col>Result:</Col>
                                            <Col> {uni.result} </Col>
                                        </Row>
                                        {uni.result === "Accepted" &&
                                            <Row>
                                                <Col>Your Response:</Col>
                                                <Col> {uni.yourResponse === 'Yes' ? "Accepted" : "Denied"} </Col>
                                            </Row>
                                        }
                                        <hr />
                                        <Col style={{ textAlign: "end" }}>
                                            <button style={{border:"none",background:"none"}} onClick={()=>updateUniversity(uni)}><svg color='grey' style={{ margin: "0.5rem" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square m-2" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg></button>
                                            <button style={{border:"none",background:"none"}} onClick={()=>deleteUniversity(uni._id)}><svg color='red' style={{ margin: "0.5rem" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash m-2" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                            </svg></button>
                                        </Col>
                                        
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                        </Accordion>

                    </div>

                </div>
            </Container>

        </>
    )
}
