/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

import CatalogView from '../views/catalogView';

export default class BoardView extends Backbone.View {

  constructor(config) {
    super(Object.assign(
      {
        events: {
          click: 'onTaskCreated',
          'task-remove': 'onTaskRemoved',
          'task-move-up': 'onTaskMoveUp',
          'task-move-down': 'onTaskMoveDown',
          'task-move-right': 'onTaskMoveRight',
          'task-move-left': 'onTaskMoveLeft',
        },
      },
      config
    ));
    this.render();
  }

  render() {
    this.el.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('add-form');

    div.innerHTML = `
      <input class="add-form_name" type="text" placeholder="add todo" name="todo-name">
      <textarea class="add-form_description" placeholder="add description" name="description"></textarea>
      <button class="add-form_button">Добавить</button>`;
    this.el.appendChild(div);

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
        li.appendChild(view.render());
        return li;
      })
    );
    this.$el.append(ul);
  }

  onTaskCreated(e) {
    if (!e.target.classList.contains('add-form_button')) {
      return;
    }
    const name = this.$el.find($('.add-form_name')).val();
    const description = this.$el.find($('.add-form_description')).val();
    if (name === '') {
      return;
    }

    this.collection.forEach((item) => {
      const status = item.attributes.title;
      if (status !== 'todo') {
        return;
      }
      const order = item.attributes.tasks.length;
      item.attributes.tasks.add({
        name,
        description,
        status,
        order,
      });
    });
  }

  onTaskRemoved(e) {
    const catalogTitle = e.detail.task.model.attributes.status;
    this.collection.forEach((item) => {
      const status = item.attributes.title;
      if (status !== catalogTitle) {
        return;
      }
      item.attributes.tasks.remove(e.detail.task.model);
    });
  }

  onTaskMoveUp(e) {
    console.log(e.detail.task);
  }

  onTaskMoveDown(e) {
    console.log(e.detail.task);
  }

  onTaskMoveRight(e) {
    console.log(e.detail.task);
  }

  onTaskMoveLeft(e) {
    console.log(e.detail.task);
  }
}
