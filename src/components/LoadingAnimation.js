import React from 'react';

export default class LoadingAnimation extends React.PureComponent {

  render() {
    return (
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    )
  }
}