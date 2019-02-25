import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Athletes.css';
import leftImage from './images/standing-stance-right-silhouette.png';
import rightImage from './images/standing-stance-left-silhouette.png';

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
				<AthletesPaired athleteData={data} />
		);
	}
}

const AthletesPaired = props => {
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
					<div key={index}>
						<AthletesBox pairedAthlete={pairedAthlete} />
					</div>
				);
			}

			return null;

	});

	return <>{athletesPaired}</>
}

class AthletesBox extends Component {
	versusBox() {
		return this.props.pairedAthlete.map((athlete, index) => {
			if(index%2 === 0) {
				return(
					<>
						<div className="vs">{athlete.weight_class}</div>
						<div className="athlete-name">{athlete.athlete_name}</div>
						<div className="vs">VS</div>
					</>
				)
			} else {
				return(
					<div className="athlete-name">{athlete.athlete_name}</div>
				)
			}

		});
	}

	buildList(){
		return this.props.pairedAthlete.map((athlete, index) => {

			// Add Versus Box
			if ( index%2 !== 0 ) {

				return (<>
						<div key={athlete.lineup}className="col-6 versus-box">
							{this.versusBox()}
						</div>
						<div key={athlete.athlete_name} className="col-3">
							<SingleAthlete athlete={athlete} />
						</div></>
				)
			}

			return (<>
					<div key={athlete.athlete_name} className="col-3">
						<SingleAthlete athlete={athlete} />
					</div></>
			)
		});
	}

	render () {
		return <div className="col-12 athletes-paired">{this.buildList()}</div>;
	}
}

class SingleAthlete extends Component {

	constructor(props) {
    super(props)
		this.state = {
			isExpanded: false,
			positionLeft: true,
			athleteImg: leftImage
		}

		// This binding is necessary to make `this` work in the callback
		this.toggleAttributes = this.toggleAttributes.bind(this);
	}

	componentDidMount() {
		this.togglePositioning();
	}

	togglePositioning() {
		// If Odd (1,3,5...)
		if ( this.props.athlete.lineup %2 !== 0 ) {
			this.setState(({
				positionLeft: true,
				athleteImg: leftImage
			}));
		} else {
			this.setState(({
				positionLeft: false,
				athleteImg: rightImage
			}));
		}
	}

	toggleAttributes() {
		this.setState(state => ({
      isExpanded: !state.isExpanded
    }));
	}

	imgPositioning() {
		const athlete = this.props.athlete;
		if (this.state.positionLeft) {
			return (
				<>
					<img width="185" height="539" alt={athlete.athlete_name} className="athlete-img" src={this.state.athleteImg} />
					<div className="dropdown-athlete">
					</div>
				</>
			)
		} else {
			return (
				<>
					<div className="dropdown-athlete">
					</div>
					<img width="185" height="539" alt={athlete.athlete_name} className="athlete-img" src={this.state.athleteImg} />
				</>
			)
		}
	}

	buildPair() {
			const athlete = this.props.athlete;
			if(!this.state.isExpanded){
				return (
					<div className="athletes-box" onClick={this.toggleAttributes}>
						{this.imgPositioning()}
					</div>
				)
			} else {
				return(
					<div className="athletes-box" onClick={this.toggleAttributes}>
						<div key={athlete.lineup} className="dropdown-athlete">
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
					</div>
				)
			}
	}

	render() {
		return <>{this.buildPair()}</>;
	}

}

export default App;