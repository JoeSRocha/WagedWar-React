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
				<Athlete athleteData={data} key={data.athlete_name} />
		);
	}
}

const Athlete = props => {

	return props.athleteData.map((athlete) => {
		return <AthleteBox key={athlete.athlete_name} athleteData={athlete} />
	});
}

class AthleteBox extends Component {

	constructor(props) {
    super(props)
		this.state = {
			isExpanded: false,
			athleteImg: leftImage
		 }

		// This binding is necessary to make `this` work in the callback
		this.toggleAttributes = this.toggleAttributes.bind(this);
	}

	toggleImg() {
		if ( this.props.athleteData.lineup %2 !== 0 ) {
			this.setState(({
				athleteImg: leftImage
			}));
		} else {
			this.setState(({
				athleteImg: rightImage
			}));
		}
	}

	componentDidMount() {
		this.toggleImg();
	}

	toggleAttributes() {
		this.setState(state => ({
      isExpanded: !state.isExpanded
    }));
	}


	buildList(){
		const athlete = this.props.athleteData;
		if(this.state.isExpanded){

			return (
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
		} else {
			return (
				<div className="athletes-box" onClick={this.toggleAttributes}>
					<img alt="{athlete.athlete_name}" className="athlete-img" src={this.state.athleteImg} />
					<div className="dropdown-athlete">
						{athlete.athlete_name}
					</div>
				</div>
			)
		}
	}

	render () {
		return (
			<>
				{/* <>{this.buildList()}</> */}
				<><AthletesPaired key={this.props.athleteData.lineup} athlete={this.buildList()} /></>
			</>
		);

	}
}

class AthletesPaired extends Component {

	constructor(props) {
		super(props);
		this.state = { athletesPaired: [] }
	}

	componentDidMount() {
		const athlete = this.props.athlete;
		const athletesPaired = this.state.athletesPaired;
		console.log(athletesPaired);
		if ( athletesPaired.length < 2 ) {
			console.log(athlete);
			this.setState({
				athletesPaired: [ ...athletesPaired, athlete ]
			})
		} else {
			this.setState({
				athletesPaired: []
			})
		}
	}

	combinedAthletes() {
		var athletesPaired = this.state.athletesPaired;

		return (
			<div className="athletes-paired">
				{athletesPaired}
			</div>
		)
	}

	render() {

		return ( <>{this.combinedAthletes()}</>  );
	}
}

export default App;