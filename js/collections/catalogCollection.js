/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import Backbone from 'backbone';

import Catalog from '../models/catalog';

export default class CatalogCollection extends Backbone.Collection {

  constructor(options) {
    super(options);
    this.model = Catalog;
  }
}
