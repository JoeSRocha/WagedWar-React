import React, { Component } from 'react';
import ChooseAthlete from './ChooseAthlete';
import './App.css';

class App extends Component {


  render() {
    const athletes = [
      {
          'name': 'Anderson Silva',
          'job': 'Middleweight'
      },
      {
          'name': 'Mac',
          'job': 'Bouncer'
      },
      {
          'name': 'Dee',
          'job': 'Aspring actress'
      },
      {
          'name': 'Dennis',
          'job': 'Bartender'
      }
  ];

    return (
      <div className="container">
        <ChooseAthlete athleteData={athletes} />
      </div>
    )
  }
}

export default App;
