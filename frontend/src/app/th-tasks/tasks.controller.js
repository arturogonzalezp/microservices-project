import app from './../app';
import Dom7 from 'dom7';
import Tasks from '../services/tasks';

const $$ = Dom7;
const tasks = new Tasks();

function TasksController() {
  console.log('Tasks');
  getTasks();

  var notificationClickToClose = app.notification.create({
    icon: '<i class="icon demo-icon">7</i>',
    title: 'Framework7',
    titleRightText: 'now',
    subtitle: 'Notification with close on click',
    text: 'Click me to close',
    closeOnClick: true,
  });

  $$('.open-click-to-close').on('click', function() {
    notificationClickToClose.open();
  });

  $$('.open-add-task').on('click', () => {
    const addTaskDialog = app.dialog.create({
      el: $$('.add-task-dialog'),
      on: {
        opened: () => {
          console.log('Open');
        },
      },
    });

    addTaskDialog.open();

    $$('.save-add-task').on('click', () => {
      console.log('Saved account details');
      addTaskDialog.close();
    });

    $$('.cancel-add-task').on('click', () => {
      console.log('Cancel edit account');
      addTaskDialog.close();
    });
  });

  $$('#create-task').on('click', () => {
    var task = app.form.convertToData('#tasks-form');
    console.log(task);
    newTask(task);
  });
}

function newTask(task) {
  console.log('holaaaa new task');
  console.log(task);
  tasks
    .newTask(task)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('Chingo');
      console.log(error);
    })
    .finally(() => {});
}

function deleteTask(task) {
  tasks.deleteTask(task);
}

function editTask(task) {
  console.log(task);
  tasks
    .updateTask(task)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

async function getTask(taskId) {
  const response = await tasks
    .getTask(taskId)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
  return response;
}

function getTasks() {
  tasks
    .getTasks()
    .then(response => {
      readTasks(response);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {});
}

function readTasks(response) {
  console.log('response');
  let parsedResponse = JSON.parse(response);
  console.log(parsedResponse.data);
  for (let myTask in parsedResponse.data) {
    let task = parsedResponse.data[myTask];
    let date = task.due_date;
    let newDate = new Date(date).toString();
    let splitNewDate = newDate.split(' ');
    let formatedDate = splitNewDate[0] + ' ' + splitNewDate[1] + ' ' + splitNewDate[2]; 
    let taskCard = $$(`<div class="card">
        <div class="card-header bg-color-gray">
        ${task.title}
        <button class="button open-edit-task id-${task.id}">
          editar
        </button>
        <button class="button delete-task id-${task.id}">
          Borrar
        </button>
        </div>
        <div class="card-body">
          <p> ${task.description}</p>
          <p> Due date: ${formatedDate}</p>
        </div>
      </div>
      `);
    $$('.cards-container').append(taskCard);
  }

  $$('.delete-task').on('click', ev => {
    let id = ev.toElement.classList[2].split('-')[1];
    getTask(id)
      .then(response => {
        const parsedResponse = JSON.parse(response);
        deleteTask(parsedResponse.data[0]);
      })
      .catch(error => {});
  });
  $$('.open-edit-task').on('click', ev => {
    console.log('edit');
    var id = ev.toElement.classList[2].split('-')[1];
    const editTaskDialog = app.dialog.create({
      el: $$('.edit-task-dialog'),
      on: {
        opened: () => {
          console.log('Open');
        },
      },
    });

    editTaskDialog.open();

    $$('.save-edit-task').on('click', () => {
      console.log('Saved account details');
      editTaskDialog.close();
    });

    $$('.cancel-edit-task').on('click', () => {
      console.log('Cancel edit account');
      editTaskDialog.close();
    });

    $$('.edit-task').on('click', ev => {
      getTask(id)
        .then(response => {
          const parsedResponse = JSON.parse(response);
          const newTask = parsedResponse.data[0];
          delete newTask.title;
          delete newTask.description;
          delete newTask.due_date;
          delete newTask.reminder_date;
          var task = app.form.convertToData('#edit-tasks-form');
          console.log(task);
          newTask.title = task.title;
          newTask.description = task.description;
          newTask.due_date = task.due_date;
          newTask.reminder_date = task.reminder_date;
          console.log(newTask);
          editTask(newTask);
        })
        .catch(error => {});
    });
  });
}

export default TasksController;
