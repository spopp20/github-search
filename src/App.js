import React, { Component } from 'react';
import NavBar from './components/layouts/NavBar';
import UserItem from './components/users/UserItem';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className = 'App'>
        <NavBar title='GitHub Search' icon='fab fa-github' />
        <UserItem />
      </div>
    );
  }
}

export default App;
