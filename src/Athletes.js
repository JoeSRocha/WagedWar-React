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
	constructor(props){
		super(props);
		this.state = {
			modals: this.props.pairedAthlete.map(() => false)
		}
	}

	toggleModal = (index) => {
		const modals = this.props.pairedAthlete.map(() => false)
		modals[index] = true;
		this.setState({
			modals: modals
		})
	}

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
							<SingleAthlete idx={index} toggleModal={this.toggleModal} athlete={athlete} />
						</div></>
				)
			}

			return (<>
					<div key={athlete.athlete_name} className="col-3">
						<SingleAthlete idx={index} toggleModal={this.toggleModal} athlete={athlete} />
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

		// This binding is necessary to make `this` work in the callback
		this.toggleAttributes = this.toggleAttributes.bind(this);
	}

	toggleAttributes() {
		this.props.toggleModal(this.props.idx);
	}

	buildPair() {
			const athlete = this.props.athlete;
			//if(this.props.toggleModal){
			if (true) {
				return (
					<div className="athletes-box" onClick={this.toggleAttributes}>
						{this.positioning()}
					</div>
				)
			} else {
				return(
					<div className="athletes-box" onClick={this.toggleAttributes}>
						<ul className="dropdown-attributes">
							<li className="closeBtn">[CLOSE]</li>
							{ athlete.athlete_name && <li><b id="athlete-name">{athlete.athlete_name}</b></li> }
							{ athlete.piv          && <li><b>Win Points:</b> {athlete.piv}</li> }
							{ athlete.record       && <li><b>Record:</b> {athlete.record}</li> }
							{ athlete.age          && <li><b>Age:</b> {athlete.age}</li> }
							{ athlete.nickname     && <li><b>Nickname:</b> {athlete.nickname}</li> }
							{ athlete.weight       && <li><b>Weight:</b> {athlete.weight}</li> }
							{ athlete.reach        && <li><b>Reach:</b> {athlete.reach}</li> }
							{ athlete.betting_odds && <li><b>Betting odds:</b> {athlete.betting_odds}</li> }
							<button>CHOOSE</button>
						</ul>
					</div>
				)
			}
	}

	positioning() {
		const athlete = this.props.athlete;
		if ( this.props.athlete.lineup %2 !== 0 ) {
			return (
				<>
					<img width="185" height="539" alt={athlete.athlete_name} className="athlete-img" src={leftImage} />
				</>
			)
		} else {
			return (
				<>
					<img width="185" height="539" alt={athlete.athlete_name} className="athlete-img" src={rightImage} />
				</>
			)
		}
	}

	render() {
		return <>{this.buildPair()}</>;
	}

}

export default App;