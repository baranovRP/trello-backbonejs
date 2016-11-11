/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import Backbone from 'backbone';

import Task from '../models/task';

export default class TaskCollection extends Backbone.Collection {

  constructor(options) {
    super(options);
    this.model = Task;
  }

  nextOrder() {
    if (!this.length) {
      return 1;
    }

    return this.last().get('order') + 1;
  }

  updateOrder() {
    this.forEach((item, idx) => {
      item.set({ order: idx });
    });
  }
}
