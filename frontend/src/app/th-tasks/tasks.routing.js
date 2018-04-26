import TasksController from './tasks.controller';

const tasksRouting = {
  name: 'tasks',
  path: '/tasks/',
  on: {
    pageInit: TasksController,
  },
  template: require('./tasks.html'),
};

export default tasksRouting;
