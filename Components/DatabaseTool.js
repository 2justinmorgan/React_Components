import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DatabaseResult from './DatabaseResult';
import '../index.css';

class DatabaseTool extends React.Component {
	constructor(props) {

		super(props)

		this.generateMenus = this.generateMenus.bind(this);
		this.formatResults = this.formatResults.bind(this);
		this.refreshTool = this.refreshTool.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.clearFilters = this.clearFilters.bind(this);

		const filterOptions = props.initialResults["filterOptions"];
		const filters = Object.keys(filterOptions);
		this.filters = filters;

		this.state = {};
		this.state["selectedFilters"] = this.generateSelectedFiltersObj(filters);
		this.state["results"] = this.formatResults(props.initialResults["results"]);
		this.state["filterMenus"] = this.generateMenus(filterOptions);
		this.state["resultsOverview"] = 
			this.formatResultsOverview(props.initialResults);
	}

	refreshTool() {
		this.setState({results: "",filterMenus: ""},() => {
			axios.post("/database",this.state.selectedFilters)
				.then(response => {
					this.setState(
						{
							resultsOverview: this.formatResultsOverview(response.data),
							results: this.formatResults(response.data["results"]),
							filterMenus: this.generateMenus(response.data["filterOptions"])
						});
				});
		});
	}

	formatResultsOverview(results) {
		let countries = Object.keys(results["filterOptions"]["Country"]);
		let regions = Object.keys(results["filterOptions"]["Region"]);
		let cities = Object.keys(results["filterOptions"]["City"]);
		let numOfLocations = results["results"].length;
		return (
			<div className="results_overview">
				<strong>Results overview:</strong>&nbsp;(distinctions)
				<div>
					{numOfLocations+' location'+
						((numOfLocations == 1) ? '' : 's')+', '+countries.length+' '+
						'countr'+((countries.length == 1) ? 'y' : 'ies')+', '+
						regions.length+' region'+((regions.length == 1) ? '' : 's')+
						', '+cities.length+' cit'+((cities.length == 1) ? 'y.' : 'ies.')}
				</div>
			</div>);
	}	

	// makes options list for one filter menu at a time
	generateOptionsList(thisFilterOptions) {
		let optionsList = [];
		for (let i=0; i<thisFilterOptions.length; i++)
			optionsList.push(
				<option>{thisFilterOptions[i]}</option>);

		return optionsList;
	}

	handleFilterChange(event) {
		let filter = event.target.getAttribute("filter_menu");
		let filterValue = event.target.value;

		this.state.selectedFilters["function"] = "all";
		this.state.selectedFilters[filter.toLowerCase()] = filterValue; 
		this.refreshTool();
	}

	generateMenus(filterOptions) {
		let menus = [];
		let filters = Object.keys(filterOptions);

		for (let i=0; i<filters.length; i++) {
			let filterSelected = this.state.selectedFilters[filters[i].toLowerCase()];

			if (filterSelected)
				menus.push(
					<span className="database_filter_menu">
						<strong>
							{(i<filters.length-1) ? filterSelected+',' : filterSelected}
						</strong>
					</span>);
			else
				menus.push(
					<span className="database_filter_menu">
						<select 
							className="database_filter" 
							filter_menu={filters[i]}
							onChange={this.handleFilterChange}
						>
							<option>{filters[i]}</option>
							{this.generateOptionsList(filterOptions[filters[i]])}
						</select>
					</span>);
		}
						
		return (<span className="database_filter_menus">{menus}</span>);
	}

	formatResults(results) {
		let resultsNodes = []

		for (let i=0; i<results.length; i++)
			resultsNodes.push(
				<DatabaseResult resultNum={i+1} locationStr={results[i]} />);

		return (<div className="database_results">{resultsNodes}</div>);
	}

	clearFilters(event) {
		this.setState(
			{selectedFilters: this.generateSelectedFiltersObj(this.filters)},() => {
				this.refreshTool();
			});
	}

	generateSelectedFiltersObj(filters) {
		let selectedFiltersObj = {}
		selectedFiltersObj["function"] = "all*";

		for (let i=0; i<filters.length; i++)
			selectedFiltersObj[filters[i].toLowerCase()] = "";

		return selectedFiltersObj;
	}

	render() {
		return (
			<div>
				<div>
					<u>Refine by:</u>
				</div>
				{this.state.filterMenus}
				&nbsp;
				<div className="database_buttons_wrapper">
					<button className="database_button" onClick={this.clearFilters}>
						Clear Filters
					</button>
					&nbsp;
					&nbsp;
					<button className="database_button" onClick={this.refreshTool}>
						Refresh
					</button>
				</div>
				{this.state.resultsOverview}
				{this.state.results}
			</div>
		)
	}
}

export default DatabaseTool;
