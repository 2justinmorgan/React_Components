import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../index.css';

class Region extends React.Component {
	constructor(props) {

		super(props)

		this.country = props.country;
		this.region = props.region;
		this.city = props.city;
		this.url = props.url;

		this.handleFunctionClick = this.handleFunctionClick.bind(this);
		this.generateFunction = this.generateFunction.bind(this);
		this.sqlPost = this.sqlPost.bind(this);

		this.state = {};
		this.state.addFunction = this.generateFunction("add to database");
		this.state.moreFunction = this.generateFunction("more...");
	}

	makeSqlQueryObj(func, country, region, city) {
		return {
			"function": func,
			"country": country,
			"region": region,
			"city": city
		};
	}

	sqlPost(sqlQueryObj) {
		axios.post("/database",sqlQueryObj)
			.then(response => {
				let locationStr = this.country+', '+this.region+', '+this.city;
				let responseStr = "";
				let responseClass = "";
		
				if (response.data["existsInDatabase"] == "true") {
					responseStr = " is already in the database!";
					responseClass = "location_not_added";
				}
				else {
					responseStr = " has been added to the database!";
					responseClass = "location_added";
				}
		
				// to show the status/response of function operation
				this.setState({addFunction: ""});
				this.setState({addFunction: (
					<span className={"region_function_"+responseClass}>
						&nbsp;
						&nbsp;
						<strong>
							{locationStr}
						</strong>
						<span className="response_str">{responseStr}</span>
					</span>)},() => {

						// to show the add button again after n seconds
						setTimeout(() => {
							this.setState({addFunction: ""});
							this.setState({addFunction:
								this.generateFunction("add to database")});
						}, 3000);
					});

			}).catch(error => {alert(error);});
		return "YES";
	}

	handleFunctionClick(event) {

		// need to add more fucntions
		if (event.target.innerText == "more...") {
			alert("Hello!\nI haven't yet added more functionality for web search"+
				" results. To be continued...");
			return;
		}

		let locationStr = this.country+', '+this.region+', '+this.city;
		let sqlQueryObj = 
			this.makeSqlQueryObj("add",this.country,this.region,this.city)

		this.sqlPost(sqlQueryObj);
	}

	generateFunction(funcName) {
		return (
			<span 
				className="region_function" 
				onClick={this.handleFunctionClick}>
				<u>{funcName}</u> 
			</span>);
	}

	render() {
		return (
			<div className="web_search_region">
				<span >
					{this.region}
				</span>
				{this.state.addFunction}
				{this.state.moreFunction}
			</div>
		)
	}
}

export default Region;
