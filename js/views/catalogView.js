/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import sortable from 'jquery-ui-bundle';
import Backbone from 'backbone';

import Task from '../models/task';
import TaskView from '../views/taskView';

import { MOVE } from '../views/boardView';

export default class CatalogView extends Backbone.View {

  constructor(options) {
    super(Object.assign(
      {
        tagName: 'ul',
        className: `tasks  tasks--${options.model.get('title')}`,
        id: `sortable-${options.model.get('title')}`,
        events: {
          moveTaskUp: 'moveTaskUp',
          moveTaskDown: 'moveTaskDown',
        },
      },
      options
    ));

    this.collection.on('update', () => this.render());
  }

  render() {
    this.$el.empty();
    const { tasks, title } = this.model.attributes;
    tasks.updateOrder();
    this.$el.append(
      tasks.map((item) => {
        const view = new TaskView({ model: item });
        return view.render().el;
      })
    );

    return this;
  }

  moveTaskUp(e) {
    const taskModel = e.detail.task.model;
    this.moveTaskVert(taskModel, this.collection, MOVE.UP);
  }

  moveTaskDown(e) {
    const taskModel = e.detail.task.model;
    this.moveTaskVert(taskModel, this.collection, MOVE.DOWN);
  }

  moveTaskVert(taskModel, tasks, direction) {
    const task = new Task(Object.assign({}, taskModel.attributes));
    const currIdx = tasks.findIndex(taskModel);
    const newIdx = currIdx + direction;
    if (newIdx < 0 || newIdx > (tasks.length - 1)) {
      return;
    }
    const other = tasks.at(newIdx);
    tasks.at(currIdx).set({ name: other.get('name'), description: other.get('description') });
    tasks.at(newIdx).set({ name: task.get('name'), description: task.get('description') });
  }
}
