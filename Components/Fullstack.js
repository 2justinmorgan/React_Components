import React from 'react';
import { render } from 'react-dom';
import App from "./App";

export default class Fullstack  extends React.Component {
	constructor(props) {
		super(props);
	}

	strong(str) {
		return (<strong>{str}</strong>);
	}

	render () {
		return (
			<div className="accordion_section">

				{this.strong("This App:")}
				<p>
					<a href="https://www.JustinLeeMorgan.com" className="my_link">
						{"JustinLeeMorgan.com "}
					</a>
					is a Python Flask app, with a React JavaScript front end,
					served by Apache via WSGI.
					&nbsp;
					<strike>
						The web app is hosted on a Raspberry Pi, running Arch 
						Linux ARM OS, and connected to the network by redirecting ports 
						through a home router.
					</strike>
					&nbsp;
					The DNS, administered by GoDaddy, forwards all domain requests to 
					&nbsp;
					<strike>
						the home router's IP address.
					</strike>
				</p>

				<p className="update_paragraph">
					{this.strong("Update: ")} this app has been migrated to a CentOS 7
					AWS instance. The reason is because my new home ISP blocks all 
					incoming port 80 requests.
				</p>

				{this.strong("Web Scraping:")}
				<p>
					Static content was scraped from web pages using the Python request
					library, {this.strong(" requests")}. Because this server is limited 
					to a single core processor using 1GB of memory, a web browser based 
					driver is far too heavy for viewing JS mutated DOMs. This is why 
					scraping is currently limited to only static pages. Upgrading this 
					AWS instance will enable web scraping of dynamic pages.
				</p>

				{this.strong("Database:")}
				<p>
					This app's server has a database of international locations (see
					{this.strong(" Database ")} tab). The server uses CentOS's RDBMS
					implementation of MySQL, MariaDB. All of the location data was
					gathered by using various APIs and web scrapers. For more information 
					about the database, please contact me (see {this.strong(" Links ")} 
					tab).
				</p> 

			</div>
		);
	}
}
