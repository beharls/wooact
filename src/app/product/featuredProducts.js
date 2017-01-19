import React, {Component} from 'react';
import Loader from 'react-loader';
import {ErrorMessage} from '../shared/errorMessage';
import util from '../util';
import config from '../config';

import {ProductSummary} from '../product/productSummary';

export class FeaturedProducts extends Component {
  constructor() {
    super();
    this.state = {products: [], error: null, loaded: false};
  }

  componentDidMount() {
    util
      .get(`${config.wooUrl}products/featured`)
      .then(response => {
        this.setState({products: response.data, loaded: true});
      }).catch(err => {
        this.setState({error: err, loaded: true});
      });
  }

  render() {
    return (
      <div id="featured-products" className="container">
        <h3>Featured Products</h3>
        <Loader loaded={this.state.loaded}>
          <div className="products-container">
            {this.state.products.map((product, i) => (
              <ProductSummary key={i} product={product}/>
            ))}
          </div>
          <ErrorMessage component="Featured Products" message={this.state.error}/>
        </Loader>
      </div>
    );
  }
}
