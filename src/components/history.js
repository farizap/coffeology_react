import React from "react";
import HistoryCard from "./historyCard";
import { connect } from "unistore/react";
import actionsActivity from "../store/actionsActivity";

import loading from "../assets/images/loading.gif";
import Pagination from "react-bootstrap/Pagination";

const _ = require("lodash");

class history extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pagination: 1
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

    handlePreviousPageButton = event => {
        event.preventDefault();
        this.setState({ pagination: this.state.pagination - 1 }, () => {
            this.props.getHistory({
                p: this.state.pagination
            });
        });
    };

    handleNextPageButton = event => {
        event.preventDefault();
        this.setState({ pagination: this.state.pagination + 1 }, () => {
            this.props.getHistory({
                p: this.state.pagination
            });
        });
    };

    render() {
        if (this.props.history === null) {
            return <img src={loading} alt="loading..." />;
        } else if (_.isEmpty(this.props.history.data)) {
            return <h4>Anda belum punya history</h4>;
        } else {
            return (
                <div className="w-100">
                    {this.props.history.data.map((value, key) => (
                        <div className="col-12">
                            <HistoryCard
                                data={value}
                                icon={
                                    this.props.methods[value.methodID - 1].icon
                                }
                            />
                        </div>
                    ))}
                    <Pagination size="lg" className="justify-content-between">
                        {this.props.history.pageNow === 1 ? (
                            <span></span>
                        ) : (
                            <Pagination.First
                                onClick={this.handlePreviousPageButton}
                            />
                        )}
                        {this.props.history.pageNow ===
                        this.props.history.pageTotal ? (
                            <span></span>
                        ) : (
                            <Pagination.Last
                                onClick={this.handleNextPageButton}
                            />
                        )}
                    </Pagination>
                </div>
            );
        }
    }
}

export default connect(
    "methods, history",
    actionsActivity
)(history);
