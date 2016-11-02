/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

import TaskCollection from '../collections/taskCollection';

export default class Task extends Backbone.Model {

  defaults() {
    this.name = 'new task';
    this.description = 'new description';
    this.status = 'todo';
    // this.order = TaskCollection.nextOrder();
    this.order = 0;
  }

  initialize() {
    if (!this.get('name')) {
      this.set({ name: this.defaults().name });
    }
    // this.set({order: TaskCollection.nextOrder()});
  }
}
