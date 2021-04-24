import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Spinner from '../Spinner/Spinner';
import { FaLock, FaUser, FaEnvelope } from 'react-icons/fa';
import './SignInForm.css';
import { register } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const SignInForm = ({ history, location }) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password))
    }

    return (
        <Container>
        <div className="signIn-container">

            <Form onSubmit={submitHandler}>
            <h3 className='mb-4'>Sign up</h3>
            {error && <h4>{error}.</h4>}
            {loading && <Spinner />}
            <Col md={6} className="offset-md-3">
                <Form.Group>
                    <Form.Label className="h6">Email</Form.Label>
                    <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FaEnvelope />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                    <Form.Control 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"/>
                    </InputGroup>
                </Form.Group>
                </Col> 
                
                <Col md={6} className="offset-md-3">
                <Form.Group>
                    <Form.Label className="h6">Name</Form.Label>
                    <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FaUser />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                    <Form.Control 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"/>
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
                    <Form.Control 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"/>
                    </InputGroup>
                </Form.Group>
                </Col>
                <Button type="submit" variant="danger">Sign up</Button>
            </Form>
        </div>
        </Container>
    )
}

export default SignInForm
