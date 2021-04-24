import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Spinner from '../Spinner/Spinner';
import { Link,  Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import './SignInForm.css';

const SignInForm = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Container>
        <div className="signIn-container">

            <Form onSubmit={submitHandler}>
                <h3 className='mb-4'>Sign in</h3>
                {error && <h4>Wrong username or password.</h4>}
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

                
                <p className="h6 mb-3">New user? <span style={{fontSize: 16}}><Link to ='/signup'>Sign up</Link></span></p>
                <Button type="submit" variant="danger">Login</Button>
            </Form>
        </div>
        </Container>
    )
}

export default SignInForm
