import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Article from './components/Article';
import slideParser from './utils/parser';
import slideData, { testMd } from './data';
import Choice from './components/Choice';
// What is this [test](123) ?

// app state (later redux store)
// presentationType= landing, article, prediciton...
// mapParameters= zoom: int, center= [double, double]
// rawMD
// parseComplete
// parseTree

// landing page:
// question (clickable) + map

// on click of question => update question component to article (interactions)
//

class App extends Component {
  componentDidMount() {
    // const parse = slideParser(this.state.rawMD);
    // this.setState({ parseComplete: true, parseTree: parse });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Choice />
        {/* <Article /> */}
      </MuiThemeProvider>
    );
  }
}
export default App;
