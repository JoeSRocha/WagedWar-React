import React, { Component } from 'react';


const Attributes = props => {
	const athletedata = props.athleteData.map((athlete, index) => {
		return (
			<ul key={index}>
				{athlete.nickname     && <li>{athlete.nickname}</li>}
				{athlete.piv          && <li>{athlete.piv}</li>}
				{athlete.weight       && <li>{athlete.weight}</li>}
				{athlete.record       && <li>{athlete.record}</li>}
				{athlete.betting_odds && <li>{athlete.betting_odds}</li>}
				{athlete.reach        && <li>{athlete.reach}</li>}
				{athlete.age          && <li>{athlete.age}</li>}
			</ul>
		);
	});

	return <div>{athletedata}</div>
}

class ToggleAttributes extends Component {

	constructor (props) {
    super(props)
    this.state = { isExpanded: true }
	}

	toggleAttributes() {
		this.setState({ isExpanded: !this.state.isExpanded });
	}

	render () {
		const { attributes } = this.props
		const { isExpanded } = this.toggleAttributes.bind(this)
		return (
			<div>
				<button onClick={this.toggleAttributes.bind(this)}></button>
					{ isExpanded && attributes }
			</div>
		)

	}
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {data: [], expanded: false, chosen: false}
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
			<Attributes
				athleteData = {data}
			/>
		);
	}

}

export default App;