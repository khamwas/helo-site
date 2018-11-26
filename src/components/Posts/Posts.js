import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			img: '',
			content: '',
			username: '',
			profile_pic: '',
			post_id: null
		};
	}
	componentDidMount() {
		this.getPostInfo();
	}

	getPostInfo() {
		axios
			.get(`/api/post/${this.props.match.params.id}`)
			.then((result) => this.setState(result.data[0]));
	}

	render() {
		return (
			<div className="outer">
				<Nav />
				<div className="postCard">
					<div className="postHeader">
						<h1>{this.state.title}</h1>
						<div className="poster">
							<p>by {this.state.username}</p>
							<img
								className="navImg profileImg"
								src={this.state.profile_pic}
								alt={this.state.username}
							/>
						</div>
					</div>
					<div className="postBottom">
						<img
							className="postImg"
							src={this.state.img}
							alt={this.state.title}
						/>
						<p>{this.state.content}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Posts;
