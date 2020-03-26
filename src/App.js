import React, { Component } from 'react';
import NavBar from './components/layouts/NavBar';
import Users from './components/users/Users';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className = 'App'>
        <NavBar title='GitHub Search' icon='fab fa-github' />
        <div className='container'>
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
