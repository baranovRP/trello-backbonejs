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
          click: 'taskCreated',
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
        const view = new CatalogView({ model: item });
        li.appendChild(view.render());
        return li;
      })
    );
    this.$el.append(ul);
  }

  taskCreated(e) {
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
    // this.collection = [...this.collection];
  }
}
