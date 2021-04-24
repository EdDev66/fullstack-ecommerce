import React from 'react';
import './CardShowcase.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const CardShowcase = props => {
    return (
        <div className="product-container">
            <Link to={`/products/${props.id}`}>
                <img src={props.image} className='showcase-image'/>
            </Link>
            <p className="product-title">{props.title}</p>
            <p className="product-price">{`$${props.price}`}</p>
            <Button variant="danger">Add to cart</Button>
            
        </div>
    )
}

export default CardShowcase;