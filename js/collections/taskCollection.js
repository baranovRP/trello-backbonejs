/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

import Task from '../models/task';

export default class TaskCollection extends Backbone.Collection {

  initialize() {
    this.model = Task;
  }
}

// TaskCollection.nextOrder = function nextOrder() {
//   return this.last().get('order') + 1;
// };
