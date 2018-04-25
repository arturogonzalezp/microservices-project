import app from './../app';
import Dom7 from 'dom7';
import Tasks from '../services/tasks';

const $$ = Dom7;
const tasks = new Tasks();

function TasksController() {
  console.log('Tasks');
  getTasks();
}

function registerTask(evt, page) {
  $$('.create-task').on('click', () => {
    var task = app.form.convertToData('#tasks-form');
    addTask(task);
  });
}

function addTask(task) {
  tasks.addTask(task);
}

function alterTask(evt, page) {
  $$('.update-task').on('click', () => {
    var task = app.form.convertToData('#tasks-update-form');
    updatetask(task);
  });
}

function updatetask(task) {
  tasks.updatetask(task);
}

function removeTask(evt, page) {
  $$('.delete-task').on('click', () => {
    deletetask(task);
  });
}

function deleteTask(task) {
  tasks.deleteTask(task);
}

function getTasks() {
  tasks
    .getTasks()
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {});
}

export default TasksController;
