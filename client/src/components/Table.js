import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


const style = {
  marginTop: '24px'
}
class Table extends Component {
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
        data={this.props.data}
        style={style}
      ></ReactTable>
    )
  }
}

export default Table;
