import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/dashboard/Login';
import Routes from './components/routing/routes';
import { Provider } from 'react-redux';
import store from "./components/redux/store";

function App() {
  return (
    <React.Fragment>

      <Routes />

    </React.Fragment>
  );
}

export default App;
