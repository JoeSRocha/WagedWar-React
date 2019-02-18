import React, { Component } from 'react';


const Athletes = props => {
	const athletedata = props.athleteData.map((athlete, index) => {
		return (
			<div key={index}>
			{athlete.athlete_name}
			<ToggleAttributes
				nickname={athlete.nickname}
				piv={athlete.piv}
				weight={athlete.weight}
				record={athlete.record}
				betting_odds={athlete.betting_odds}
				reach={athlete.reach}
				age={athlete.age}
			/>
			</div>
		);
	});

	return <div>{athletedata}</div>
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
		const nickname     = this.props.nickname;
		const piv          = this.props.piv;
		const weight       = this.props.weight;
		const record       = this.props.record;
		const betting_odds = this.props.betting_odds;
		const reach        = this.props.reach;
		const age          = this.props.age;

		if ( this.state.isExpanded ) {
			return (
				<div>
					<ul>
						{ nickname && <li>Nickname: {nickname}</li> }
						{ piv && <li>PIV: {piv}</li> }
						{ weight && <li>Weight: {weight}</li> }
						{ record && <li>Weight: {record}</li> }
						{ betting_odds && <li>betting_odds: {betting_odds}</li> }
						{ reach && <li>betting_odds: {reach}</li> }
						{ age && <li>Age: {age}</li> }
					</ul>
				<button onClick={this.toggleAttributes}>
			 		Close
				</button>
				</div>
			);
		} else {
			return (
				<div>
					<button onClick={this.toggleAttributes}>
						[+]
					</button>
				</div>
			)
		}
	}
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = { data: [] }
	}

	// Code is invoked after the component is mounted/inserted into the DOM tree.
	componentDidMount() {
		const url = "http://wagedwar.test/wp-json/athletes/v1/event?id=60";

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
			<div>
				<Athletes	athleteData = {data} />
			</div>
		);
	}

}

export default App;