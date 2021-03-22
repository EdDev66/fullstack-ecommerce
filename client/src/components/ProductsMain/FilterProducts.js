import React, { useState } from 'react';
import './ProductsMain.css';
import Button from 'react-bootstrap/Button';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

const FilterProducts = () => {
    const [showFilters, setShowFilters] = useState(false);
    
    return (
        <div className="filter-box justify-content-start">
            <h4 className="text-left filter-heading">
                Filters
                <span 
                className="expand-filters" 
                onClick={() => setShowFilters(!showFilters)}> 
                {!showFilters ? <FaCaretDown /> : <FaCaretUp />}
                </span>
            </h4>
            <div className={!showFilters ? 'filter-invisible' : ''}>
                <p className="p-title text-left">Categories</p>
                <p className="text-left">Accesories</p>
                <p className="text-left p-subcategory">Handbags</p>
                <p className="text-left p-subcategory">Watches</p>
                <p className="text-left">Electronics</p>
                <p className="text-left p-subcategory">Mobile</p>
                <p className="text-left p-subcategory">TV</p>
                <p className="text-left">Men</p>
            <p className="text-left p-title">Price</p>
            <Button className="col" variant="outline-danger">Low to High</Button>
            <Button className="col" variant="outline-danger">High to Low</Button>
            </div>
        </div>
    )
}

export default FilterProducts
