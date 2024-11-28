import React from 'react';
import PropTypes from 'prop-types';
import './MyBtn.css'; // Import the custom CSS

const MyBtn = ({ children, variant = 'primary', className = '', ...props }) => {
    return (
        <button
            className={`btn btn-${variant} my-btn ${className}`}
            {...props} // Pass all other props (like onClick, type, etc.)
        >
            {children}
        </button>
    );
};

// Define prop types for better reusability and clarity
MyBtn.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    className: PropTypes.string,
};

export default MyBtn;
