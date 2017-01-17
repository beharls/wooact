/* eslint react/no-danger: 0 */
import React, {Component} from 'react';
import util from '../util';

export class Page extends Component {
  constructor() {
    super();
    this.state = {page: [], pageContent: ""};
  }

  componentDidMount() {
    /**
     * @todo Filter server-side once I switch to real API
     */
    util
      .get('app/mocks/pages.json')
      .then(response => {
        const selectedPage = response.data.pages.find(page =>
          (this.props.location && page.slug === this.props.location.pathname.substring(1)) ||
          (this.props.slug && page.slug === this.props.slug));
        const content = util.sanitize(selectedPage.content);
        this.setState({page: selectedPage});
        this.setState({pageContent: content});
      });
  }

  render() {
    return (
      <div className="page">
        {!this.props.hideTitle &&
          <h1>{this.state.page ? this.state.page.title : "Page Not Found"}</h1>
        }
        {/* @todo limited rendering of html (safe tags like h1,h2,p,div,img,etc) */}
      {this.state.page ?
        <article dangerouslySetInnerHTML={{__html: this.state.pageContent}}/> :
        <p>404. Maybe you meant to go somewhere else.</p>
      }
      </div>
    );
  }

}

Page.propTypes = {
  location: React.PropTypes.object,
  slug: React.PropTypes.string,
  hideTitle: React.PropTypes.string
};
