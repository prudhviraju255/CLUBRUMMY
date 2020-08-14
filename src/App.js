import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/dashboard/Login';
import AppRouter from './components/routing/AppRouter';


function App() {
  return (
    <React.Fragment>
      <AppRouter />
    </React.Fragment>
  );
}

export default App;
