import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Dashboard() {
  return (
    <>
      <div style={{height:"90vh",width:"100vw", backgroundColor:"#d8f2fd"}}>
        <Row style={{height:"100%",alignItems: "flex-end"}}>
          <Col lg={2} xs={2} style={{height:"100%",textAlign:"center",padding:"0"}}>
            <h2 style={{height:"80%", alignContent:"end",fontSize:"3vw"}}>APS</h2>
            <div style={{height:"20%",width:"100%",backgroundColor:"#AC92EB"}}></div>
          </Col>
          <Col lg={2} xs={2} style={{height:"100%",textAlign:"center",padding:"0"}}>
            <h2 style={{height:"70%", alignContent:"end",fontSize:"3vw"}}>Course</h2>
            <div style={{height:"30%",width:"100%",backgroundColor:"#4FC1E8"}}></div>
          </Col>
          <Col lg={2} xs={2} style={{height:"100%",textAlign:"center",padding:"0"}}>
            <h2 style={{height:"60%", alignContent:"end",fontSize:"3vw"}}>University</h2>
            <div style={{height:"40%",width:"100%",backgroundColor:"#A0D568"}}></div>
          </Col>
          <Col lg={2} xs={2} style={{height:"100%",textAlign:"center",padding:"0"}}>
            <h2 style={{height:"50%", alignContent:"end",fontSize:"3vw"}}>Visa</h2>
            <div style={{height:"50%",width:"100%",backgroundColor:"#FFCE54"}}></div>
          </Col> 
          <Col lg={4} xs={4} style={{height:"100%",textAlign:"center",padding:"0"}}>
            <h2 style={{height:"35%", alignContent:"end",fontSize:"3vw"}}> Germany </h2>
            <div style={{height:"65%",width:"100%",backgroundColor:"#ED5564"}}></div>
          </Col>
          {/* <Col style={{height:"100%",width:"100%",textAlign:"center",padding:"0"}}>
            <div style={{height:"35%", alignContent:"end",fontSize:"3rem"}}></div>
            <div style={{height:"65%",width:"100%",backgroundColor:"#ED5564"}}></div>
          </Col> */}
        </Row>
      </div>
    </>
  )
}
