import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Graph extends Component {
  render() {
    return (
      <div className="Graph">
        <Line
          data={this.props.data}
          options={{
            title: {
              display: this.props.Title,
              text: 'Doller to INR comparision',
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'bottom',
              text: 'value'
            }
          }}
        />
      </div>
    )
  }
}

export default Graph;
