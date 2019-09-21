import React from 'react';
import ErrorImage from '../assets/images/errorPage.webp';

class ErrorPage extends React.Component {
  render() {
    return (
      <div className="errorpage">
        <div className="container">
          <div className="row pt-5 justify-content-center">
            <h3>PAGE NOT FOUND</h3>
          </div>
          <div className="row">
            <img src={ErrorImage} alt="" className="errorimage" />
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
