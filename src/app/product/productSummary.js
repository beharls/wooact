import React, {Component} from 'react';
import {Link} from 'react-router';

export class ProductSummary extends Component {

  componentDidMount() {
    /**
     * @todo Filter server-side once I switch to real API
     */
  }

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
            <p>{this.props.product.title}</p>
            <p className="price">
              {this.props.product.regular_price}
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
