import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return (
        <div>
            <div className="spinner-border text-danger m-5" role="status">
            <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
