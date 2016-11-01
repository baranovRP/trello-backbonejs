/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import jQuery from 'jquery';
import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

import CatalogView from '../views/catalogView';

export default class AppView extends Backbone.View {

  initialize() {
    this.events = {
      'click': 'taskCreated',
    };

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
    const name = this.$el($('.add-form_name')).value;
    const description = this.$el($('.add-form_description')).value;
    if (name === '') {
      return;
    }

    // self.onTaskCreated({ name, description });
  }
}
