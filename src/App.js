import React, { Component } from 'react';
import './App.css';
import NavBar from './components/layouts/NavBar';

class App extends Component {

  render() {
    return (
      <NavBar title='GitHub Search' icon='fab fa-github' />
    );
  }
}

export default App;
