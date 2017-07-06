import React, { Component } from "react";
import Editor from "./components/Editor";
import "./App.css";
import "draft-js/dist/Draft.css";

class App extends Component {
  render() {
    return (
      <div>
        <Editor />
      </div>
    );
  }
}

export default App;
