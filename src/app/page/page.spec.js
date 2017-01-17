import React from 'react';
// import pageMock from '../mocks/pages.json';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import util from '../util';
import Page from './page';

describe('Page', () => {
  xit('should display a page when slug prop is set', done => {
    const data = {
      pages: [
        {
          title: "Test Page",
          slug: "test-page",
          type: "page",
          content: "<p>This is a test page</p>"
        }
      ]
    };
    const resolved = new Promise(r => r({data}));

    // @Todo move to before once I get it to work
    const getStub = sinon.stub(util, "get").callsFake(() => {
      return resolved;
    });

    const page = TestUtils.renderIntoDocument(<Page slug="test-page"/>);
    // @Todo move to after once I get it to work
    getStub.restore();

    // @Todo get output of page and change value
    expect(page).toEqual('test');
    done();
  });

  xit('should hide title when variable is set', () => {
    const page = TestUtils.renderIntoDocument(<Page slug="test-page"/>);
    const pageNode = ReactDOM.findDOMNode(page);
    expect(pageNode.tagName).toEqual('DIV');
  });

  xit('should sanitize CMS content', () => {
    const page = TestUtils.renderIntoDocument(<Page slug="test-injection"/>);
    const pageNode = ReactDOM.findDOMNode(page);
    expect(pageNode.tagName).toEqual('DIV');
  });
});
