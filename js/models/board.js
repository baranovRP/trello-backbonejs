/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import Backbone from 'backbone';

import CatalogCollection from '../collections/catalogCollection';

export default class Board extends Backbone.Model {

  constructor(options) {
    super(options);
    this.model = new CatalogCollection();
  }
}
