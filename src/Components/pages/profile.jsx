import React, { useState } from 'react'
import NavBar from '../General/NavBar'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import MyUniversity from '../blocks/myUniversity';
import Modal from 'react-bootstrap/Modal';

export default function Profile(props) {

    const [universityShow, setUniversityShow] = useState(false);

    const universityClose = () => setUniversityShow(false);
    const addUniversityShow = () => setUniversityShow(true);
    
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
                </div>
                
                </div>
            </Container>

        </>
    )
}
