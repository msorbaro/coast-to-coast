import React from 'react';
import logo from './logo.svg';
import PollBoard from './PollBoard';
import Signin from './Signin.js';
import UserComponent from './UserComponent.js';
import MainApp from './MainApp.js';
import fire from './config/Fire';

function App() {
  return (
    <div className = "App">
      <header className="App-header">
        <MainApp/>
      </header> 
    </div>
  );
}

export default App;
