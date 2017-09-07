import React, { Component } from 'react';
import './App.css';

import AddPackage from './components/AddPackage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Combine Ant Packages</h1>
        <AddPackage/>
      </div>
    );
  }
}

export default App;