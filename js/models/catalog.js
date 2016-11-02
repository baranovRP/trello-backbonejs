/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

import TaskCollection from '../collections/taskCollection';

export default class Catalog extends Backbone.Model {

  default() {
    this.title = '';
    this.tasks = new TaskCollection();
  }

  updateStatuses() {
    this.attributes.tasks.forEach((item, idx) => {
      item.set({ order: idx });
    });
  }

  // nextOrder() {
  //   return this.attributes.tasks.length - 1;
  // }
}
