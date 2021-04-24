import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import Spinner from '../Spinner/Spinner';
import { getOrderDetails, payOrder, deliverOrder } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../constants/orderContants';

const OrderScreen = ({ match, history }) => {

    const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  
  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay
  
  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver 
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
      if(!userInfo) {
          history.push('/login')
      }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })

      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, order])

  

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Spinner /> : error ? <Alert variant='danger'>{error}</Alert> : <>
        <h2 className="mt-4 mb-4">Order {order._id}</h2>

        <Row>
              <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>Shipping</h3>
                        <p>
                            <strong>Address:</strong>
                            {order.isDelivered ? 
                        <Alert variant='success'>Delivered on {order.deliveredAt}</Alert> : 
                        <Alert variant='danger'>Order not delivered</Alert>}
                            {order.shippingAddress.address}, {order.shippingAddress.city},
                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h3>Payment Method</h3>
                        <strong>Method:</strong>
                        {order.isPaid ? 
                        <Alert variant='success'>Paid on {order.paidAt}</Alert> : 
                        <Alert variant='danger'>Order not paid</Alert>}
                        {order.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h3>Order Items</h3>
                        {order.orderItems.length === 0 ? <Alert>Order is empty!</Alert> : (
                            <ListGroup.Item variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>

                                            <Col>
                                             {item.name}
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
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item> 
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Spinner />}
                                    {!sdkReady ? <Spinner /> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                    )}
                                </ListGroup.Item>
                            )}

                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                        Mark as delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                      </ListGroup>
                  </Card>
              </Col>
        </Row>
    </>
}

export default OrderScreen
