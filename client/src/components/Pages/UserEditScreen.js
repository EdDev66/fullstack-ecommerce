import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Spinner from '../Spinner/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { USER_ADMIN_UPDATE_RESET } from '../../constants/userConstants';
import { useDispatch, useSelector } from 'react-redux';

const UserEditScreen = ({ history, match }) => {
    const userId = match.params.id;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    
    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate , error: errorUpdate , success: successUpdate } = userUpdate


    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_ADMIN_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if(!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, userId, user, successUpdate])

    const adminChangeHandler = (val) => {
        if(val == 'True') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }


    return (
        <>
            <Link to='/admin/userList' className='btn btn-light my-3'>
                &#8592; Go back
            </Link>
        <Container>
        <div className="signIn-container">

            <h3 className='mb-4'>Edit User</h3>
            {loadingUpdate && <Spinner />} 
            {errorUpdate && <Alert variant='danger'>{error}</Alert>}
            {loading ? <Spinner /> : error ? <Alert variant='danger'>{error}</Alert> : (
            <Form onSubmit={submitHandler}>
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
                
                <Col md={6} className="offset-md-3 mb-4">
                <Form.Label className="h6">Is an admin</Form.Label>
                <Form.Check 
                type='checkbox'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
                </Col>
                
                <Button type="submit" variant="danger">Update</Button>
            </Form>
            )}
            
        </div>
        </Container>
        </>
    )
}

export default UserEditScreen
