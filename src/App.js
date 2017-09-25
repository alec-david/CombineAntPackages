import React, { Component } from "react";
import "./App.css";

import AddAndCombinePackages from "./components/AddAndCombinePackages";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Combine Ant Packages</h1>
        <AddAndCombinePackages />
      </div>
    );
  }
}

export default App;
