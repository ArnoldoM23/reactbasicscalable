import React, { Component } from 'react';


export default class FrontPage extends Component {
	render(){
		return (
			<div className='container'>
				<div className='jumbotron'>
					<h4>Front Page Yo</h4>
					<p>This is the front page for this app is assign as indexRoute in index.js in root</p>
				</div>
			</div>
		);
	}
}