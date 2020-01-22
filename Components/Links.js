import React from 'react';
import { render } from 'react-dom';
import App from "./App";
import resumePDF from './resume.pdf';


export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleResume = this.handleResume.bind(this);
	
		this.state = {
			resumePDF: null
		}
	
	}

	handleClick(event) {
		alert("FYI my GitHub is not up to date.\nBut my account is: 2justinmorgan");
	}

	handleResume(event) {
		this.setState({resumePDF: resumePDF});
	}

	render() {
		return (
			<div className="accordion_section">
				<p>
					<a 
						href="https://www.linkedin.com/in/2justinmorgan" 
						target="_blank" 
						rel="noopener noreferrer"
					>
						<img src={require('./my_images/linkedin.png')} />
					</a>
				</p>
				<p>
					<a 
						href="https://www.github.com/2justinmorgan" 
						target="_blank" 
						rel="noopener noreferrer"
					>
						<img src={require('./my_images/github.png')} />
					</a>
				</p>

				<form onClick={this.handleResume}>
					<a 
						className="resume_button_png"
						href={this.state.resumePDF} 
						target="_blank" 
						rel="noopener noreferrer"
					>
						<img src={require('./my_images/resume.png')} />
					</a>
				</form>
			</div>
		);
	}
}


