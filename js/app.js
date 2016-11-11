/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import Task from './models/task';
import Catalog from './models/catalog';
import Board from './models/board';

import TaskCollection from './collections/taskCollection';
import CatalogCollection from './collections/catalogCollection';

import BoardView from './views/boardView';

const task1 = new Task({
  name: 'task1',
  description: 'description for task1',
  status: 'todo',
  order: 0,
});
const task2 = new Task({
  name: 'task2',
  description: 'description for task2',
  status: 'todo',
  order: 1,
});
const task3 = new Task({
  name: 'task3',
  description: 'description for task3',
  status: 'todo',
  order: 2,
});
const task4 = new Task({
  name: 'task4',
  description: 'description for task4',
  status: 'inprogress',
  order: 0,
});
const task5 = new Task({
  name: 'task5',
  description: 'description for task5',
  status: 'inprogress',
  order: 1,
});
const task6 = new Task({
  name: 'task6',
  description: 'description for task6',
  status: 'done',
  order: 0,
});

const todoTasks = new TaskCollection([task1, task2, task3]);
const inProgressTasks = new TaskCollection([task4, task5]);
const doneTasks = new TaskCollection([task6]);

const todo = new Catalog({
  tasks: todoTasks,
  title: 'todo',
});
const inProgress = new Catalog({
  tasks: inProgressTasks,
  title: 'inprogress',
});
const done = new Catalog({
  tasks: doneTasks,
  title: 'done',
});

const allCatalogs = new CatalogCollection([todo, inProgress, done]);
const board = new Board({ catalogs: allCatalogs });

new BoardView({
  collection: allCatalogs,
  model: board,
  el: document.querySelector('board'),
});
