import React, { Component } from "react";
import "./App.css";
import MapView from "./MapView";
import LandingQuestion from "./LandingQuestion";

class App extends Component {
  render() {
    return (
      <div>
        <MapView />
        <LandingQuestion />
      </div>
    );
  }
}

export default App;
