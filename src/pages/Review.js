import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

import {
	FacebookShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	LinkedinShareButton,
	LineShareButton
} from 'react-share';
import { FacebookIcon, TelegramIcon, TwitterIcon, WhatsappIcon, LinkedinIcon, LineIcon } from 'react-share';

import { connect } from 'unistore/react';
import actionsDemo from '../store/actionsDemo';

class Review extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      rating: 3,
      photo: '',
      ratingLabels: {
        1: 'SANGAT BURUK',
        2: 'BURUK',
        3: 'OK',
        4: 'BAGUS',
        5: 'SANGAT BAGUS',
      },
      review: {},
    };
  }


	// handle form input change
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// handle when submit button press
	submitReview = async (event) => {
		event.preventDefault();
		this.setState(
			{
				review: {
					recipeID: this.props.match.params.recipeID,
					historyID: this.props.historyID,
					content: this.state.content,
					rating: this.state.rating,
					photo: this.state.photo
				}
			},
			async () => {
				// post review and push to /activity
				await this.props.postReview(this.state.review);
				await this.props.history.push('/activity');
			}
		);
	};

	// remove sessionStorage assosiated with recipe
	componentWillUnmount() {
		sessionStorage.removeItem('RecipeDetail');
		sessionStorage.removeItem('Recipe');
	}

	render() {
		return (
			<div>
				<div className="container review">
					<div className="row justify-content-center">
						<Typography component="legend">APA PENDAPATMU TENTANG RESEP INI?</Typography>
					</div>
					<div className="row justify-content-center pt-3 p">
						<h3 className="mb-0">{this.state.ratingLabels[this.state.rating].toUpperCase()}</h3>
					</div>
					<div className="row justify-content-center pb-3">
						<Rating name="rating" value={this.state.rating} size="large" onChange={this.handleChange} />
					</div>

					<div className="row justify-content-center">
						<form onSubmit={this.submitReview} className="row justify-content-center">
							<label htmlFor="content">REVIEW</label>
							<textarea
								className="form-control"
								id="content"
								rows="3"
								name="content"
								onChange={this.handleChange}
							/>
							<input className=" btn btn-dark btn-block my-3" type="submit" value="Submit" />
						</form>
					</div>
				</div>
				<div className="row justify-content-center pt-3 pb-2">BAGIKAN</div>
				<div className="row justify-content-center">
					<FacebookShareButton
						children={<FacebookIcon size={50} round={true} />}
						url={'http://coffeology.shop/recipe/' + this.props.match.params.recipeID}
					/>
					<TelegramShareButton
						children={<TelegramIcon size={50} round={true} />}
						url={
							'Resep dari coffeology ini baru saja kucoba ' +
							'http://coffeology.shop/recipe/' +
							this.props.match.params.recipeID
						}
					/>
					<TwitterShareButton
						children={<TwitterIcon size={50} round={true} />}
						url={'http://coffeology.shop/recipe/' + this.props.match.params.recipeID}
					/>
					<WhatsappShareButton
						children={<WhatsappIcon size={50} round={true} />}
						url={'http://coffeology.shop/recipe/' + this.props.match.params.recipeID}
					/>
					<LinkedinShareButton
						children={<LinkedinIcon size={50} round={true} />}
						url={'http://coffeology.shop/recipe/' + this.props.match.params.recipeID}
					/>
					<LineShareButton
						children={<LineIcon size={50} round={true} />}
						url={'http://coffeology.shop/recipe/' + this.props.match.params.recipeID}
					/>
				</div>
				<div className="row justify-content-center pt-5">
					<div className="col-3">
						<img
							src={this.props.homeButton}
							alt=""
							className="homebutton w-75"
							onClick={(event) => this.props.history.push('/')}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	'historyID, menuButton, homeButton',
	actionsDemo
)(Review);
