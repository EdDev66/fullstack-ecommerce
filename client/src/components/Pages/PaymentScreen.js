import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CheckoutSteps from '../CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCreditCard, FaPaypal } from 'react-icons/fa';
import { savePaymentMethod } from '../../actions/cartActions';

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if(!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <div className='mt-4'>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>

            
                <Col className='mb-2 mt-3'>
                    <Form.Check 
                    type='radio' 
                    label='Paypal or Credit Card' 
                    id='Paypal' 
                    name='paymentMethod'
                    value='PayPal' 
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check> 
                    
                    {/* <Form.Check 
                    type='radio' 
                    label='Stripe' 
                    id='Stripe' 
                    name='paymentMethod'
                    value='Stripe' 
                    onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check> */}
                </Col>
                <FaRegCreditCard size={22}/> / <FaPaypal size={22}/>
            </Form.Group>

            <Button type='submit' variant='danger'>Continue</Button>

            </Form>
        </div>
    )
}

export default PaymentScreen
