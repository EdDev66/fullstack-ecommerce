import React, { Fragment, useEffect, useContext } from 'react';
import ProductsContext from '../../context/ProductsContext';

import Spinner from '../Spinner/Spinner';
import SlideShow from '../Slideshow/SlideShow';
import ProductsMain from '../ProductsMain/ProductsMain';

const Home = () => {
    const productsContext = useContext(ProductsContext);

    const { fetchData, products, displayProducts, loading } = productsContext;

    useEffect(() => {
        fetchData();
      }, [])

      

    return (
        <Fragment>
           {loading ? <Spinner /> : (
            <Fragment>
                <SlideShow products={displayProducts}/>
                <ProductsMain products={products}/> 
            </Fragment>
           )}
           
        </Fragment>
    )
}

export default Home
