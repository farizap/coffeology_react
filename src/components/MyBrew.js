import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

// import store
import { connect } from 'unistore/react';
import actionsActivity from '../store/actionsActivity';

// import component
import RecipeCard from './RecipeCard';

// import img
import loading from '../assets/images/loading.gif';

class MyBrew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: 1,
    };
  }

  componentDidMount = () => {
    this.props.getMyBrew({ p: this.state.pagination });
  };

  componentWillUnmount = () => {
    this.props.setMyBrew(null);
  };

  // function to handle convert seconds to minute:second
  convertSeconds = (secondsInput) => {
    let minutes = Math.floor(parseInt(secondsInput) / 60);
    let seconds = parseInt(secondsInput) - minutes * 60;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  // to get Recipe Data for previous page
  handlePreviousPageButton = (event) => {
    event.preventDefault();
    this.setState({ pagination: this.state.pagination - 1 }, () => {
      this.props.getMyBrew({ p: this.state.pagination });
    });
  };

  // to get Recipe Data for previous page
  handleNextPageButton = (event) => {
    event.preventDefault();
    this.setState({ pagination: this.state.pagination + 1 }, () => {
      this.props.getMyBrew({ p: this.state.pagination });
    });
  };

  render() {
    if (this.props.myBrew === null) {
      return <img src={loading} alt="loading..." />;
    } else if (this.props.myBrew.data.length === 0) {
      return <h4>Anda belum membuat Resep</h4>;
    } else {
      return (
        <div>
          {this.props.myBrew.data.map((value, key) => (
            <div className="col-12">
              <Link to={`/recipe/${value.id}`}>
                <RecipeCard
                  className="w-100"
                  pageType="pageMyBrew"
                  method={this.props.methods[value.methodID - 1]}
                  data={value}
                  time={this.convertSeconds(value.time)}
                />
              </Link>
            </div>
          ))}
          <Pagination size="lg" className="justify-content-between">
            {this.props.myBrew.pageNow === 1 ? (
              <span></span>
            ) : (
              <Pagination.First onClick={this.handlePreviousPageButton} />
            )}
            {this.props.myBrew.pageNow === this.props.myBrew.pageTotal ? (
              <span></span>
            ) : (
              <Pagination.Last onClick={this.handleNextPageButton} />
            )}
          </Pagination>
        </div>
      );
    }
  }
}

export default connect(
  'myBrew, methods',
  actionsActivity,
)(MyBrew);
