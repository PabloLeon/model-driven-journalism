import React, { Component } from "react";
import Editor from "./components/Editor";
import Autosuggest from "./components/Autosuggest";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Editor plugins={[<Autosuggest />]} />
      </div>
    );
  }
}

export default App;
