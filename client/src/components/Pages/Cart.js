import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Cart = () => {
    return (
        <div className="mt-3">
            <Row>
                <Col md={8}>
                    <p className="h2">Shopping Cart</p>
                </Col>
                <Col md={4}>
                    <p className="h5">Subtotal (0) Items</p>
                </Col>
            </Row>
        </div>
    )
}

export default Cart
