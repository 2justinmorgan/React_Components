import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../index.css';

class DatabaseResult extends React.Component {
	constructor(props) {

		super(props)

		this.handleLocationHover = this.handleLocationHover.bind(this);
		this.handleFunctionsHover = this.handleFunctionsHover.bind(this);
		this.handleIncompleteFunctionClick = 
			this.handleIncompleteFunctionClick.bind(this);
		this.handleRemoveFunctionClick = this.handleRemoveFunctionClick.bind(this);
		this.generateLocationNode = this.generateLocationNode.bind(this);
		this.resultNum = props.resultNum;

		this.state = {};
		this.state["functions"] = "";
		this.state["result"] = this.generateLocationNode(this.props.locationStr);
	}

	sqlPost(func, locationStr) {
		axios.post("/database",this.generateSqlQueryObj(func, locationStr))
			.then(response => {
				if (func == "remove")
					this.setState(
						{
							result:(<strong>{"(REMOVED) "+locationStr}</strong>),
							functions: ""
						});
				return response.data;
			}).catch(error => {alert(error);});
	}
	
	generateSqlQueryObj(func, locationStr) {
		let queryObj = {};
		queryObj["function"] = func;

		let locationFormat = ["country","region","city"];
		let queryStrArr = locationStr.split(',');

		for (let i=0; (i<queryStrArr.length && i<locationFormat.length); i++)
			queryObj[locationFormat[i]] = queryStrArr[i].trim();

		return queryObj;
	}

	handleLocationHover(event) {
		if (this.state.functions == "")
			this.setState({functions: this.generateLocationFunctions()});
		else
			this.setState({functions: ""});
	}

	handleFunctionsHover(event) {
		if (event.type == "mouseleave") {
			this.setState({functions: ""});
			return;
		}

		if (this.state.functions != "")
			this.setState({functions: this.generateLocationFunctions()});
	}

	handleRemoveFunctionClick(event) {
		let locationNode = 
			event.target.parentNode.parentNode.parentNode.previousSibling;
		let location = locationNode.innerText;

		this.sqlPost("remove", location);
	}

	handleIncompleteFunctionClick(event) {
		alert("Hello!\nI haven't yet implemented getting a location's coordinates,"+			" along with a few other functions. To be continued...")
	}

	generateLocationFunctions() {
		return (
			<div className="database_functions_wrapper">
				<center>
					<div className="database_button_wrapper">
						<button
							className="database_button"
							onClick={this.handleRemoveFunctionClick}>
							remove from database
						</button>
					</div>
					<div className="database_button_wrapper">
						<button
							className="database_button"
							onClick={this.handleIncompleteFunctionClick}>
							get location's coordinates
						</button>
					</div>
					<div className="database_button_wrapper">
						<button
							className="database_button"
							onClick={this.handleIncompleteFunctionClick}>
							more...
						</button>
					</div>
				</center>
			</div>);
	}

	generateLocationNode(locationStr) {
		return (
			<span 
				className="database_location_result"
				onClick={this.handleLocationHover}
			>
				{locationStr}
			</span>);
	}

	render() {
		return (
			<div className="database_result">
				{this.state.result}
				{this.state.functions}
			</div>);
	}
}

export default DatabaseResult;
