import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Moment from 'react-moment';
import moment from 'moment';

export default function Visa() {
  const [visaList, setVisaList] = useState([])

  useEffect(() => {
    getVisaList()
  }, [])

  const getVisaList = () => {
    axios.get('/visa/all').then(response => {
      console.log(response);
      if (response.data.success) {
        setVisaList(response.data.data)
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <Container>
        <h1 className="text-info">Visa</h1>
        <Row>
          {visaList.length > 0 &&
            visaList.map((v, idx) =>
                <Card style={{ width: '25rem' }} className='m-2' key={idx}>
                  <Card.Body>
                    <Card.Title>
                      VFS {v.VFSlocation} ({moment(v.receivedDate).diff(v.appliedDate,'days')} days) &nbsp;
                      {v.resultValue === "Approved" && <Badge bg="success">{v.resultValue}</Badge>}
                      {v.resultValue === "Rejected" && <Badge bg="danger">{v.resultValue}</Badge>}
                    </Card.Title>
                    <Card.Text>

                    </Card.Text>

                    <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
                      <ul className="timeline">
                        {v.appliedDate && <li className="timeline-item">
                          <div className="timeline-info">
                            <span><Moment format="DD MMMM, YYYY">{v.appliedDate}</Moment></span>
                          </div>
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <h3 className="timeline-title">Applied On</h3>
                          </div>
                        </li>
                        }
                        {v.receivedDate && <li className="timeline-item">
                          <div className="timeline-info">
                            <span><Moment format="DD MMMM, YYYY">{v.receivedDate}</Moment></span>
                          </div>
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <h3 className="timeline-title">Recived On</h3>
                          </div>
                        </li>
                        }
                      </ul>
                    </div>

                  </Card.Body>
                  <ListGroup variant="flush">
        <ListGroup.Item>{v.additionalInfo ? v.additionalInfo : "No Comments!"}</ListGroup.Item>
      </ListGroup>
                </Card>
            )}
        </Row>
      </Container>
    </>
  )
}
