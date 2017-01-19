/* eslint react/no-danger: 0 */
import React, {Component} from 'react';
import Loader from 'react-loader';
import {ErrorMessage} from '../shared/errorMessage';
import util from '../util';
import config from '../config';

export class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {product: [], description: null, error: null, loaded: false};
  }

  componentDidMount() {
    /**
     * @todo Filter server-side once I switch to real API
     */
    util
      .get(`${config.wooUrl}products/${this.props.params.slug}`)
      .then(response => {
        const description = util.sanitize(response.data.description);
        this.setState({product: response.data, description, loaded: true});
      }).catch(err => {
        this.setState({error: err, loaded: true});
      });
  }

  render() {
    return (
      <div id="product-details-wrapper">
        <Loader loaded={this.state.loaded}>
          <div id="product-details" className={this.state.error ? "container hidden" : "container"}>
            <section id="images">
              <div id="main-image">
              {this.state.product.images &&
                this.state.product.images[0] &&
                <img src={this.state.product.images[0].src}/>}
              </div>
              <div id="thumbnails">
                <div>
                  {this.state.product.images &&
                    this.state.product.images.map((image, i) => (
                      <img key={i} src={image.src}/>
                  ))}
                </div>
              </div>
            </section>
            <section id="summary">
              <h1>{this.state.product.title}</h1>
              <section className="price">
                {util.getPrice(this.state.product.salesPrice, this.state.product.price)}
              </section>
              {/* @todo add variations */}
              <section className="add-to-cart">
                {(this.state.product.in_stock) ?
                  <form>
                    <input type="number" defaultValue="1" id="quantity" name="quantity"/>
                    <button type="submit">Add to cart</button>
                  </form> :
                  <div></div>
                }

              </section>
              <section id="description">
                <h3>Description</h3>
                <div dangerouslySetInnerHTML={{__html: this.state.description}}/>
              </section>
               {/* @todo add reviews */}
            </section>
          </div>
          <ErrorMessage component="Product Details" message={this.state.error}/>
        </Loader>
      </div>
    );
  }
}
ProductDetails.propTypes = {
  params: React.PropTypes.object
};
