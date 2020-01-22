import React from 'react';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className="header_wrap">
				<div className="jlm_logo_container">
					<img className="logos" src={require('./my_images/justin.png')} />
					<img className="logos" src={require('./my_images/lee.png')} />
					<img className="logos" src={require('./my_images/morgan.png')} />
				</div>
				<div className="head_photo_container">
					<img src={require('./my_images/photo_for_website.png')} />
				</div>
		
			</div>
		);
	}
}
