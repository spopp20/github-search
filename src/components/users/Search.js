import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = ({ setAlert }) =>  {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState(''); 

    const onSubmit = e => {
        e.preventDefault();
        if (text === '') {
            alertContext.setAlert('Enter Search text.', 'light')
        } else {
            githubContext.searchUsers(text);
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
            {githubContext.showClear && (
                <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>  
            )}
        </div>
    )
}

export default Search
