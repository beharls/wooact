import React, {Component} from 'react';
import axios from 'axios';

import {ProductSummary} from '../product/productSummary';

export class FeaturedProducts extends Component {
  constructor() {
    super();
    this.state = {products: []};
  }

  componentDidMount() {
    axios
      .get('app/mocks/products.json')
      .then(response => {
        const featuredProducts = response.data.products.filter(
          product => product.featured
        );
        this.setState({products: featuredProducts});
      });
  }

  render() {
    return (
      <div id="featured-products" className="container">
        <h3>Featured Products</h3>
        <div className="products-container">
        {this.state.products.map((product, i) => (
          <ProductSummary key={i} product={product}/>
        ))}
        </div>
      </div>
    );
  }
}
