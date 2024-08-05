import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ScrollReveal from 'scrollreveal'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default function Dashboard() {

  const configval1 = {
    origin: "bottom",
    duration: 1000,
    delay: 150,
    distance: "500px",
    scale: 1,
    easing: "ease",
    cleanup: true,
    reset: true
  };

  const configval2 = {
    // origin: "top",
    duration: 1000,
    delay: 150,
    distance: "50px",
    scale: 1,
    easing: "ease",
    cleanup: true,
    reset: true
  };

  ScrollReveal().reveal('.aps', { ...configval1, delay: 300 })
  ScrollReveal().reveal('.course', { ...configval1, delay: 600 })
  ScrollReveal().reveal('.university', { ...configval1, delay: 900 })
  ScrollReveal().reveal('.visa', { ...configval1, delay: 1200 })
  ScrollReveal().reveal('.germany', { ...configval1, delay: 1500 })
  ScrollReveal().reveal('.APSlist', { ...configval2, delay: 300 })
  ScrollReveal().reveal('.Courselist', { ...configval2, delay: 300 })
  ScrollReveal().reveal('.Universitylist', { ...configval2, delay: 300 })
  ScrollReveal().reveal('.Visalist', { ...configval2, delay: 300 })

  return (
    <>
      <div style={{ height: "90vh", width: "100vw", backgroundColor: "##d8f2fd",overflow:'hidden' }}>
        <Row style={{ height: "100%", alignItems: "flex-end", margin: "0"}}>
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
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center" }}>
            <div className='m-2'>
              <img src="/APS.jpg" alt="" srcSet="" style={{ maxHeight: "500px" }} />
            </div>
            <div className='m-2'>
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
      <div className="Courselist" style={{backgroundColor:"#c5bcdb"}}>
        <h1 className='m-4' style={{ textAlign: "center", color: "#4070F4", textDecoration: "underline" }}>Courses</h1>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center" }}>
            <Card style={{ width: '18rem' }} className='m-2'>
              <Card.Img variant="top" src="/ME.jpg" />
              <Card.Body>
                <Card.Title>Mechanical Engineering</Card.Title>
                <Button variant="primary"><Link to='/course?c=ME' className='mx-1' style={{ color: "white", textDecoration: "none" }}> Show Timeline </Link></Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }} className='m-2'>
              <Card.Img variant="top" src="/CS.jpg" />
              <Card.Body>
                <Card.Title>Computer Science</Card.Title>
                <Button variant="primary"><Link to='/course?c=CS' className='mx-1' style={{ color: "white", textDecoration: "none" }}> Show Timeline </Link></Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }} className='m-2'>
              <Card.Img variant="top" src="/BM.jpg" />
              <Card.Body>
                <Card.Title>Business & Management</Card.Title>
                <Button variant="primary"><Link to='/course?c=BM' className='mx-1' style={{ color: "white", textDecoration: "none" }}> Show Timeline </Link></Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }} className='m-2'>
              <Card.Img variant="top" src="/other.jpg" />
              <Card.Body>
                <Card.Title>All Courses</Card.Title>
                <Button variant="primary"><Link to='/course' className='mx-1' style={{ color: "white", textDecoration: "none" }}> Show Timeline </Link></Button>
              </Card.Body>
            </Card>
          </div>
        </div>
        <br />
      </div>

      <br /><br /><br />
      <div className="Universitylist">
        <h1 className='m-4' style={{ textAlign: "center", color: "#4070F4", textDecoration: "underline" }}>University</h1>
        <div>
          <Row style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center" }} className='mx-4'>
            <Card className='courseToTimeline m-2' style={{ width: '18rem', border:"none",transition: "transform .2s", cursor:"pointer" }}>
            <Link to='/university?u=TUM' className='mx-1' style={{ color: "white", textDecoration: "none" }}><Card.Img variant="top" src="/TUM.jpg"/></Link>
            </Card>
            <Card className='courseToTimeline m-2' style={{ width: '18rem', border:"none",transition: "transform .2s", cursor:"pointer" }}>
              <Link to='/university?u=TUD' className='mx-1' style={{ color: "white", textDecoration: "none" }}><Card.Img variant="top" src="/TUD.jpg" /></Link>
            </Card>
            <Card className='courseToTimeline m-2' style={{ width: '18rem', border:"none",transition: "transform .2s", cursor:"pointer" }}>
            <Link to='/university?u=LMU' className='mx-1' style={{ color: "white", textDecoration: "none" }}><Card.Img variant="top" src="/LMU.jpg" /></Link>
            </Card>
          </Row>
          <Row style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center" }} className='mx-4'>
            <Card className='courseToTimeline m-2' style={{ width: '18rem', border:"none",transition: "transform .2s", cursor:"pointer" }}>
            <Link to='/university?u=TUB' className='mx-1' style={{ color: "white", textDecoration: "none" }}><Card.Img variant="top" src="/TUB.jpg" /></Link>
            </Card>
            <Card className='courseToTimeline m-2' style={{ width: '18rem', border:"none",transition: "transform .2s", cursor:"pointer" }}>
            <Link to='/university?u=RWTH' className='mx-1' style={{ color: "white", textDecoration: "none" }}><Card.Img variant="top" src="/RWTH.jpg" /></Link>
            </Card>
          </Row>
        </div>
      </div>

      <br /><br /><br />
      <div className="Visalist" style={{backgroundColor:"#c5bcdb"}}>
        <h1 className='m-4' style={{ textAlign: "center", color: "#4070F4", textDecoration: "underline" }}>Visa</h1>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center" }}>
            <div style={{flex: "0 0 30%", textAlign:"right"}} className='m-2'>
              <img src="/VFS_india_map.jpg" alt="" srcSet="" style={{ maxHeight: "500px", maxWidth:"90vw" }} />
            </div>
            <div style={{flex: "0 0 50%", textAlign:"justify"}} className='m-2'>
              <h3>State wise allocated VFS</h3>
              <ul>
                <li><strong>VFS New Delhi:</strong> Haryana, Himachal Pradesh, Jammu and Kashmir, Punjab, Rajasthan, Sikkim, Uttar Pradesh, Uttarakhand as well as the Union Territories of Chandigarh, NCT of Delhi, Andaman and Nicobar Islands, Lakshadweep including Minicoy and Amini.</li>
                <li><strong>VFS Mumbai:</strong> Maharashtra, Gujarat, Goa, Madhya Pradesh, Chhattisgarh, Daman and Diu</li>
                <li><strong>VFS Kolkata:</strong> West Bengal, Bihar, Jharkhand, Orissa, Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland and Tripura</li>
                <li><strong>VFS Bangalore:</strong> Karnataka and Kerala</li>
                <li><strong>VFS Chennai:</strong> Andhra Pradesh, Tamil Nadu, Telangana and Pondicherry</li>
              </ul>
              <h5>Visa VFS Appointment: <Link target="_blank" to="https://visa.vfsglobal.com/ind/en/deu/">https://visa.vfsglobal.com/ind/en/deu/</Link></h5>
              <h5>Student Visa Checklist: <Link target="_blank" to="https://india.diplo.de/in-en/service/-/2552164">https://india.diplo.de/in-en/service/-/2552164</Link></h5>
              <br />
              <Button variant="primary"><Link to='/visa' className='mx-1' style={{ color: "white", textDecoration: "none" }}>View Visa Timeline</Link> </Button>
            </div>
          </div>
        </div>
        <br />
      </div>

      <footer className='p-2' style={{backgroundColor:"black", color:"white", textAlign:"center"}}>
          Made by Student, Made for Students
      </footer>
    </>
  )
}
