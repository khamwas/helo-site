import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateUser, clearUser } from '../../redux/reducer';
import axios from 'axios';

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	handleChange(e, name) {
		this.setState({ [name]: e.target.value });
	}

	login() {
		axios.post('/api/auth/login', this.state).then((result) => {
			this.props.updateUser(result.data);
		});
	}

	register() {
		axios
			.post(
				'/api/auth/register',
				Object.assign({}, this.state, {
					profile_pic: `https://robohash.org/${
						this.state.username
					}@robohash.org?gravatar=yes%20or%20https://robohash.org/620050a4db5104bae758cd75171d64ca?gravatar=hashed`
				})
			)
			.then((result) => {
				this.props.updateUser(result.data);
				this.props.history.push('/dashboard');
			});
	}

	render() {
		return (
			<div className="authContainer">
				<div>
					<img
						alt="logo"
						src="https://s3.us-east-2.amazonaws.com/boardashell/helo_logo.png
                    "
					/>
					<img
						className="gravitar"
						alt="gravitar"
						src={`https://robohash.org/${
							this.state.username
						}@robohash.org?gravatar=yes%20or%20https://robohash.org/620050a4db5104bae758cd75171d64ca?gravatar=hashed
                    `}
					/>
				</div>
				<h1 className="logo"> Helo</h1>
				<div className="greaterAuthInput">
					Username:{' '}
					<input
						value={this.state.username}
						onChange={(e) => this.handleChange(e, 'username')}
					/>
				</div>
				<div className="greaterAuthInput">
					Password:{' '}
					<input
						type="password"
						value={this.state.password}
						onChange={(e) => this.handleChange(e, 'password')}
					/>
				</div>
				<div className="authButtonContainer">
					<button className="authButton" onClick={() => this.login()}>
						Login
					</button>
					<button className="authButton" onClick={() => this.register()}>
						Register
					</button>
				</div>
				{this.props.username !== '' && <Redirect to="/dashboard" />}
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

export default connect(
	mapStateToProps,
	{ updateUser, clearUser }
)(Auth);
