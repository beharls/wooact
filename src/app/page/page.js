/* eslint react/no-danger: 0 */
import React, {Component} from 'react';
import Loader from 'react-loader';
import util from '../util';
import config from '../config';

export class Page extends Component {
  constructor() {
    super();
    this.state = {page: [], pageContent: "", loaded: false};
  }

  componentDidMount() {
    /**
     * @todo Filter server-side once I switch to real API
     */
    const slug = this.props.slug || this.props.location.pathname.substring(1);
    const url = `${config.wooUrl}pages/${slug}`;
    util
      .get(url)
      .then(response => {
        this.onSuccess(response);
      }).catch(() => {
        this.onError();
      }
    );
  }

  render() {
    return (
      <div className="page">
        <Loader loaded={this.state.loaded}>
          {!this.props.hideTitle &&
            <h1>{this.state.title}</h1>
          }
          <article dangerouslySetInnerHTML={{__html: this.state.content}}/>
        </Loader>
      </div>
    );
  }

  onSuccess(response) {
    const title = response.data.title.rendered;
    const content = util.sanitize(response.data.content.rendered);
    // This would be an excellent use case for all, but axios doesn't support it.
    this.setPageContent(title, content);
  }

  /**
   * All errors loading CMS pages are treated like a 404
   */
  onError() {
    const title = "Page Not Found";
    const content = "404. Maybe you meant to go somewhere else.";
    this.setPageContent(title, content);
  }

  setPageContent(title, content) {
    this.setState({title});
    this.setState({content});
    this.setState({loaded: true});
  }

}

Page.propTypes = {
  location: React.PropTypes.object,
  slug: React.PropTypes.string,
  hideTitle: React.PropTypes.string
};
