import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Country from './Country';
import '../index.css';

class Search extends React.Component {
	constructor(props) {

		super(props)
		 
		this.handleCityNameSubmit = this.handleCityNameSubmit.bind(this);
		this.formatResultsOverview = this.formatResultsOverview.bind(this);

		this.state = {};
		this.state["webResults"] = "";
		// NOTE: this.state.cityName is changed to what the web search returns as 
		// the city name, and this.cityName.value is what the user types in 
		this.state["cityName"] = "";
		this.state["resultsOverview"] = "";
	}

	formatWebResults(webResultsObj) {
		let countryNodes = [];
		let countryKeys = Object.keys(webResultsObj["locations"]);

		for (let i=0; i<countryKeys.length; i++) {
			countryNodes.push(
				<Country 
					country={countryKeys[i]} 
					regionsObj={webResultsObj["locations"][countryKeys[i]]} 
					city={this.state.cityName} /> );
		}

		return (<div className="web_search_results">{countryNodes}</div>);
	}

	formatResultsOverview(webResultsObj) {
		let numOfLocations = webResultsObj["totalNumLocations"];
		let numOfCountries = Object.keys(webResultsObj["locations"]).length;
		
		return (
			<div className="results_overview">
				<span>"<strong>{this.state.cityName}</strong>"</span>
				{' exists in '+numOfLocations+' location'+
					((numOfLocations == 1) ? '' : 's')+' in the world, '+
					'spanning '+numOfCountries+' '+
					((numOfCountries == 1) ? 'country' : 'different countries.')}
				<div>
					<strong>
						{((numOfCountries > 0) ? "(click on country to expand)" : '')}
					</strong>
				</div>
			</div>);
	}
	
	handleCityNameSubmit(event) {
		event.preventDefault();

		if (!this.cityName.value.trim().length) {
			this.setState({webResults: '',resultsOverview: ''},() => {
				this.setState({webResults: "You have to enter something!"});
			});
			return;
		}
		this.setState({webResults: '',resultsOverview: ''},() => {
			this.setState({resultsOverview: "searching..."});
		});

		axios.post("/web_search_city_locations",this.cityName.value)
			.then(response => {
				this.setState(
					{
						webResults: "", 
						resultsOverview: '',
						cityName: this.cleanUp(this.cityName.value)
					}, () => {
						this.setState(
							{
								webResults: this.formatWebResults(response.data),
								resultsOverview: this.formatResultsOverview(response.data)
							});
					});
			});
	}

	// cleanUp() capitalizes the first letter of every word in a string, as well
	// as "cleans it up" i.e. capitalize("  nEw   yORk   ") == "New York". 
	cleanUp(str) {
		let newStr = "";
		let currWord = "";
		let strArr;
		// if str is empty or contains only spaces
		if (!(strArr = str.trim().split(/\s+/))[0])
			return '';
		
		for (let i=0; i<strArr.length; i++) {
			currWord = strArr[i];
			newStr += currWord[0].toUpperCase()+currWord.slice(1).toLowerCase()+' ';
		}
		
		return newStr.slice(0,-1);
	}

	generateTextSubmitForm() {
		return (
			<form onSubmit={this.handleCityNameSubmit}>
				<label>
					<strong>City:</strong> &nbsp; 
					<input type="text" ref={v => this.cityName=v} />
				</label>
				<input type="submit" className="my_button" value="Find Locations" />
			</form>);
	}

	strong(str) {
		return (<strong>{str}</strong>);
	}

	render() {
		return (
			<div className="accordion_section">
				<p>
					The {this.strong(" Search ")} section of this app is meant to show 
					aquisition techniques of both the retrieval and viewing of data. 
					In this example, a web scraper has been implemented to search for 
					all locations in the world that have a specific city name (the name
					you enter in the text field below). 
					Because this web server has computational limitations, scraping 
					dynamic pages is not feasible (see the {this.strong(" Fullstack ")}
					tab for more details).				
					The website scraped is
					<a 
						className="my_link" 
						href="https://www.geotargit.com"
						target="_blank">
						{this.strong(" geotargit.com")}
					</a>.
				</p>

				<p>{this.strong("Note: ")}a {this.strong(" region ")} can be a state,
					province, etc
				</p>

				{this.strong("How to use: ")}
				<p>
					Enter any city name you can think of, into the text field below, 
					and see all locations in the world that have a city with that name.
					(countries listed first). For example, you enter 
					{this.strong(" San Francisco")}. You will then see a list of 
					countries, sorted by the number of cities named 
					{this.strong(" San Francisco ")} that exist within that country. 
					Upon clicking/expanding a country, a list of regions within that
					country will appear. These are the regions for which 
					a city named {this.strong(" San Francisco ")} exists. 
					Next to each region, certain functions are available:
				</p>
				<p>
					{this.strong("Function")}
					<u className="region_function" >
						add to database
					</u>{" "}
					allows you to add that specific location,{" "}
					({this.strong("Country")},
					{this.strong(" Region")},
					{this.strong(" City")}),{" "}
					to the database. A message will be displayed to inform whether or 
					not the location was added to the database.
				</p>
				<p>	
					{this.strong("Function")}
					<u className="region_function" >
						more...
					</u> {" "}
					will be further implemented. 
				</p>
				<br />
				<br />
				{this.generateTextSubmitForm()}
				<br />
				{this.state.resultsOverview}
				{this.state.webResults}
			</div>);
	}
}

export default Search;
