import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Fileupload from './components/Fileupload';
import Table from './components/Table';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container mt-4">
          <h4 className="display-4 text-center mb-4">
            <i className="fab fa-react"></i> React File Upload
            </h4>
          <Route exact path="/upload" component={Fileupload} />
          <Route exact path="/table" component={Table} />
        </div>
      </Router>
    );
  }
}

export default App;
