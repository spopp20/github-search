import React from 'react';
import PropTypes from 'prop-types';

// Convert to functional component
const NavBar  = ({ icon, title }) => {

    return (
        <nav className="navbar bg-primary">
        <h1>
            <i className= {icon} /> {title}
        </h1>  
        </nav>
    )
};

NavBar.defaultProps = {
    title: 'Navigation Bar',
    icon: 'fab fa-github'
};

NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default NavBar