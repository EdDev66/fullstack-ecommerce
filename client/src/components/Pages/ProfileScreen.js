import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { FaLock, FaUser, FaEnvelope } from 'react-icons/fa';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { getMyOrders } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

const ProfileScreen = ({ history, location }) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    
    const orderDetails = useSelector(state => state.orderGet)
    const { orders, error: errorOrders, loading: loadingOrders } = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.updateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
      if(!userInfo) {
          history.push('/login')
      } else {
          if(!user.name) {
            dispatch(getUserDetails('profile'));
            dispatch(getMyOrders());
          } else {
            setName(user.name)
            setEmail(user.email)
          }
      }
    }, [dispatch, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }

    return (
        <Row className="mt-4">
            <Col lg={6} className="mb-4">
            <Form onSubmit={submitHandler}>
            <h3 className='mb-4'>User profile</h3>
            {error && <h4>{error}.</h4>}
            {success && <Alert variant='success'>Profile updated</Alert>}
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
                <Button type="submit" variant="danger">Update</Button>
            </Form>
            </Col>

            <Col lg={6}>
                <h2>My orders</h2>
                {loadingOrders ? <Spinner /> : errorOrders ? <Alert variant='danger'>{errorOrders}</Alert> : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                  <td>{order._id}</td>
                                  <td>{order.totalPrice}</td>
                                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Not paid'}</td>
                                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Not Delivered'}</td>
                                  <td>
                                      <Link to={`/orders/${order._id}`}>
                                          <Button className="btn-sm" variant='danger'>Details</Button>
                                      </Link>
                                  </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
