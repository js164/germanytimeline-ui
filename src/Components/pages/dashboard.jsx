import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ScrollReveal from 'scrollreveal'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default function Dashboard() {

  const configval = {
    origin: "bottom",
    duration: 1000,
    delay: 150,
    distance: "500px",
    scale: 1,
    easing: "ease",
    reset: true
  };

  ScrollReveal().reveal('.aps', { ...configval, delay: 300 })
  ScrollReveal().reveal('.course', { ...configval, delay: 600 })
  ScrollReveal().reveal('.university', { ...configval, delay: 900 })
  ScrollReveal().reveal('.visa', { ...configval, delay: 1200 })
  ScrollReveal().reveal('.germany', { ...configval, delay: 1500 })

  return (
    <>
      <div style={{ height: "90vh", width: "100vw", backgroundColor: "##d8f2fd" }}>
        <Row style={{ height: "100%", alignItems: "flex-end" }}>
          <Col className='aps' lg={2} xs={2} style={{ height: "100%", textAlign: "center", padding: "0" }}>
            <h2 style={{ height: "80%", alignContent: "end", fontSize: "3vw" }}>APS</h2>
            <div style={{ height: "20%", width: "100%", backgroundColor: "#AC92EB" }}></div>
          </Col>
          <Col className='course' lg={2} xs={2} style={{ height: "100%", textAlign: "center", padding: "0" }}>
            <h2 style={{ height: "70%", alignContent: "end", fontSize: "3vw" }}>Course</h2>
            <div style={{ height: "30%", width: "100%", backgroundColor: "#4FC1E8" }}></div>
          </Col>
          <Col className='university' lg={2} xs={2} style={{ height: "100%", textAlign: "center", padding: "0" }}>
            <h2 style={{ height: "60%", alignContent: "end", fontSize: "3vw" }}>University</h2>
            <div style={{ height: "40%", width: "100%", backgroundColor: "#A0D568" }}></div>
          </Col>
          <Col className='visa' lg={2} xs={2} style={{ height: "100%", textAlign: "center", padding: "0" }}>
            <h2 style={{ height: "50%", alignContent: "end", fontSize: "3vw" }}>Visa</h2>
            <div style={{ height: "50%", width: "100%", backgroundColor: "#FFCE54" }}></div>
          </Col>
          <Col className='germany' lg={4} xs={4} style={{ height: "100%", textAlign: "center", padding: "0" }}>
            <h2 style={{ height: "35%", alignContent: "end", fontSize: "3vw" }}> Germany </h2>
            <div style={{ height: "65%", width: "100%", backgroundColor: "#ED5564" }}></div>
          </Col>
          {/* <Col style={{height:"100%",width:"100%",textAlign:"center",padding:"0"}}>
            <div style={{height:"35%", alignContent:"end",fontSize:"3rem"}}></div>
            <div style={{height:"65%",width:"100%",backgroundColor:"#ED5564"}}></div>
          </Col> */}
        </Row>
      </div>

      <br /><br /><br />
      <div className="APSlist">
        <h1 className='m-4' style={{ textAlign: "center", color: "#4070F4", textDecoration: "underline" }}>APS</h1>
        <div>
          <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
            <div>
              <img src="/APS.jpg" alt="" srcset="" style={{ maxHeight: "500px" }} />
            </div>
            <div>
              <h3>Steps to apply APS Certificate</h3>
              <ul>
                <li>Step 1: Get information in advance</li>
                <li>Step 2: Plan your application</li>
                <li>Step 3: Assemble your documents</li>
                <li>Step 4: Register yourself</li>
                <li>Step 5: Pay online</li>
                <li>Step 6: Send the documents and track the application</li>
              </ul>
              <h5>For more details: <Link target="_blank" to="https://aps-india.de/">https://aps-india.de/</Link></h5>
              <br />
              <Button variant="primary"><Link to='/aps' className='mx-1' style={{ color: "white", textDecoration: "none" }}>View APS Timeline</Link> </Button>
            </div>
          </div>
        </div>
      </div>

      <br /><br /><br />
      <div className="Courselist">
        <h1 className='m-4' style={{ textAlign: "center", color: "#4070F4", textDecoration: "underline" }}>Courses</h1>
        <div>
          <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/ME.jpg" />
              <Card.Body>
                <Card.Title>Mechanical Engineering</Card.Title>
                <Button variant="primary"><Link to='/course?c=ME' className='mx-1' style={{ color: "white", textDecoration: "none" }}> Show Timeline </Link></Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/CS.jpg" />
              <Card.Body>
                <Card.Title>Computer Science</Card.Title>
                <Button variant="primary"><Link to='/course?c=CS' className='mx-1' style={{ color: "white", textDecoration: "none" }}> Show Timeline </Link></Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/BM.jpg" />
              <Card.Body>
                <Card.Title>Business & Management</Card.Title>
                <Button variant="primary"><Link to='/course?c=BM' className='mx-1' style={{ color: "white", textDecoration: "none" }}> Show Timeline </Link></Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/other.jpg" />
              <Card.Body>
                <Card.Title>All Courses</Card.Title>
                <Button variant="primary"><Link to='/course' className='mx-1' style={{ color: "white", textDecoration: "none" }}> Show Timeline </Link></Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <br /><br /><br />
      <div className="Courselist">
        <h1 className='m-4' style={{ textAlign: "center", color: "#4070F4", textDecoration: "underline" }}>University</h1>
        <div>
          <Row style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }} className='mx-4'>
            <Card className='courseToTimeline' style={{ width: '18rem', border:"none",transition: "transform .2s", cursor:"pointer" }}>
            <Link to='/university?u=TUM' className='mx-1' style={{ color: "white", textDecoration: "none" }}><Card.Img variant="top" src="/TUM.jpg"/></Link>
            </Card>
            <Card className='courseToTimeline' style={{ width: '18rem', border:"none",transition: "transform .2s", cursor:"pointer" }}>
              <Link to='/university?u=TUD' className='mx-1' style={{ color: "white", textDecoration: "none" }}><Card.Img variant="top" src="/TUD.jpg" /></Link>
            </Card>
            <Card className='courseToTimeline' style={{ width: '18rem', border:"none",transition: "transform .2s", cursor:"pointer" }}>
            <Link to='/university?u=LMU' className='mx-1' style={{ color: "white", textDecoration: "none" }}><Card.Img variant="top" src="/LMU.jpg" /></Link>
            </Card>
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }} className='mx-4'>
            <Card className='courseToTimeline' style={{ width: '18rem', border:"none",transition: "transform .2s", cursor:"pointer" }}>
            <Link to='/university?u=TUB' className='mx-1' style={{ color: "white", textDecoration: "none" }}><Card.Img variant="top" src="/TUB.jpg" /></Link>
            </Card>
            <Card className='courseToTimeline' style={{ width: '18rem', border:"none",transition: "transform .2s", cursor:"pointer" }}>
            <Link to='/university?u=RWTH' className='mx-1' style={{ color: "white", textDecoration: "none" }}><Card.Img variant="top" src="/RWTH.jpg" /></Link>
            </Card>
          </Row>
        </div>
      </div>
    </>
  )
}
