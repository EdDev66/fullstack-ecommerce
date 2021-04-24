import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../CheckoutSteps';
import { createOrder } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch();
    
    const cart = useSelector(state => state.cart);

    // Calculate prices
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;

    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice)

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
        }
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
        }));
    }

    return (
        <div className="mt-4">
          <CheckoutSteps step1 step2 step3 step4 />
          <Row>
              <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>Shipping</h3>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city},
                            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h3>Payment Method</h3>
                        <strong>Method:</strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h3>Order Items</h3>
                        {cart.cartItems.length === 0 ? <Alert>Your cart is empty!</Alert> : (
                            <ListGroup.Item variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>

                                            <Col>
                                                <Link to={`/products/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>

                                            <Col>
                                                Quantity: {item.qty}
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup.Item>
                        )}
                    </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md={4}>
                  <Card>
                      <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item> 
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Alert variant='danger'>{error}</Alert>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                type='button' 
                                className='btn-block btn-danger' 
                                dislabed={cart.cartItems === 0}
                                onClick={placeOrderHandler}>
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                      </ListGroup>
                  </Card>
              </Col>
          </Row>
        </div>
    )
}

export default PlaceOrderScreen
