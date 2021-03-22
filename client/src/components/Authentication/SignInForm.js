import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import './SignInForm.css';

const SignInForm = () => {
    return (
        <Container>
        <div className="signIn-container">

            <Form>
                <Col md={6} className="offset-md-3">
                <Form.Group>
                    <Form.Label className="h6">Username</Form.Label>
                    <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FaUserAlt />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                    <Form.Control type="text" placeholder="Username"/>
                    </InputGroup>
                </Form.Group>
                </Col>
                
                <Col md={6} className="offset-md-3">
                <Form.Group>
                    <Form.Label className="h6">Password</Form.Label>
                    <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FaLock />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                    <Form.Control type="password" placeholder="Password"/>
                    </InputGroup>
                </Form.Group>
                </Col>

                <p className="h6 mb-3">New user? <span><Link to ='/signup'>Sign up</Link></span></p>
                
                <Button type="submit" variant="danger">Login</Button>
            </Form>
        </div>
        </Container>
    )
}

export default SignInForm
