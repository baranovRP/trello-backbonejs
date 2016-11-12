/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Task from '../models/task';
import CatalogView from '../views/catalogView';

export const MOVE = {
  UP: -1,
  RIGHT: -1,
  DOWN: 1,
  LEFT: 1,
};

export default class BoardView extends Backbone.View {

  constructor(options) {
    super(Object.assign(
      {
        events: {
          moveTaskRight: 'moveTaskRight',
          moveTaskLeft: 'moveTaskLeft',
          'click .add-form_button': 'createTask',
          disableBtns: 'disableBtns',
        },
      },
      options
    ));

    this.addFormTemplate = _.template($('#add-form-template').html());
    const self = this;
    this.collection.forEach((catalog, idx) => {
      self.listenTo(self.collection.at(idx).get('tasks'), 'all', this.disableBtns);
    });
    this.render();
  }

  render() {
    this.$el.empty();
    this.$el.html(this.addFormTemplate());

    const [...catalogs] = this.collection.models;
    const ul = document.createElement('ul');
    ul.classList.add('catalogs');
    $(ul).append(
      catalogs.map((item) => {
        const li = document.createElement('li');
        li.classList.add('catalog');
        const h2 = document.createElement('h2');
        h2.textContent = item.attributes.title;
        li.appendChild(h2);
        const view = new CatalogView({
          model: item,
          collection: item.attributes.tasks,
        });
        li.appendChild(view.render().el);
        return li;
      })
    );
    this.$el.append(ul);
    this.disableBtns();
  }

  disableBtns() {
    const catalogEls = [...this.el.querySelectorAll('.catalog')];
    const size = catalogEls.length;
    catalogEls.forEach((catalog, idx)=> {
      const taskEls = [...catalog.querySelectorAll('.card')];
      taskEls.forEach(task => [...task.querySelectorAll('.btn')].forEach(i => i.disable = false));
      if (taskEls[0]) {
        taskEls[0].querySelector('.btn--up').disabled = true;
      }
      if (taskEls[taskEls.length - 1]) {
        taskEls[taskEls.length - 1].querySelector('.btn--down').disabled = true;
      }
      if (idx === 0) {
        taskEls.forEach(i => {
          if (i) {
            i.querySelector('.btn--left').disabled = true;
          }
        });
      }
      if (idx === (size - 1)) {
        taskEls.forEach(i => {
          if (i) {
            i.querySelector('.btn--right').disabled = true;
          }
        });
      }
    });
  }

  createTask() {
    const name = this.$el.find($('.add-form_name')).val();
    const description = this.$el.find($('.add-form_description')).val();
    if (name === '') {
      return;
    }
    const todo = this.collection.findWhere({ title: 'todo' });
    todo.attributes.tasks.add({
      name,
      description,
      status: todo.attributes.title,
      order: todo.attributes.tasks.nextOrder(),
    });
    this.clearInputFields();
  }

  clearInputFields() {
    this.$el.find($('.add-form_name')).val('');
    this.$el.find($('.add-form_description')).val('');
  }

  moveTaskRight(e) {
    const taskModel = e.detail.task.model;
    this.moveTaskHoriz(taskModel, this.collection, MOVE.RIGHT);
  }

  moveTaskLeft(e) {
    const taskModel = e.detail.task.model;
    this.moveTaskHoriz(taskModel, this.collection, MOVE.LEFT);
  }

  moveTaskHoriz(taskModel, catalogs, direction) {
    const task = new Task(Object.assign({}, taskModel.attributes));
    const prevCatalog = catalogs.findWhere({ title: taskModel.get('status') });
    const nextCatalogIdx = catalogs.findIndex(prevCatalog) - direction;
    if (nextCatalogIdx < 0 || nextCatalogIdx > (catalogs.length - 1)) {
      return;
    }
    const nextCatalog = catalogs.at(nextCatalogIdx);
    taskModel.destroy();
    task.set({ status: nextCatalog.get('title') });
    nextCatalog.attributes.tasks.add(task);
  }
}
