import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser, clearUser } from '../../redux/reducer';

function Nav(props) {
	return (
		<div className="navBar">
			<div className="imgCircle">
				<img className="navImg" alt="profile" src={props.profile_pic} />
			</div>
			<p>{props.username}</p>
			<Link to="/dashboard">
				<img
					className="navImg"
					alt="home"
					src="https://s3.us-east-2.amazonaws.com/boardashell/dashboard.png"
				/>
			</Link>
			<Link to="/posts">Posts</Link>
			<Link to="/form">
				<img
					className="navImg"
					alt="form"
					src="https://s3.us-east-2.amazonaws.com/boardashell/form.png"
				/>
			</Link>
			<img
				className="navImg"
				alt="logout"
				src="https://s3.us-east-2.amazonaws.com/boardashell/logout.png"
				onClick={() => props.clearUser()}
			/>
			{props.username === '' && <Redirect to="/" />}
		</div>
	);
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
)(Nav);
