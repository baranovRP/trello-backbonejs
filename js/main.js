Backbone.$ = $;

const todos = [
  { id: 1, done: false, text: 'Решить все задания 4 модуля' },
  { id: 2, done: true, text: 'Заплатить за 5 модуль' },
  { id: 3, done: false, text: 'Победить лень' },
  { id: 4, done: false, text: 'Захватить мир' },
];

class Task extends Backbone.Model {
  toggleDone() {
    this.set('done', !this.attributes.done);
  }
}

class TaskCollection extends Backbone.Collection {
  initialize() {
    this.model = Task;
    this.url = 'http://jsonplaceholder.typicode.com/users'
  }
}

const myTodos = new TaskCollection();
// setTimeout(() => myTodos.set(todos), 200);
// setTimeout(() => myTodos.add({ id: 5, done: false, text: 'Новая' }), 1000);

// userService.load().then(data => myTodos.set(data));
myTodos.fetch();

class TodoItemView extends Backbone.View {
  constructor(config) {
    super(Object.assign(
      {
        tagName: 'li',
        events: {
          'click input': 'toggleState'
        }
      },
      config
    ));

    this.model.on('change', () => this.render());
  }

  toggleState() {
    this.model.toggleDone();
  }

  render() {
    // const { text, done } = this.model.attributes;
    const { username, done } = this.model.attributes;
    // console.log('123', text);
    console.log('123', username);
    // this.$el.html(text);
    this.$el.html(username);
    this.el.className = done ? 'done' : '';
    this.$el.append($('<input type="checkbox">')
      .prop('checked', done));
    return this.$el;
  }
}

class TodoView extends Backbone.View {
  initialize() {
    this.collection.on('update', () => this.render());
    this.render();
  }

  render() {
    const result = [];
    this.$el.empty();
    this.$el.append(
      this.collection.map(todo => {
        const view = new TodoItemView({ model: todo });
        return view.render();
      })
    );
  }
}

const myView = new TodoView({
  el: document.querySelector('todos'),
  collection: myTodos,
});
