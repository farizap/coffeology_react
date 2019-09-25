import React from 'react';
import { connect } from 'unistore/react';
import Pagination from 'react-bootstrap/Pagination';
import HistoryCard from './HistoryCard';
import actionsActivity from '../store/actionsActivity';

import loading from '../assets/images/loading.gif';

const _ = require('lodash');

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: 1,
    };
  }

  componentDidMount = async () => {
    this.getHistory();
  };

  componentWillUnmount = () => {
    this.props.setHistory(null);
  };

  getHistory = () => {
    this.props.getHistory({ p: this.state.pagination });
  };

  // handle to get data in previous page
  handlePreviousPageButton = (event) => {
    event.preventDefault();
    this.setState({ pagination: this.state.pagination - 1 }, () => {
      this.props.getHistory({
        p: this.state.pagination,
      });
    });
  };

  // handle to get data in next page
  handleNextPageButton = (event) => {
    event.preventDefault();
    this.setState({ pagination: this.state.pagination + 1 }, () => {
      this.props.getHistory({
        p: this.state.pagination,
      });
    });
  };

  render() {
    if (this.props.history === null) {
      return <img src={loading} alt="loading..." />;
    }
    if (_.isEmpty(this.props.history.data)) {
      return <h4>Anda belum punya history</h4>;
    }
    return (
      <div className="w-100">
        {this.props.history.data.map((value, key) => (
          <div className="col-12">
            <HistoryCard
              data={value}
              icon={this.props.methods[value.methodID - 1].icon}
            />
          </div>
        ))}
        <Pagination size="lg" className="justify-content-between">
          {this.props.history.pageNow === 1 ? (
            <span />
          ) : (
            <Pagination.First onClick={this.handlePreviousPageButton} />
          )}
          {this.props.history.pageNow === this.props.history.pageTotal ? (
            <span />
          ) : (
            <Pagination.Last onClick={this.handleNextPageButton} />
          )}
        </Pagination>
      </div>
    );
  }
}

export default connect(
  'methods, history',
  actionsActivity,
)(History);
