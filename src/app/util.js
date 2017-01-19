import axios from 'axios';
import toMarkdown from 'to-markdown';
import marked from 'marked';

const util = {};

util.get = url => {
  return axios.get(url);
};

util.sanitize = input => {
  return marked(toMarkdown(input), {sanitize: true});
};

util.getPrice = (salesPrice, regularPrice) => {
  const price = parseFloat(salesPrice) || parseFloat(regularPrice);
  return `$${price.toFixed(2)}`;
};

module.exports = util;
