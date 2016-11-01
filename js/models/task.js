/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import jQuery from 'jquery';
import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

export default class Task extends Backbone.Model {

  defaults() {
    this.name = 'new task';
    this.description = '';
    this.status = 'todo';
    this.order = '';
  }
}
