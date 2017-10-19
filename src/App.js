import React, { Component } from 'react';
import './App.css';

import PackageContainer from './components/PackageContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Combine Ant Packages</h1>
        <PackageContainer />
      </div>
    );
  }
}

export default App;
