import React from 'react';
// import logo from './logo.svg';
// importing the bootstrap CSS file for styling layouts
import 'bootstrap/dist/css/bootstrap.min.css';
// importing the main CSS file for the application
import './App.css';
// importing the main router for the application
import MainRouter from './routes/main-routes';

function App() {
  return (
    <div className="App">
        <MainRouter />
    </div>
  );
}

export default App;
