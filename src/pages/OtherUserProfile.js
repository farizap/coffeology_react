import React from 'react';
import { Link } from 'react-router-dom';

// import component
import RecipeCard from '../components/RecipeCard';

// import image
import profileIcon from '../assets/images/profile.png';
import loading from '../assets/images/loading.gif';

// import store
import { connect } from 'unistore/react';
import actionsProfile from '../store/actionsProfile';
import useStyles from '../store/style';

class OtherUserProfile extends React.Component {
	componentDidMount = async () => {
		if (sessionStorage.getItem('token') !== null) {
			await this.props.getProfile();
			if (parseInt(this.props.userMe.id) === parseInt(this.props.match.params.userID)) {
				this.props.history.push('/profile/me');
			}
		}
		// get user profile by userID from params in endpoint
		this.props.getProfileByID(this.props.match.params.userID);

		// get user brew by userID
		this.props.getUserBrew(this.props.match.params.userID);
	};

	componentWillUnmount = () => {
		// reset props from store back to null
		this.props.setDataUser(null);
		this.props.setDataUserBrew(null);
	};

	// convert second from input nto string with format 'minutes:seconds'
	convertSeconds(secondsInput) {
		let minutes = Math.floor(parseInt(secondsInput) / 60);
		let seconds = parseInt(secondsInput) - minutes * 60;
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		return `${minutes}:${seconds}`;
	}

	render() {
		if (this.props.user === null || this.props.userBrew === null) {
			return <img src={loading} alt="loading..." />;
		} else if (this.props.user === false) {
			return (
				<div>
					<h3>Data User Tidak Ada</h3>
				</div>
			);
		}
		return (
			<div className="container-fluid pt-4 profile">
				<img
					className="backbutton"
					src={this.props.backButton}
					onClick={(event) => this.props.history.goBack()}
					alt="backButton"
				/>
				<div className="row login_box border">
					<div className="col-12 py-3" align="center">
						<img src={profileIcon} className="rounded-circle" width="100px" alt="profileIcon" /> <br />
						<h4 className="pt-2">{this.props.user.name}</h4>
						<span className="text-justify text-secondary font-italic">{this.props.user.bio}</span>
					</div>
					<div className="col-6 p-0" align="center">
						<h5 className="py-3 border rounded text-white  profileinfo">
							{this.props.user.brewCount} <br /> <span>Brew</span>
						</h5>
					</div>
					<div className="col-6 p-0" align="center">
						<h5 className="py-3 border rounded text-white  profileinfo">
							{this.props.user.recipeCount} <br /> <span>Resep</span>
						</h5>
					</div>

					<div className="col-12 mb-2 mt-4">
						<h5 className="mb-0">DAFTAR RESEP</h5>
						<hr className="mt-0"></hr>
						{this.props.userBrew.length === 0 ? (
							<div>
								<h6>Tidak ada resep yang ditampilkan</h6>
							</div>
						) : (
							this.props.userBrew.map((value, key) => (
								<div className="col-12">
									<Link to={`/recipe/${value.id}`}>
										<RecipeCard
											className="w-100"
											pageType="pageUserBrew"
											method={this.props.methods[value.methodID - 1]}
											data={value}
											time={this.convertSeconds(value.time)}
										/>
									</Link>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	'userMe, Toast, user, userBrew, methods, backButton',
	actionsProfile,
	useStyles
)(OtherUserProfile);
