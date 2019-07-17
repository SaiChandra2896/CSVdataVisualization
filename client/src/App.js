import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Fileupload from './components/Fileupload';
import Table from './components/Table';
import Graph from './components/Graph';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      file: {},
      response: [],
      datastate: false,
      errors: {}
    }
  }

  handleFileUpload = (e) => {
    e.preventDefault();
    // const data = new FormData();
    // data.append('file', e.target.files[0]);
    // console.log(data.file);
    console.log('qwerty', typeof e.target.files[0]);
    const filedata = e.target.files[0];
    this.setState({
      file: filedata,
      response: []
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.file === {}) {
      const error = {
        msg: 'field cannot be empty'
      }
      this.setState({
        errors: error
      });
    }
    else {
      const data = new FormData;
      data.append('csvfile', this.state.file, this.state.file.name);
      axios.post('/', data).then((res) => {
        const resdata = res.data.response;
        this.setState({
          response: resdata,
          datastate: true
        })
      }).catch(err => console.log(err));
    }
  }
  render() {
    console.log('state update', this.state.file);
    console.log('response update', this.state.response);
    return (
      <Router>
        <div className="container mt-4">
          <h4 className="display-4 text-center mb-4">
            <i className="fab fa-react"></i> React File Upload
            </h4>
          <Fileupload handleFileUpload={this.handleFileUpload} handleSubmit={this.handleSubmit} />
          {this.state.datastate ? <Table data={this.state.response} /> : ''}
          {/* <Route exact path="/upload" component={Fileupload} />
          <Route exact path="/table" component={Table} />
          <Route exact path="/table" component={Graph} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
