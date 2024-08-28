import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useDispatch } from 'react-redux';
import { setAlertShow } from '../../ReduxStore/Action';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import ToggleButton from 'react-bootstrap/esm/ToggleButton';

export default function Contact() {
    const [linkedInId, setLinkedInId] = useState('')
    const [isPublic, setIsPublic] = useState("Public")
    const [editMode, setEditMode] = useState(true)
    const dispatch = useDispatch()
    const isPublicValues = [
        { name: 'Public', value: "Public" },
        { name: 'Private', value: "Private" },
    ];

    const saveContact = () => {
        const data = { profile: linkedInId, isPublic }
        console.log(data);
        axios.post('/Contact/save', data).then(response => {
            console.log(response);
            if (response && response.data.success) {
                dispatch(setAlertShow('success', 'Congratulations!', response.data.message))
                setEditMode(false)
            }

        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get('/Contact/').then(response => {
            console.log(response);
            if (response.data.success && response.data.data) {
                setLinkedInId(response.data.data.profile)
                setIsPublic(response.data.data.isPublic)
                setEditMode(false)
            }
            else {
                setEditMode(true)
            }
        })
    }, [])


    return (
        <>
            <Form>
                <Form.Group as={Row}>

                    <Form.Label column sm={2} htmlFor="basic-url">Your Linked In Profile:</Form.Label>
                    <Col sm={10}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3">
                                https://www.linkedin.com/in/
                            </InputGroup.Text>
                            <Form.Control id="basic-url" aria-describedby="basic-addon3" disabled={!editMode} value={linkedInId} onChange={e => setLinkedInId(e.target.value)} placeholder='jay-solanki-bbb3771a1' />
                        </InputGroup>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                            Your Contact details:
                            </Form.Label>
                            <Col sm="10">
                                <ButtonGroup>
                                    {isPublicValues.map((r, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`isPublic-${idx}`}
                                            type="radio"
                                            variant={idx === 0 ? 'outline-success' : 'outline-danger'}
                                            name="isPublic"
                                            value={r.value}
                                            checked={isPublic === r.value}
                                            onChange={(e) => setIsPublic(e.currentTarget.value)}
                                            disabled = {!editMode}
                                        >
                                            {r.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Col>
                        </Form.Group>
                <br />

                <Button variant="primary" onClick={saveContact} disabled={!editMode}>
                    Save
                </Button>
                <Button className='m-2' disabled={editMode} onClick={() => setEditMode(true)}>
                    Edit
                </Button>
            </Form>
        </>
    )
}
