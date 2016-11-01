/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

import CatalogCollection from '../collections/catalogCollection';

export default class Board extends Backbone.Model {

  default() {
    this.catalogs = new CatalogCollection();
  }
}
