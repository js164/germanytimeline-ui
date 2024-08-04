import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Moment from 'react-moment';
import Form from 'react-bootstrap/Form';
import courselist from '../../assets/courselist';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { useSearchParams } from 'react-router-dom';

export default function Course() {
  const [courseList, setCourseList] = useState([])
  const [active, setActive] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getCourseList()
    let c= searchParams.get("c")
    console.log(c);
    if(c==="ME"){
      setActive("Mechanical Engineering")
    }else if(c==="CS"){
      setActive("Computer Science")
    }else if(c==="BM"){
      setActive("Business & Management")
    }
  }, [])

  const getCourseList = () => {
    axios.get('/university/all/courseName').then(response => {
      console.log(response);
      if (response.data.success && response.data.data) {
        setCourseList(response.data.data)
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <Container>
        <h1 className="text-info">Courses</h1>
        <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label column sm="3">Select Course Category:</Form.Label>
          <Col sm="9">
          <Form.Select style={{border:"#0d6efd solid 2px"}} as="select" onChange={e => setActive(e.target.value)}>
            <option key={"default"} value="All" selected={active==="All"}>All</option>
            {courselist.map((uni, idx) => (
              <option key={idx} value={uni} selected={active===uni}>{uni}</option>
            ))}
          </Form.Select>
          </Col>
        </Form.Group>
        <Row>
          {courseList.length > 0 &&
            courseList.map((uni, idx) =>
              <> {((uni.courseCategory === active) || active === "All") &&
                <Card style={{ width: '25rem' }} className='m-2' key={idx}>
                  <Badge style={{position:"absolute",right:"5px",top:"-5px"}} bg="info">{uni.courseCategory}</Badge>
                  <Card.Body>
                    <Card.Title>{uni.courseName} </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{uni.universityName}</Card.Subtitle>
                    <Card.Text>

                    </Card.Text>

                    <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
                      <ul className="timeline">
                        {uni.applicationDate && <li className="timeline-item">
                          <div className="timeline-info">
                            <span><Moment format="DD MMMM, YYYY">{uni.applicationDate}</Moment></span>
                          </div>
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <h3 className="timeline-title">Application Date</h3>
                          </div>
                        </li>
                        }
                        {uni.examDate && <li className="timeline-item">
                          <div className="timeline-info">
                            <span><Moment format="DD MMMM, YYYY">{uni.examDate}</Moment></span>
                          </div>
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <h3 className="timeline-title">Exam Date</h3>
                          </div>
                        </li>
                        }
                        {uni.interviewDate && <li className="timeline-item">
                          <div className="timeline-info">
                            <span><Moment format="DD MMMM, YYYY">{uni.interviewDate}</Moment></span>
                          </div>
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <h3 className="timeline-title">Interview Date</h3>
                          </div>
                        </li>
                        }
                        {uni.resultDate && <li className="timeline-item">
                          <div className="timeline-info">
                            <span><Moment format="DD MMMM, YYYY">{uni.resultDate}</Moment></span>
                          </div>
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <h3 className="timeline-title">Result Date</h3>
                            <p><strong>Result:</strong> {uni.result}</p>
                          </div>
                        </li>
                        }
                        {uni.result === "No Response" && <li className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <p><strong>Result:</strong> {uni.result}</p>
                          </div>
                        </li>
                        }
                      </ul>
                    </div>

                  </Card.Body>
                </Card>
              }</>
            )}
        </Row>
      </Container>
    </>
  )
}
