import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [{
        "Date": "Jul 19",
        "Price": "68.565"
      },
      {
        "Date": "Jun 19",
        "Price": "68.950"
      },
      {
        "Date": "May 19",
        "Price": "69.580"
      }]
    }
  }
  render() {
    const columns = [
      {
        Header: "Date",
        accessor: "Date"
      },
      {
        Header: "Price",
        accessor: "Price"
      }
    ]
    return (
      <ReactTable
        columns={columns}
        data={this.state.array}
      ></ReactTable>
    )
  }
}

export default Table;
