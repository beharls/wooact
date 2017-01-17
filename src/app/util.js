import axios from 'axios';
import toMarkdown from 'to-markdown';
import marked from 'marked';

const util = () => {
  const get = url => {
    return axios.get(url);
  };

  const sanitize = input => {
    return marked(toMarkdown(input), {sanitize: true});
  };

  return {
    get, sanitize
  };
};

module.exports = util();
