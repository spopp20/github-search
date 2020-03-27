import React, { Component } from 'react';
import NavBar from './components/layouts/NavBar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    users: [],
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

  // Clear users from state
  clearUsers = () => this.setState({  users: [], loading: false });

  // Set an alert message and type
  setAlert = (msg, type) => this.setState({ alert: {msg, type }});

  render() {
    const { users, loading } = this.state;
    return (
      <div className = 'App'>
        <NavBar title='GitHub Search' icon='fab fa-github' />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search 
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true: false}
            setAlert={this.setAlert}
          />
          <Users users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
