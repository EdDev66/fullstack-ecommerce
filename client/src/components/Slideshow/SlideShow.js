import React from 'react';
import Carousel from 'react-elastic-carousel';
import CardShowcase from '../ProductCard/CardShowcase';
import './SlideShow.css';

const SlideShow = props => {
    const breakpoint = [
        {width: 550, itemsToShow: 1},
        {width: 660, itemsToShow: 3},
        {width: 850, itemsToShow: 4},
    ]

    return (
        <div className="slideshow-container">
        <h2 className="slideshow-heading">Featured Products</h2>

        <Carousel breakPoints={breakpoint}>
            {props.products.map(product => (
                <CardShowcase 
                id={product._id}
                key={product._id}
                title={product.title} 
                image={product.image} 
                price={product.price}/>
            ))}
        </Carousel>
        </div>
    )
}

export default SlideShow;