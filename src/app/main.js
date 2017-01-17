import React, {Component} from 'react';
import {Header} from './header';
import {Footer} from './footer';

export class Main extends Component {
  render() {
    return (
      <div>
        <Header/>
        <main>
          {this.props.children}
        </main>
        <Footer/>
      </div>
    );
  }
}
Main.propTypes = {
  children: React.PropTypes.node
};
