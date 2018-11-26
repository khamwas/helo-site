import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import axios from 'axios';

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
	submitPost() {
		axios.post(`api/post/${this.props.id}`, this.state);
	}

	render() {
		return (
			<div className="outer">
				<Nav />
				<div className="form">
					Title{' '}
					<input
						value={this.state.title}
						onChange={(e) => this.handleChange(e, 'title')}
					/>
					{this.state.img === '' ? (
						<img className="phImg" src="" alt="image" />
					) : (
						<img src={this.state.img} alt="image" />
					)}
					Img Url{' '}
					<input
						value={this.state.img}
						onChange={(e) => this.handleChange(e, 'img')}
					/>
					Content{' '}
					<textarea
						value={this.state.content}
						onChange={(e) => this.handleChange(e, 'content')}
					/>
				</div>
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
