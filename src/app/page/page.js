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
    const slug = this.props.slug || this.props.location.pathname.substring(1);
    const url = `http://woonode.dev:1337/pages/${slug}`;
    let title;
    let content;
    util
      .get(url)
      .then(response => {
        title = response.data.title.rendered;
        content = util.sanitize(response.data.content.rendered);
        // This would be an excellent use case for all, but axios doesn't support it.
        this.setState({title});
        this.setState({content});
      }).catch(() => {
        title = "Page Not Found";
        content = "404. Maybe you meant to go somewhere else.";
        this.setState({title});
        this.setState({content});
      }
    );
  }

  render() {
    return (
      <div className="page">
        {!this.props.hideTitle &&
          <h1>{this.state.title}</h1>
        }
        <article dangerouslySetInnerHTML={{__html: this.state.content}}/>
      </div>
    );
  }

}

Page.propTypes = {
  location: React.PropTypes.object,
  slug: React.PropTypes.string,
  hideTitle: React.PropTypes.string
};
