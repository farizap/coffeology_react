import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { connect } from "unistore/react";
import { Link } from "react-router-dom";
import actionsBeans from "../store/actionsBeans";

class BeanPage extends React.Component {
    componentDidMount = () => {
        this.props.getBeans();
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center d-block">
                        <h4 className="font-weight-bold">BEANS</h4>
                        <Accordion defaultActiveKey="0">
                            {this.props.origins.map((origin, index) =>
                                index !== 4 ? (
                                    <Card>
                                        <Accordion.Toggle
                                            as={Card.Header}
                                            eventKey={origin.id}
                                        >
                                            {origin.name.toUpperCase()}
                                        </Accordion.Toggle>
                                        {this.props.beans[origin.id].map(
                                            (bean, index) => (
                                                <Accordion.Collapse
                                                    eventKey={origin.id}
                                                >
                                                    <Link
                                                        to={"/beans/" + bean.id}
                                                    >
                                                        <Card.Body>
                                                            {bean.name}
                                                        </Card.Body>
                                                    </Link>
                                                </Accordion.Collapse>
                                            )
                                        )}
                                    </Card>
                                ) : (
                                    <span></span>
                                )
                            )}
                        </Accordion>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    "origins,beans",
    actionsBeans
)(BeanPage);
