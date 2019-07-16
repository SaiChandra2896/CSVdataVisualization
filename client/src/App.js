import React from 'react';
import Fileupload from './components/Fileupload';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="container mt-4">
        <h4 className="display-4 text-center mb-4">
          <i className="fab fa-react"></i> React File Upload
            </h4>
        <Fileupload />
      </div>
    );
  }
}

export default App;
