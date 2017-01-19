import React, {Component} from 'react';
import {Link} from 'react-router';
import util from '../util';

export class ProductSummary extends Component {

  render() {
    return (
      <Link to={`/product/${this.props.product.slug}`}>
        <div className="product-summary">
          <section className="main-image">
          {this.props.product.images &&
            this.props.product.images[0] &&
            <img src={this.props.product.images[0].src}/>}
          </section>
          <section className="summary">
            <p>{this.props.product.name}</p>
            <p className="price">
              {util.getPrice(this.props.product.salesPrice, this.props.product.price)}
            </p>
          </section>
        </div>
      </Link>
    );
  }
}
ProductSummary.propTypes = {
  product: React.PropTypes.object.isRequired
};
