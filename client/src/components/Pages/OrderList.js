import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from '../Spinner/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';


const OrderList = ({ history, match }) => {
    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    useEffect(() => {

        if(userInfo){
            if(!userInfo.isAdmin) {
                history.push('/login');
            }
            else {
                dispatch(getAllOrders());
            }
        } 

    }, [dispatch, history, userInfo])



    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Orders</h1>
                </Col>
            </Row>

         {loading ? <Spinner /> : error ? <Alert variant='danger'>{error}</Alert> : (
             <Table striped bordered hover responsive className='table-sm'>
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>USER</th>
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
                             <td>{order.user && order.user.name}</td>
                             <td>${order.totalPrice}</td>
                             <td>
                                 {order.isPaid ? (
                                     order.paidAt.substring(0, 10)
                                 ): 'Not paid'}
                             </td>
                             
                             <td>
                                 {order.isDelivered ? (
                                     order.deliveredAt.substring(0, 10)
                                 ): 'Not delivered'}
                             </td>
                             <td>
                                <Button variant='light' className='btn-sm'>
                                    <Link to={`/order/${order._id}`}>Details</Link>
                                </Button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </Table>
         )}
        </>
    )
}

export default OrderList
