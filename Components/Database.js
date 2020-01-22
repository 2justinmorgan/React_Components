import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DatabaseTool from './DatabaseTool';
import '../index.css';

class Database extends React.Component {
	constructor(props) {

		super(props)

		this.generateDbTool = this.generateDbTool.bind(this);
		this.changeDbToolState = this.changeDbToolState.bind(this);
	
		const filters = ["Country","Region","City"];

		this.state = {
			databaseTool: this.generateDbToolActivateButton(),
		}
	}

	generateDbToolActivateButton() {
		let button = (
			<button 
				className="my_button"
				onClick={this.generateDbTool}>
				Activate Tool
			</button>);
		return button;
	}

	changeDbToolState(selectedFilters, initialResults) {
		this.setState({databaseTool: 
				<DatabaseTool 
					selectedFilters={selectedFilters}
					initialResults={initialResults} />
			});
	}

	generateDbTool() {
		
		axios.post(
			"/database",
			{"function":"all*","country":"","region":"","city":""})
			.then(response => {
				let resObj = response.data;
				let filters = Object.keys(resObj["filterOptions"]);
				let selectedFilters = {};

				for (let i=0; i<filters.length; i++)
					selectedFilters[filters[i]] = "";

				this.changeDbToolState(selectedFilters, response.data);
			}).catch(error => {alert(error)});
	}

	strong(str) {
		return (<strong>{str}</strong>);
	}

	render() {
		return (
			<div>
				<div className="accordion_section">
					<p>
						Below is a tool to make queries on this app's server SQL database 
						of locations. To use this tool, click on the 
						{this.strong(" Ativate Tool ")} button. Use the 
						{this.strong(" Country")}, {this.strong(" Region")}, and 
						{this.strong(" City ")} filters to sort/refine 
						the resulting list of locations.
					</p>
					<p>
						Every filter selected will update both the resulting output and 
						the remaining unselected filter options. The filter selections,
						i.e. {this.strong(" America ")} in the {this.strong(" Country ")} 
						filter, are dynamically updated upon a filter selection.
					</p>
					<p>
						{this.strong("Location format: ")}
						<div>Country, Region, City</div>
					</p>
				</div>
				{this.state.databaseTool}
			</div>
		)
	}
}

export default Database;
