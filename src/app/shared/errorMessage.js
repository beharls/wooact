import React, {Component} from 'react';

export class ErrorMessage extends Component {
  render() {
    // Don't render error layout if message does not exist
    if (!this.props.message) {
      return null;
    }
    return (
      <div className="error-message">
        <h1>Error Loading {this.props.component}</h1>
        <p>{this.props.message}</p>
      </div>
    );
  }
}
ErrorMessage.propTypes = {
  component: React.PropTypes.string,
  message: React.PropTypes.string
};
