/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

export default class TaskView extends Backbone.View {

  constructor(config) {
    super(Object.assign(
      {},
      config
    ));
    const self = this;
    this.el.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn--del')) {
        self.el.dispatchEvent(new CustomEvent('task-remove', {
          detail: { task: self },
          bubbles: true,
          composed: true,
        }));
      } else if (e.target.classList.contains('btn--up')) {
        self.el.dispatchEvent(new CustomEvent('task-move-up', {
          detail: { task: self },
          bubbles: true,
          composed: true,
        }));
      } else if (e.target.classList.contains('btn--down')) {
        self.el.dispatchEvent(new CustomEvent('task-move-down', {
          detail: { task: self },
          bubbles: true,
          composed: true,
        }));
      } else if (e.target.classList.contains('btn--right')) {
        self.el.dispatchEvent(new CustomEvent('task-move-right', {
          detail: { task: self },
          bubbles: true,
          composed: true,
        }));
      } else if (e.target.classList.contains('btn--left')) {
        self.el.dispatchEvent(new CustomEvent('task-move-left', {
          detail: { task: self },
          bubbles: true,
          composed: true,
        }));
      }
    });
  }

  initialize() {
    this.tagName = 'div';
  }

  render() {
    this.$el.empty();
    this.$el.addClass('card');
    const { name, description, status, order } = this.model.attributes;
    const div = document.createElement('div');

    div.innerHTML = `
      <h3 class="card_title">${name}</h3>
      <div class="card_description">${description}</div>
      <div class="card_state">
        <span class="card_status">${status}</span>
        <span class="card_order">${order}</span>
      </div>
      <button class="btn  btn--up">&uArr;</button>
      <button class="btn  btn--right">&rArr;</button>
      <button class="btn  btn--down">&dArr;</button>
      <button class="btn  btn--left">&lArr;</button>
      <button class="btn  btn--del">x</button>
      `;
    [...div.children].forEach(c => this.el.appendChild(c));
    return this.el;
  }
}
