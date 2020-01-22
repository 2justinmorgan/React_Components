import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Region from './Region';
import '../index.css';

class Country extends React.Component {
	constructor(props) {

		super(props)

		this.country = props.country;
		this.regionsObj = props.regionsObj;
		this.city = props.city;
		this.numRegions = Object.keys(props.regionsObj).length;

		this.handleCountryClick = this.handleCountryClick.bind(this);
		this.formatRegionsOutput = this.formatRegionsOutput.bind(this);

		this.state = {};
		this.state.regionsOutput = "";
	}

	formatRegionsOutput() {
		let regionsNodes = [];
		let regionsKeys = Object.keys(this.regionsObj)

		for (let i=0; i<regionsKeys.length; i++)
			regionsNodes.push(
				<Region
					country={this.country}
					region={regionsKeys[i]}
					city={this.city} 
					url={this.regionsObj[regionsKeys[i]]} /> );

		return (<div className="web_search_regions">{regionsNodes}</div>);
	}

	handleCountryClick(event) {
		event.preventDefault();

		if (this.state.regionsOutput != "")
			this.setState({regionsOutput: ""});
		else
			this.setState({regionsOutput: this.formatRegionsOutput()});
	}

	render() {
		return (
			<div className="web_search_country">
				<div onClick={this.handleCountryClick}>
					<span className="clickable_country">
						{this.country}
					</span>
					{/*
					&nbsp;
					<span className="num_of_regions">
					{'('+this.numRegions+' region'+((this.numRegions == 1) ? ')' : 's)')}
					</span>
					*/}
				</div>
				{this.state.regionsOutput}
			</div>
		)
	}
}

export default Country;
