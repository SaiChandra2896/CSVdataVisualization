import React from 'react';

import Fileupload from './components/Fileupload';
import Table from './components/Table';
import Graph from './components/Graph';
import axios from 'axios';

import './App.css';

const backgroundColor = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
  'rgba(255, 99, 132, 0.6)'
]

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      file: {},
      response: [],
      chartdata: {
        labels: [],
        datasets: [
          {
            label: 'RupeeValue',
            data: [],
          }
        ]
      },
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
      const data = new FormData();
      data.append('csvfile', this.state.file, this.state.file.name);
      axios.post('/', data).then((res) => {
        let dates = [];
        let values = []
        const resdata = res.data.response;
        resdata.forEach((e) => {
          dates.push(e.Date);
        });
        resdata.forEach((e) => {
          values.push(parseInt(e.Price, 10));
        });
        this.setState({
          response: resdata,
          datastate: true,
          chartdata: {
            labels: dates,
            datasets: [
              {
                label: 'RupeeValue',
                data: values,
                backgroundColor: backgroundColor
              }
            ]
          }
        })
      }).catch(err => console.log(err));
    }
  }
  render() {
    // console.log('state update', this.state.file);
    console.log('response update', this.state.response);
    console.log('chart data', this.state.chartdata);
    return (
      <div className="container mt-4">
        <h4 className="display-4 text-center mb-4">
          <i className="fab fa-react"></i> React File Upload
            </h4>
        <Fileupload handleFileUpload={this.handleFileUpload} handleSubmit={this.handleSubmit} />
        {this.state.datastate ? <Table data={this.state.response} /> : ''}
        {this.state.datastate ? <Graph data={this.state.chartdata} Title='Doller to INR plot' /> : ''}
        {/* <Route exact path="/upload" component={Fileupload} />
          <Route exact path="/table" component={Table} />
          <Route exact path="/table" component={Graph} /> */}
      </div>
    );
  }
}

export default App;
