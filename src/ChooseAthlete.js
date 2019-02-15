import React, { Component } from 'react';
import './App.css';

const TableHeader = () => {
  return (
      <thead>
          <tr>
              <th>Name</th>
              <th>Job</th>
          </tr>
      </thead>
  );
}

const TableBody = props => {
  const rows = props.athleteData.map((row, index) => {
      return (
          <tr key={index}>
              <td>{row.name}</td>
              <td>{row.job}</td>
          </tr>
      );
  });

  return <tbody>{rows}</tbody>;
}

class Table extends Component {

  render() {
    const { athleteData } = this.props;

    return (
        <table>
          <TableHeader />
          <TableBody athleteData={athleteData}/>
        </table>
    );
  }
}

export default Table;
