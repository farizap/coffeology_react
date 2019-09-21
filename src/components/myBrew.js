import React from "react";
import { Link, Redirect } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

// import store
import { connect } from "unistore/react";
import actionsActivity from "../store/actionsActivity";

// import component
import RecipeCard from "./recipeCard";

// import img
import loading from "../assets/images/loading.gif";

class MyBrew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: 1
    };
  }

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

  componentDidMount = async () => {
    this.props.getMyBrew({ p: this.state.pagination });
  };

  componentWillUnmount = () => {
    this.props.setMyBrew(null);
  };



  render() {
    if (this.props.myBrew === null) {
      return <img src={loading} alt="loading..." />;
    } else if (this.props.myBrew.data.length === 0) {
      return <h4>Anda belum membuat Resep</h4>;
    } else {
      return (
        <div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.props.createRecipe}
          >
            Tambah Guide
          </button>
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
          <Pagination size="lg">
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
  "myBrew, methods",
  actionsActivity
)(MyBrew);
