import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types'

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) =>  {
    const [text, setText] = useState(''); 

    const onSubmit = e => {
        e.preventDefault();
        if (text === '') {
            setAlert('Enter Search text.', 'light')
        } else {
            searchUsers(text);
        }  
    };

    const onChange = e => setText(e.target.value);

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input 
                    type="text"
                    name="text"
                    placeholder="Search Users..."
                    value={text}
                    onChange={onChange} />
                <input
                    type="submit"
                    className="btn btn-dark btn-block" />
            </form>
            {showClear && (
                <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>  
            )}
        </div>
    )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
};

export default Search
