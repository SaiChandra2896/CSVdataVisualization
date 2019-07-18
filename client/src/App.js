import React from 'react';

import Fileupload from './components/Fileupload';
import Table from './components/Table';
import Graph from './components/Graph';
import axios from 'axios';

import './App.css';

const backgroundColor = [
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
      filestate: false,
      errors: {}
    }
  }
  handleFileUpload = (e) => {
    e.preventDefault();
    this.setState({ errors: {} });
    const filedata = e.target.files[0];
    this.setState({
      file: filedata,
      response: [],
      filestate: true
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.filestate === false || this.state.file === undefined) {
      const error = {
        msg: 'field cannot be empty'
      }
      this.setState({
        errors: error,
        datastate: false
      });
    }
    else {
      const data = new FormData();
      data.append('csvfile', this.state.file, this.state.file.name);
      axios.post('/', data).then((res) => {
        let dates = [];
        let values = [];
        if (res.data.error) {
          const error = {
            msg: res.data.error
          };
          this.setState({
            errors: error
          })
        }
        else {
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
            filestate: false,
            errors: {},
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
        }

        // localStorage.setItem('state', this.state);
      }).catch(err => console.log(err));
    }
  }
  render() {
    console.log('da', this.state.filestate)
    const { errors } = this.state
    console.log('from handle upload', this.state.file);
    // console.log('response update', this.state.response);
    // console.log('chart data', this.state.chartdata);
    console.log('error', this.state.errors);
    return (
      <div className="container mt-4">
        <h4 className="display-4 text-center mb-4">
          <i className="fab fa-react"></i> React File Upload
            </h4>
        <Fileupload handleFileUpload={this.handleFileUpload} handleSubmit={this.handleSubmit} error={errors.msg} />
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
