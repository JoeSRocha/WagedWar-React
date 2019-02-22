import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Athletes.css';

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
					<div>
						<ToggleAttributes pairedAthlete={pairedAthlete} />
					</div>
				);
			}

	});

	return <div>{athletesPaired}</div>
}

class ToggleAttributes extends Component {

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

	render () {
		var output = [];
		this.props.pairedAthlete.map(( athlete, key ) => {

			if ( this.state.isExpanded ) {
				output = (
						<div className="dropdown-athlete" onClick={this.toggleAttributes}>
							{athlete.athlete_name}
						</div>
				)
			} else {
				output = (<div className="dropdown-athlete" onClick={this.toggleAttributes}>{athlete.athlete_name}</div>);
			}

		})

		return output;

		// const name         = this.props.name;
		// const nickname     = this.props.nickname;
		// const piv          = this.props.piv;
		// const weight       = this.props.weight;
		// const record       = this.props.record;
		// const betting_odds = this.props.betting_odds;
		// const reach        = this.props.reach;
		// const age          = this.props.age;

		// if ( this.state.isExpanded ) {
		// 	return (
		// 		<div className="athlete-box">
		// 			<div className="dropdown-athlete" onClick={this.toggleAttributes}>
		// 				{name}
		// 			</div>
		// 			<ul className="dropdown-attributes">
		// 				{ piv          && <li><b>Win Points:</b> {piv}</li> }
		// 				{ record       && <li><b>Record:</b> {record}</li> }
		// 				{ age          && <li><b>Age:</b> {age}</li> }
		// 				{ nickname     && <li><b>Nickname:</b> {nickname}</li> }
		// 				{ weight       && <li><b>Weight:</b> {weight}</li> }
		// 				{ reach        && <li><b>Reach:</b> {reach}</li> }
		// 				{ betting_odds && <li><b>Betting odds:</b> {betting_odds}</li> }
		// 			</ul>
		// 		</div>
		// 	);
		// } else {
		// 	return (
		// 			<div className="dropdown-athlete" onClick={this.toggleAttributes}>
		// 				{name}
		// 			</div>
		// 	)
		// }

	}
}

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
				<Athlete	athleteData = {data} />
		);
	}

}

export default App;