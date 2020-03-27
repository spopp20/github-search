import React, { Component } from 'react';
import NavBar from './components/layouts/NavBar';
import Users from './components/users/Users';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    users: [],
    loading: false
  }
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get('https://api.github.com/users');
    this.setState({ users: res.data, loading: false });
    //console.log(res.data);
  }

  render() {
    return (
      <div className = 'App'>
        <NavBar title='GitHub Search' icon='fab fa-github' />
        <div className='container'>
          <Users users={this.state.users} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}

export default App;
