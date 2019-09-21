import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { Redirect } from "react-router-dom";

// import store
import { connect } from "unistore/react";
import actionsDemo from "../store/actionsDemo";

// import component
import Timer from "../components/timer";
import StepCard from "../components/stepCard";

class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = { steps: [] };
  }

  nextStep = () => {
    let newSteps = this.state.steps;
    newSteps.shift();
    this.setState({ steps: newSteps });
  };

  componentWillMount() {
    this.props.setStepIndex(0);
  }

  componentDidMount = async () => {

    this.setState({ steps: this.props.recipeSteps }, () => {
    });
    await this.props.setStepIndex(0);

  };

  componentWillUnmount() {
    window.location.reload();
  }

  componentWillUpdate = async (prevProps, prevState) => {
    if (prevProps.stepIndex !== this.props.stepIndex) {
      if (this.props.stepIndex > 0) {
        await this.nextStep();
        if (this.state.steps.length === 0) {
          await this.props.setResetTimer();
          await this.props.postHistory({
            recipeID: this.props.match.params.recipeID
          });

          await this.props.history.push(
            "/recipe/review/" + this.props.match.params.recipeID
          );
        }
      }
      if (this.state.steps[0] !== undefined) {
        this.props.setTimer(this.state.steps[0].time * 10);
        this.props.setStepTime(this.state.steps[0].time);
        this.props.setStepWater(this.state.steps[0].amount);
        this.props.setWaterLimit(
          this.state.steps[0].amount + this.props.waterLimit
        );
      }
    }
  };

  render() {
    if (this.state.steps === []) {
      return (
        <div>
          {sessionStorage.getItem("token") ? (
            <div></div>
          ) : (
              <Redirect to="/login" />
            )}

          <div>Loading</div>
        </div>
      );
    } else {
      return (
        <div>
          {sessionStorage.getItem("token") ? (
            <div></div>
          ) : (
              <Redirect to="/login" />
            )}
          <img
            className="backbutton "
            src={this.props.backButton}
            onClick={event => this.props.history.goBack()}
          />

          <div className="container">
            <div className="row">
              <div className="col-12">
                <Timer />
              </div>
              <div className="col-12">
                {this.state.steps.map((recipeStep, index) => {
                  return (
                    <div>
                      <CSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                      >
                        <div>
                          <StepCard data={recipeStep} />
                        </div>
                      </CSSTransitionGroup>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

// export default Steps;
export default connect(
  "recipeSteps, stepIndex, waterLimit, backButton",
  actionsDemo
)(Steps);
