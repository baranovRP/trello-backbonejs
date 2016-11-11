/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import Backbone from 'backbone';

import TaskCollection from '../collections/taskCollection';

export default class Catalog extends Backbone.Model {

  constructor(options) {
    super(options);
    this.model = new TaskCollection();
  }
}
