import React, {Component} from 'react';

import {FeaturedProducts} from '../product/featuredProducts';
import {Slideshow} from '../shared/slideshow';
import {Page} from '../page/page';

export class Home extends Component {

  render() {
    return (
      <div id="home">
        <Slideshow/>
        <FeaturedProducts/>
        <Page slug="homepage-content" hideTitle="1"/>
      </div>
    );
  }
}
