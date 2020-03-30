import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Display a quick user overview
const UserItem = ({user: {login, avatar_url }}) => {
    return (
      <div className="card text-center">
            <img src={avatar_url} alt="Avatar" className="round-img" style={{ width: '60px' }}/>
            <h3>{login}</h3>
            <div>
              <Link to={`/userprofile/${login}`} className="btn btn-dark btn-sm my-1">Profile</Link>
            </div>
        </div>  
    );
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserItem
