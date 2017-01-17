import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';

export class Header extends Component {
  constructor() {
    super();
    this.state = {siteInfo: {}};
  }

  componentDidMount() {
    axios
      .get('app/mocks/info.json')
      .then(response => {
        this.setState({siteInfo: response.data});
      });
  }

  render() {
    return (
      <header>
        <Link to={`/`}>
          <h1 id="site-title">
            {this.state.siteInfo.title}
          </h1>
        </Link>
        {this.state.siteInfo.tagline &&
          <h2 id="site-subtitle">
            {this.state.siteInfo.tagline}
          </h2>
        }
      </header>
    );
  }
}
