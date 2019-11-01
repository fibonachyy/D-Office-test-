import React, { Fragment } from 'react';
import NavBar from './js/commponent/NavBar/NavBar';
import ControllRoutBar from './js/commponent/ControllRoutBar/ControllRoutBar';
import MainContent from './js/commponent/MainContent/MainContent';
import { Router } from 'react-router-dom';
import history from './js/History';

function App() {
  return (
    <Fragment>
      <NavBar />
      <Router history={history}>
        <ControllRoutBar />
        <MainContent />
      </Router>
    </Fragment>
  );
}

export default App;
