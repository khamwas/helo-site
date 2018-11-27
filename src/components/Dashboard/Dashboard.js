import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import axios from 'axios';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			search: '',
			userposts: true,
			checkbox: true
		};
	}
	componentDidMount() {
		this.getPosts();
	}
	handleChange(e) {
		this.setState({ search: e.target.value });
	}

	getPosts() {
		axios
			.get('api/posts')
			.then((result) => this.setState({ posts: result.data }));
	}

	resetSearch() {
		this.setState({ search: '' });
	}
	check() {
		this.setState({ checkbox: !this.state.checkbox });
	}

	render() {
		let checked = this.state.posts
			.filter((elem) => elem.username != this.props.username)
			.filter((elem) =>
				elem.title.toUpperCase().includes(this.state.search.toUpperCase())
			)
			.map((elem) => (
				<Link to={`/posts/${elem.post_id}`}>
					<div className="posts">
						<h2>{elem.title}</h2>
						<div className="poster">
							<p>by {elem.username}</p>
							<img
								className="navImg profileImg"
								src={elem.profile_pic}
								alt={elem.username}
							/>
						</div>
					</div>
				</Link>
			));

		let posts = this.state.posts
			.filter((elem) =>
				elem.title.toUpperCase().includes(this.state.search.toUpperCase())
			)
			.map((elem) => (
				<Link to={`/posts/${elem.post_id}`}>
					<div className="posts">
						<h2>{elem.title}</h2>
						<div className="poster">
							<p>by {elem.username}</p>
							<img
								className="navImg profileImg"
								src={elem.profile_pic}
								alt={elem.username}
							/>
						</div>
					</div>
				</Link>
			));
		return (
			<div className="outer">
				<Nav />

				<div className="dashboard">
					<div className="searchBar">
						<input
							value={this.state.search}
							onChange={(e) => this.handleChange(e)}
						/>
						<button onClick={() => this.resetSearch()}>Reset</button>
						My Posts{' '}
						<input
							type="checkbox"
							defaultChecked
							onClick={() => this.check()}
						/>
					</div>
					<div className="postsBackground">
						{this.state.checkbox ? posts : checked}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { username, profile_pic } = state;
	return {
		username,
		profile_pic
	};
}

export default connect(mapStateToProps)(Dashboard);
