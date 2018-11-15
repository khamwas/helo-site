import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';

// import axios from 'axios';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			search: '',
			userposts: true
		};
	}
	getPosts() {}

	resetSearch() {
		this.setState({ search: '' });
	}

	render() {
		return (
			<div>
				<Nav />
				<div>Dashboard</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { username, profile_pic, id } = state;
	return {
		username,
		profile_pic,
		id
	};
}

export default connect(mapStateToProps)(Dashboard);
