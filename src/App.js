import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EntryGrid from './EntryGrid';
class App extends Component {
  render() {
    return (
      <div className="App">
        <EntryGrid/>
      </div>
);
  }
}
export default App;