import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listSingleProduct } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import Meta from '../Meta';
import Spinner from '../Spinner/Spinner';
import { FaChevronLeft } from 'react-icons/fa';
import '../ProductsMain/ProductsMain.css';

const SingleProduct = ({ history, match }) => {

    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();

    const singleProduct = useSelector(state => state.singleProduct)
    const { loading, error, product } = singleProduct

    useEffect(() => {
        dispatch(listSingleProduct(match.params.id))
    }, [dispatch])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }

    return (
        <Fragment>
            {loading ? <Spinner /> : error ? <h3>{error}</h3> : (
                <div>
                <Row>
                <Link className="btn btn-light my-3 mx-3" to='/'>
                <FaChevronLeft />Go back
                </Link>
                </Row>
            <Row>
                <Meta title={product.title}/>
                <Col md={6}>
               <img src={product.image} alt={product.title} style={{width: '500px', height: '400px'}}/>
                </Col>
                <Col md={4}>
               <ListGroup variant='flush'>
                   <ListGroup.Item>
                        <h3>{product.title}</h3>
                   </ListGroup.Item>
                   <ListGroup.Item>
                        <h4>Price: ${product.price}</h4>
                   </ListGroup.Item>
                   <ListGroup.Item>
                        <p>Rating: {product.rating} / 5</p>
                   </ListGroup.Item>
                   <ListGroup.Item>
                        <p>In Stock: {product.countInStock}</p>
                   </ListGroup.Item>

                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col sm={8}>Quantity</Col>
                                <Col>
                                  <Form style={{padding: 10}} as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                {    [...Array(product.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                  </Form>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}

                   <ListGroup.Item>
                        <Button 
                        onClick={addToCartHandler}
                        className='btn-block my-4' 
                        type='button'>Add to Cart</Button>
                   </ListGroup.Item>
               </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col className='col-8 offset-2'>
                <ListGroup variant='flush'>
                   <ListGroup.Item>
                        <p className='h5 py-3'>{product.description}</p>
                   </ListGroup.Item>
                   </ListGroup>
                </Col>
            </Row>

        </div>
            )}
            
    </Fragment>
    )
}

export default SingleProduct
