import React from 'react';
import { render } from 'react-dom';
import App from "./App";
import axios from 'axios';

export default class Header extends React.Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			//vertexCover: vertexCover
			vertexCover: null,
			loadingMsg: ""
		};	
	}
   handleSubmit(event) {
      var self = this
      var output = []

      event.preventDefault();
			this.setState({loadingMsg: " working..."});

      axios.get('/vertex_cover', {responseType: 'arraybuffer'})
        .then(response => {
					this.setState({loadingMsg: ""});
	
	 				 let convertImg = () => {
	 					 return Buffer.from(response.data, 'binary').toString('base64')
	 				 }
					
	          self.setState(
							{
								vertexCover: "data:image/png;base64,"+convertImg()
							});
					
        })
        .catch(function (error) {
           alert(error);
        });
				
				
   }
	  strong(str) {
			return (<strong>{str}</strong>);
		}

	render () {
		return (
			<div className="accordion_section">
				<p>
					Below is an interface to run a Python script on this app's
					server via WSGI. The script generates a random graph, of nodes and
					edges, and outputs a vertex cover on that graph. The vertex cover
					produced by this script include an exact/{this.strong("optimal, ")}
					as well as {this.strong(" log ")} and {this.strong(" two ")} 
					approximations of the exact vertex cover. (This demonstration 
					shows only a {this.strong(" log ")} approximation vertex cover)
				</p>
				<p>
					When you click the {this.strong(" Generate ")} button, an image will 
					appear that shows a randomly generated graph. The red nodes represent 
					the {this.strong(" log ")} approximation of the exact/optimal vertex 
					cover. I chose to show the {this.strong(" log ")} approximation 
					because it seems to be most practical. The costs of both 
					{this.strong(" log ")} and {this.strong(" two ")} are low, 
					and {this.strong(" log ")} is very close to the optimal vertex cover.
				</p>
				<br />
				<span>
					<button className="my_button" onClick={this.handleSubmit}>
						Generate 
					</button>
				</span>
				&nbsp;
				<span>
					{this.state.loadingMsg}
				</span>
				<br />
				<br />
				<div >
					<img width="100%" src={this.state.vertexCover} />
				</div>
			</div>
		);
	}
}
