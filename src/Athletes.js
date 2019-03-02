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
				<Athletes athleteData={data} />
		);
	}
}

class Athletes extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modals:       this.props.athleteData.map(() => false),
			selected:     this.props.athleteData.map(() => false),
			listDisabled: this.props.athleteData.map(() => false),
		}
	}

	toggleModal = (index, status) => {
		const modals = this.props.athleteData.map(() => false)
		modals[index] = status ? false : true;
		this.setState({
			modals: modals
		})
	}

	checkSelectedCount() {
		if (this.state.selected.length >= 6) {
			const listDisabled = [];
			this.props.athleteData.map((athlete) => {
				( this.state.selected.includes(athlete.lineup) ) ? listDisabled.push(false) : listDisabled.push(true);
				return listDisabled;
			});
			this.setState({
				listDisabled: listDisabled
			});
		}
	}

	selectAthlete = (index, status) => {
		console.log(status);
		let selected = this.state.selected;
		if (status === true ) {
			selected.push(index);
		} else { // remove from list
			selected = selected.filter(e => e !== index);
		}
		this.setState({
			selected: selected
		})
		this.checkSelectedCount();
	}

	athletesPaired() {
		var pairedAthletes = [];
		var pairedAthlete = [];
		return this.props.athleteData.map((athlete, index) => {

			// Pair up Athletes
			pairedAthlete.push(athlete);

			// If even Index
			if ( index%2 !== 0 ) {
				pairedAthletes.push(pairedAthlete);
				pairedAthlete = [];
			}

			if (pairedAthlete.length > 0) {
				return (
					<div key={index}>
						<AthletesBox
							modals={this.state.modals}
							toggleModal={this.toggleModal}
							pairedAthlete={pairedAthlete}
							selectAthlete={this.selectAthlete}
							selectedAthletes={this.state.selected}
							listDisabled={this.state.listDisabled}
						/>
					</div>
				);
			}

			return null;
		});
	}

	render() {
		return (
		<div className="container">
			{this.athletesPaired()}
			<div id='counter'>{this.state.selected.length}/6 CHOSEN</div>
		</div>
			)
	}
}

class AthletesBox extends Component {
	constructor(props){
		super(props);
		this.state = {
			modals: this.props.pairedAthlete.map(() => false)
		}
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
				return (<React.Fragment key={athlete.athlete_name}>
						<div key={athlete.lineup}className="col-6 versus-box">
							{this.versusBox()}
						</div>
						<div key={athlete.athlete_name} className="col-3">
							<SingleAthlete
								modals={this.props.modals}
								toggleModal={this.props.toggleModal}
								athlete={athlete}
								selectAthlete={this.props.selectAthlete}
								selectedAthletes={this.props.selectedAthletes}
								listDisabled={this.props.listDisabled}
							/>
						</div></React.Fragment>
				)
			}

			return (<React.Fragment key={athlete.athlete_name}>
					<div key={athlete.athlete_name} className="col-3">
					<SingleAthlete
								modals={this.props.modals}
								toggleModal={this.props.toggleModal}
								athlete={athlete}
								selectAthlete={this.props.selectAthlete}
								selectedAthletes={this.props.selectedAthletes}
								listDisabled={this.props.listDisabled}
							/>
					</div></React.Fragment>
			)
		});
	}

	render () {
		return <div className="row athletes-paired">{this.buildList()}</div>;
	}
}

class SingleAthlete extends Component {

	constructor(props) {
    super(props)
		this.state = {
			isChosen: false,
		}
		// This binding is necessary to make `this` work in the callback
		this.toggleAttributes = this.toggleAttributes.bind(this);
		this.chooseAthlete    = this.chooseAthlete.bind(this);
		this.deselectAthlete  = this.deselectAthlete.bind(this);
		this.disableAtSix     = this.disableAtSix.bind(this);
	}

	toggleAttributes() {
		this.props.toggleModal(this.props.athlete.lineup, this.props.modals[this.props.athlete.lineup]);
	}

	selectedAthlete() {
		if (this.state.isChosen) {
			return <div className={(this.isLeft() ? 'chosen-left' : 'chosen-right')}>CHOSEN</div>
		}
	}

	chooseAthlete() {
		this.setState({
			isChosen: true
		})
		this.props.selectAthlete(this.props.athlete.lineup, true);
	}

	deselectAthlete() {
		this.setState({
			isChosen: false
		})
		this.props.selectAthlete(this.props.athlete.lineup, false);
	}

	disableAtSix() {
		if( this.props.selectedAthletes.length >= 6 ) {
			const athleteID = (this.props.athlete.lineup - 1);
			if (true === this.props.listDisabled[athleteID]) {
				return true;
			}
		}
	}

	chooseBtn() {
		const athleteID = (this.props.athlete.lineup - 1);
		if ( this.state.isChosen ) {
			return <button id="choose-btn" onClick={this.deselectAthlete}>DESELECT</button>
		} else if (true === this.props.listDisabled[athleteID] && this.props.selectedAthletes.length >= 6) {
			return null
		} else  {
			return <button id="choose-btn" onClick={this.chooseAthlete}>CHOOSE</button>
		}
	}

	buildPair() {
		const athlete = this.props.athlete;

		if(!this.props.modals[athlete.lineup]){
			return (
				<>
					<div className="athletes-box"
						onClick={this.toggleAttributes}
					>
						{this.positioning()}
						{this.selectedAthlete()}
					</div>
				</>
			)
		} else {
			return(
				<div className="athletes-box" onClick={this.toggleAttributes}>
				{this.positioning()}
					<ul className={(this.isLeft() ? 'dropdown-attributes-left' :'dropdown-attributes')}>
						<li className="closeBtn">[CLOSE]</li>
						{ athlete.athlete_name && <li><b id="athlete-name">{athlete.athlete_name}</b></li> }
						{ athlete.piv          && <li><b>Win Points:</b> {athlete.piv}</li> }
						{ athlete.record       && <li><b>Record:</b> {athlete.record}</li> }
						{ athlete.age          && <li><b>Age:</b> {athlete.age}</li> }
						{ athlete.nickname     && <li><b>Nickname:</b> {athlete.nickname}</li> }
						{ athlete.weight       && <li><b>Weight:</b> {athlete.weight}</li> }
						{ athlete.reach        && <li><b>Reach:</b> {athlete.reach}</li> }
						{ athlete.betting_odds && <li><b>Betting odds:</b> {athlete.betting_odds}</li> }
						{ this.chooseBtn() }
					</ul>
				</div>
			)
		}
	}

	isLeft(){
		if ( this.props.athlete.lineup %2 !== 0 ) {
			return true;
		}else {
			return false;
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