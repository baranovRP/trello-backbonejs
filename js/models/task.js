/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import Backbone from 'backbone';

export default class Task extends Backbone.Model {

  defaults() {
    return {
      status: 'todo',
    };
  }

  validate(attribs) {
    if (attribs.name === undefined) {
      return 'The name can not be empty.';
    }
  }

  initialize() {
    this.on('invalid', (model, error) => {
      console.log(error);
    });
    this.on('change', () => {
      console.log(`values for ${JSON.stringify(this.attributes)} are changed`);
    });
  }
}
