import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';
import Users from './components/users/Users';
import UserProfile from './components/users/UserProfile';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    this.setState({ users: res.data, loading: false });
  }

  // Search GitHub users
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    this.setState({ users: res.data.items, loading: false });
  }

  // Get a GitHub user
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    this.setState({ user: res.data, loading: false }); 
  }

  // Clear users from state
  clearUsers = () => this.setState({  users: [], loading: false });

  // Set an alert message and type
  setAlert = (msg, type) => {
    this.setState({ alert: {msg, type }});
    setTimeout( () => this.setState({ alert: null}), 5000);
  }

  render() {
    const { users, user, loading } = this.state;
    return (
      <Router>
      <div className = 'App'>
        <NavBar title='GitHub Search' icon='fab fa-github' />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                  searchUsers={this.searchUsers}
                  clearUsers={this.clearUsers}
                  showClear={users.length > 0 ? true: false}
                  setAlert={this.setAlert}
                />
                <Users users={users} loading={loading} />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/userprofile/:login' render={props => (
              <UserProfile {...props } getUser={this.getUser} user={user} loading={loading} />
            )}
            />
          </Switch>
          
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
