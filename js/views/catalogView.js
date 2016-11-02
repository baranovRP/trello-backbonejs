/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

import TaskView from '../views/taskView';

export default class CatalogView extends Backbone.View {

  constructor(config) {
    super(Object.assign(
      {
        tagName: 'ul',
      },
      config
    ));
    this.collection.on('update', () => this.render());
  }

  render() {
    this.$el.empty();
    const { tasks, title } = this.model.attributes;
    this.$el.addClass(`tasks  tasks--${title}`);
    this.$el.attr('id', `sortable-${title}`);

    this.$el.append(
      tasks.map((item) => {
        const li = document.createElement('li');
        $(li).addClass('task');
        item.collection.forEach((i, idx) => {
          i.set({ order: idx });
        });
        const view = new TaskView({ model: item, collection: item.collection });
        $(li).append(view.render());
        return li;
      })
    );

    return this.el;
  }
}
