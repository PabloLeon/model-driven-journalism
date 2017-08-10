import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Article from './components/Article';

class App extends Component {
  render() {
    return <Article />;
  }
}
export default App;
