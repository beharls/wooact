import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import {Main} from './app/main';
import {Home} from './app/home/home';
import {ProductDetails} from './app/product/productDetails';
import {Page} from './app/page/page';

import './index.scss';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home}/>
      <Route path="product/:slug" component={ProductDetails}/>
      <Route path="*" component={Page}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
