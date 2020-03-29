import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';
import Users from './components/users/Users';
import UserProfile from './components/users/UserProfile';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const App = () => {

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

    // Search GitHub users
    const searchUsers = async text => {
      setLoading(true);
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
      setUsers(res.data.items);
      setLoading(false);
    }

    // Get a GitHub user
    const getUser = async (username) => {
      setLoading(true);
      const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
      setUser(res.data);
      setLoading(false);
    }

    // Get GitHub user repo listing
    const getUserRepos = async (username) => {
      setLoading(true);
      const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
      setRepos(res.data);
      setLoading(false);
    }

    // Clear users from state
    const clearUsers = () => setUsers([]);

    // Set an alert message and type
    const showAlert = (msg, type) => {
      setAlert({ msg, type} );
      setTimeout( () => setAlert(null), 5000);
    }

    return (
      <Router>
      <div className = 'App'>
        <NavBar title='GitHub Search' icon='fab fa-github' />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  showClear={users.length > 0 ? true: false}
                  setAlert={showAlert}
                />
                <Users users={users} loading={loading} />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/userprofile/:login' render={props => (
              <UserProfile {...props }
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                loading={loading}
              />
            )}
            />
          </Switch>
          
        </div>
      </div>
      </Router>
    );
}

export default App;
