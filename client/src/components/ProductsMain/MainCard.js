import React from 'react';
import './ProductsMain.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const MainCard = props => {

   const fetchProduct = () => {
        
   }
    
    return (
        <div className="product-card">
            <Link to={`/products/${props.id}`}>
            <img src={props.image} className="product-image" onClick={fetchProduct}/>
            </Link>
            <p className="product-display-title">{props.title}</p>
            <p className="product-price">{props.price}</p>
            <Button variant="danger">Add to cart</Button>
        </div>
    )
}

export default MainCard
