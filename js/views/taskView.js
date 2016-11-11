/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

export default class TaskView extends Backbone.View {

  constructor(options) {
    super(Object.assign(
      {
        tagName: 'li',
        className: 'task',
        events: {
          'click .btn--del': 'deleteTask',
          'click .btn--up': 'moveTaskUp',
          'click .btn--right': 'moveTaskRight',
          'click .btn--down': 'moveTaskDown',
          'click .btn--left': 'moveTaskLeft',
        },
      },
      options
    ));
    this.template = _.template($('#task-template').html());

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  }

  render() {
    this.$el.empty()
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

  deleteTask() {
    this.model.destroy();
  }

  moveTaskUp() {
    this.moveTask('moveTaskUp');
  }

  moveTaskRight() {
    this.moveTask('moveTaskRight');
  }

  moveTaskDown() {
    this.moveTask('moveTaskDown');
  }

  moveTaskLeft() {
    this.moveTask('moveTaskLeft');
  }

  moveTask(funcName) {
    const self = this;
    this.el.dispatchEvent(new CustomEvent(funcName, {
      detail: { task: self },
      bubbles: true,
      composed: true,
    }));
  }
}
