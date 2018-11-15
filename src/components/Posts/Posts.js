import React, { Component } from 'react';
import Nav from '../Nav/Nav';
// import axios from 'axios';

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			img: '',
			content: '',
			author: '',
			authorPicture: ''
		};
	}
	getPostInfo() {}

	render() {
		return (
			<div>
				<Nav />
				<div>Posts</div>;
			</div>
		);
	}
}

export default Posts;
