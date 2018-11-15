import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
// import axios from 'axios';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			img: '',
			content: ''
		};
	}
	handleChange(e, name) {
		this.setState({ [name]: e.target.value });
	}
	submitPost() {}

	render() {
		return (
			<div>
				<Nav />
				<div>Form</div>;
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

export default connect(mapStateToProps)(Form);
