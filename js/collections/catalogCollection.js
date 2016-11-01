/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import jQuery from 'jquery';
import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

import Catalog from '../models/catalog';

export default class CatalogCollection extends Backbone.Collection {

  initialize() {
    this.model = Catalog;
  }
}
