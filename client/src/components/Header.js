import React, { Component } from 'react';
import { Link } from 'react-router'

class Header extends Component {
	render(){
		return (
			<nav className='navbar navbar-light'>
				<ul className="nav navbar-nav">
					<li className='nav-item'>
						<Link to='/'>Home</Link>
					</li>
					<li className='nav-item'><Link to='/signup'>Sign Up</Link></li>
					<li className='nav-item'><Link to='/signin'>Sign In</Link></li>
				</ul>
			</nav>
		);
	}
}

export default Header;