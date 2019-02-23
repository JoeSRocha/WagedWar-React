import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Athletes.css';
import leftImage from './images/standing-stance-left-silhouette.png';
import rightImage from './images/standing-stance-right-silhouette.png';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = { data: [] }
	}

	// Code is invoked after the component is mounted/inserted into the DOM tree.
	componentDidMount() {
		const url = "https://wagedwar.com/wp-json/athletes/v1/event?id=60";

		fetch(url)
			.then(result => result.json())
			.then(result => {
				this.setState({
					data: result
				})
			});
	}

	render() {
		const { data } = this.state;

		return (
				<Athlete athleteData={data} />
		);
	}
}

const Athlete = props => {
	var pairedAthletes = [];
	var pairedAthlete = [];

	const athletesPaired = props.athleteData.map((athlete, index) => {
			// Pair up athletes
			pairedAthlete.push(athlete);
			// If even Index
			if ( index%2 !== 0 ) {
				pairedAthletes.push(pairedAthlete);
				pairedAthlete = [];
			}
			if (pairedAthlete.length > 0) {

				return (
					<>
						<AthletesBox key={index} pairedAthlete={pairedAthlete} />
					</>
				);
			}

	});

	return <div>{athletesPaired}</div>
}

class AthletesBox extends Component {

	constructor(props) {
    super(props)
		this.state = { isExpanded: false }

		// This binding is necessary to make `this` work in the callback
		this.toggleAttributes = this.toggleAttributes.bind(this);
	}

	toggleAttributes() {
		this.setState(state => ({
      isExpanded: !state.isExpanded
    }));
	}


	buildList(){
		return this.props.pairedAthlete.map((athlete, index) => {
			// If even Index
			if ( index%2 !== 0 ) {
				var athlete_img = leftImage
			} else {
				var athlete_img = rightImage
			}

			if(this.state.isExpanded){
				return (
					<>
						<div key={index} className="dropdown-athlete" onClick={this.toggleAttributes}>
							{athlete.athlete_name}
						</div>

							<ul className="dropdown-attributes">
							{ athlete.piv          && <li><b>Win Points:</b> {athlete.piv}</li> }
							{ athlete.record       && <li><b>Record:</b> {athlete.record}</li> }
							{ athlete.age          && <li><b>Age:</b> {athlete.age}</li> }
							{ athlete.nickname     && <li><b>Nickname:</b> {athlete.nickname}</li> }
							{ athlete.weight       && <li><b>Weight:</b> {athlete.weight}</li> }
							{ athlete.reach        && <li><b>Reach:</b> {athlete.reach}</li> }
							{ athlete.betting_odds && <li><b>Betting odds:</b> {athlete.betting_odds}</li> }
						</ul>
					</>
					)
			} else {
				return (
					<>
						<img className="athlete-img" src={athlete_img} />
						<div className="dropdown-athlete" onClick={this.toggleAttributes}>
							{athlete.athlete_name}
						</div>
					</>
				)
			}
		})
	}

	render () {
		console.log(this.props);
		return (

			<div className="athletes-paired">
				{this.buildList()}
			</div>
		);

	}
}

export default App;