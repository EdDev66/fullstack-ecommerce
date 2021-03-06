import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ProductsMain.css';

import FilterProducts from './FilterProducts';
import MainCard from './MainCard';

const ProductsMain = props => {

    return (
        <div className="products-container">
            <h1>Shop</h1>
            <Row>
                <Col className="col-md-3 col-lg-2 col-12"><FilterProducts/></Col>
                <Col className="col-md-9 col-lg-10">
                    <Row className="justify-content-around">
                    {props.products.map(product => (
                    <Col key={product._id} className="col-lg-2 col-md-3 card-container col-sm-6 col-12">
                        <MainCard
                        id={product._id}
                        title={product.title} 
                        image={product.image} 
                        price={`$${product.price}`}/>
                    </Col>
                    ))}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default ProductsMain
