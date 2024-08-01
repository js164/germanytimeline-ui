import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Moment from 'react-moment';
import Pagination from 'react-bootstrap/Pagination';
import list from "../../assets/listofuniversity"
import Form from 'react-bootstrap/Form';

export default function University() {
  const [universityList, setUniversityList] = useState([])
  const [active, setActive] = useState("All");

  let letters = [];
  letters.push(
    <Pagination.Item key={"All"} onClick={() => setActive("All")} active={"All" === active}>
      All
    </Pagination.Item>
  )

  for (let w = 0; w < 26; w++) {
    letters.push(
      <Pagination.Item key={w} onClick={() => setActive(String.fromCharCode(65 + w))} active={String.fromCharCode(65 + w) === active}>
        {String.fromCharCode(65 + w)}
      </Pagination.Item>,
    );
  }

  useEffect(() => {
    getUniversityList()
  }, [])

  const getUniversityList = () => {
    axios.get('/university/all/universityName').then(response => {
      console.log(response);
      if (response.data.success) {
        setUniversityList(response.data.data)
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <Container>
        <h1 className="text-info">Universities</h1>
        <Pagination>{letters}</Pagination>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Select style={{border:"#0d6efd solid 2px"}} as="select" onChange={e => setActive(e.target.value)}>
            <option key={"default"}>Choose University</option>
            {list.map((uni, idx) => (
              <option key={idx} value={uni}>{uni}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Row>
          {universityList.length > 0 &&
            universityList.map((uni, idx) =>
              <> {((active.length > 1 && active !== "All" && uni.universityName === active) || (active.length === 1 && uni.universityName[0] === active) || active === "All") &&
                <Card style={{ width: '25rem' }} className='m-2' key={idx}>
                  <Card.Body>
                    <Card.Title>{uni.universityName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{uni.courseName} ({uni.courseCategory})</Card.Subtitle>
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
