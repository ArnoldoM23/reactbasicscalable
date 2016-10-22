import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {

	renderLoginLinks(){
		if(this.props.authenticate){
			return (
				<li className="nav-item">
					<Link to="/signout">Sign Out</Link>
				</li>
			);
		}else{
			return [
				<li className="nav-item" key={1} >
					<Link to="/signin" >Sign In</Link>
				</li>,
				<li className="nav-item" key={2}>
					<Link to="/signup">Sign Up</Link>
				</li>
				];
		}
	}


	render(){
		return (
			<nav className='navbar navbar-light'>
				<ul className="nav navbar-nav">
					<li className='nav-item'><Link to='/'>Home</Link></li>
					{ this.renderLoginLinks() }
				</ul>
			</nav>
		);
	}
}

function mapStateToProps(state){
	return { authenticate: state.auth.authenticated }
}

export default connect(mapStateToProps)(Header);