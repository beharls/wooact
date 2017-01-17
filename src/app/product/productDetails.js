import React, {Component} from 'react';
import axios from 'axios';

export class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {product: []};
  }

  componentDidMount() {
    /**
     * @todo Filter server-side once I switch to real API
     */
    axios
      .get('app/mocks/products.json')
      .then(response => {
        const selectedProduct = response.data.products.find(product => product.slug === this.props.params.slug);
        this.setState({product: selectedProduct});
      });
  }

  render() {
    return (
      <div id="product-details" className="container">
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
            ${this.state.product.regular_price}
          </section>
          {/* @todo add variations */}
          <section className="add-to-cart">
            {(this.state.product.in_stock) ?
              <form>
                <input type="number" defaultValue="1" id="quantity" name="quantity"/>
                <button type="submit">Add to cart</button>
              </form> :
              <div>Out of stock.</div>
            }

          </section>
          <section id="description">
            <h3>Description</h3>
            <div>{this.state.product.description}</div>
          </section>
           {/* @todo add reviews */}
        </section>
      </div>
    );
  }
}
ProductDetails.propTypes = {
  params: React.PropTypes.object
};
