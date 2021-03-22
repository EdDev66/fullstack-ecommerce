import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import ProductsContext from '../../context/ProductsContext';
import { FaChevronLeft } from 'react-icons/fa';
import '../ProductsMain/ProductsMain.css';

const SingleProduct = ({ match }) => {

   const productsContext = useContext(ProductsContext);

   const { currentProduct , loading } = productsContext;



    return (
        <Fragment>
        {loading ? <Spinner /> : (
            <div>
                <Row>
                <Link className="btn btn-light my-3 mx-3" to='/'>
                <FaChevronLeft />Go back
                </Link>
                </Row>
            <Row>
                <Col md={6}>
               <img src={currentProduct.image} alt={currentProduct.title} style={{width: '300px', height: '380px'}}/>
                </Col>
                <Col md={3}>
               <ListGroup variant='flush'>
                   <ListGroup.Item>
                        <h3>{currentProduct.title}</h3>
                   </ListGroup.Item>
                   <ListGroup.Item>
                        <h4>Price: ${currentProduct.price}</h4>
                   </ListGroup.Item>
                   <ListGroup.Item>
                        <Button className='btn-block my-4' type='button'>Add to Cart</Button>
                   </ListGroup.Item>
               </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col className='col-10 offset-1'>
                <ListGroup variant='flush'>
                   <ListGroup.Item>
                        <p className='h5 py-3'>{currentProduct.description}</p>
                   </ListGroup.Item>
                   </ListGroup>
                </Col>
            </Row>

        </div>
        )   
    }
    </Fragment>
    )
}

export default SingleProduct
