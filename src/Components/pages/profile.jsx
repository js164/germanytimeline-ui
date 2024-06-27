import React, { useEffect, useState } from 'react'
import NavBar from '../General/NavBar'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button';
import MyUniversity from '../blocks/myUniversity';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Moment from 'react-moment';

export default function Profile(props) {

    const [universityShow, setUniversityShow] = useState(false);

    const universityClose = () => setUniversityShow(false);
    const addUniversityShow = () => setUniversityShow(true);
    const [myUniversityList, setmyUniversityList] = useState([]);
    

    useEffect(() => {
        axios.get('/university/all').then(response => {
            if (response.data.success) {
                setmyUniversityList(response.data.data)
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])
    
    return (
        <>
            <NavBar />
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
                <Accordion defaultActiveKey="0" >
                    {myUniversityList && myUniversityList.map((uni, idx) => 
                        <Accordion.Item eventKey={idx} key={idx}>
                            <Accordion.Header>{uni.universityName} - {uni.courseName}</Accordion.Header>
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
