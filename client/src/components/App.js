import React from 'react';
import './css/App.css';
import './css/style.css';
import './css/agency.min.css';
import './font-awesome/css/font-awesome.css';

export default class App extends React.Component {

  render() {

    return (
      <div>
        <div className="container">
          { /* Each Smaller Components */}
          {this.props.children}
        </div>
      </div>
    );
  }
}
