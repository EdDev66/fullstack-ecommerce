import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../CheckoutSteps';
import { InputGroup, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <div className='mt-4'>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
            <Col md={6} className="offset-md-3">
            <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <InputGroup>
                    <Form.Control 
                    type="text" 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"/>
                    </InputGroup>
                </Form.Group>
            </Col>

            <Col md={6} className="offset-md-3">
            <Form.Group>
                <Form.Label>City</Form.Label>
                <InputGroup>
                <Form.Control 
                type="text" 
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Address"/>
                </InputGroup>
            </Form.Group>
            </Col>
            
            <Col md={6} className="offset-md-3">
            <Form.Group>
                <Form.Label>Postal code</Form.Label>
                <InputGroup>
                <Form.Control 
                type="text" 
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Address"/>
                </InputGroup>
            </Form.Group>
            </Col>
            
            <Col md={6} className="offset-md-3">
            <Form.Group>
                <Form.Label>Country</Form.Label>
                <InputGroup>
                <Form.Control 
                type="text" 
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Address"/>
                </InputGroup>
            </Form.Group>

            <Button type='submit' variant='danger'>Continue</Button>
            </Col>

            </Form>
        </div>
    )
}

export default ShippingScreen
