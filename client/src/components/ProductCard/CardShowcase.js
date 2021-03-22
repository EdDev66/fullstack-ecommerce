import React from 'react';
import './CardShowcase.css';
import PhoneImg from '../../assets/img/phone.png';
import Button from 'react-bootstrap/Button';

const CardShowcase = props => {
    return (
        <div className="product-container">
            <img src={props.image} className='showcase-image'/>
            <p className="product-title">{props.title}</p>
            <p className="product-price">{`$${props.price}`}</p>
            <Button variant="danger">Add to cart</Button>
            
        </div>
    )
}

export default CardShowcase;