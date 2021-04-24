import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';

import Meta from '../Meta';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import SlideShow from '../Slideshow/SlideShow';
import Paginate from '../Paginate';
import ProductsMain from '../ProductsMain/ProductsMain';

const Home = ({ match }) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, displayProducts, pages, page } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
      }, [dispatch, keyword, pageNumber])


    return (
        
        <Fragment>
            <Meta />
            {loading ? <Spinner /> : error ? <h3>{error}</h3> : (
            <Fragment>
               {!keyword ? <SlideShow products={displayProducts}/> : <Link to='/' className='btn btn-light'>Go Back</Link>}
                <ProductsMain products={products}/>
            </Fragment>
            )}
            <Col className="offset-md-6 mt-4">
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
            </Col>
         </Fragment>
        
    )
}

export default Home
