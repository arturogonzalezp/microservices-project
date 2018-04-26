import app from './../app';
import Dom7 from 'dom7';
import Habits from '../services/habits';

const $$ = Dom7;
const habits = new Habits();
var router = null;

function HabitsController() {
  router = app.views.main.router;
  console.log('Habits');
  getHabits();

  $$('.open-add-habit').on('click', () => {
    const addHabitDialog = app.dialog.create({
      el: $$('.add-habit-dialog'),
      on: {
        opened: () => {
          console.log('Open');
        },
      },
    });

    addHabitDialog.open();

    $$('.save-add-habit').on('click', () => {
      console.log('Saved account details');
      addHabitDialog.close();
    });

    $$('.cancel-add-habit').on('click', () => {
      console.log('Cancel edit account');
      addHabitDialog.close();
    });
  });

  $$('#create-habit').on('click', () => {
    var habit = app.form.convertToData('#habits-form');
    console.log(habit);
    newHabit(habit);
  });
}

function newHabit(habit) {
  habits
    .newHabit(habit)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      router.refreshPage();
    });
}

function deleteHabit(habit) {
  habits
    .deleteHabit(habit)
    .then(response => {
      router.refreshPage();
    })
    .catch(() => {})
    .finally();
}

function upVote(habit) {
  console.log(habit);
  habits
    .upVote(habit)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

function downVote(habit) {
  console.log(habit);
  habits
    .downVote(habit)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

function editHabit(habit) {
  console.log(habit);
  habits
    .updateHabit(habit)
    .then(response => {
      console.log(response);
      router.refreshPage();
    })
    .catch(error => {
      console.log(error);
    });
}

async function getHabit(habitId) {
  const response = await habits
    .getHabit(habitId)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
  return response;
}

function getHabits() {
  habits
    .getHabits()
    .then(response => {
      readHabits(response);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {});
}

function readHabits(response) {
  let parsedResponse = JSON.parse(response);
  var color = '';
  console.log(parsedResponse.habits);
  parsedResponse.habits.forEach(habit => {
    if (habit.score < 0) {
      color = 'red';
    } else if (habit.score < 10 && habit.score >= 0) {
      color = 'orange';
    } else if (habit.score < 40 && habit.score >= 10) {
      color = 'yellow';
    } else if (habit.score < 50 && habit.score >= 40) {
      color = 'green';
    } else if (habit.score >= 50) {
      color = 'blue';
    }

    let habitCard = $$(
      `<div class="card">
        <div class="card-header bg-color-${color}">
        <h4>${habit.title}</h4>
        </div>
        <div class="card-footer">
          <div class="row">
            <button class="button open-edit-Habit id-${
              habit.id
            } col color-gray">
              <i class="icon icon-fill f7-icons">gear_fill</i>
            </button>
            <button class="button delete-Habit id-${habit.id} col color-red">
              <i class="icon icon-fill f7-icons">close</i>
            </button>
          </div>
          <div class="row">
            <button class="col button button-fill color-${color} id-${
        habit.id
      } upScore-Habit">
              <i class="icon icon-fill f7-icons">arrow_up</i>
            </button>
            <div class="padding"></div>
            <button class="col button button-fill color-${color} id-${
        habit.id
      } downScore-Habit">
              <i class="icon icon-fill f7-icons">arrow_down</i>
            </button>
          </div>
        </div>
      </div>
      `,
    );
    $$('.cards-container').append(habitCard);
  });
  $$('.downScore-Habit').on('click', ev => {
    let id = ev.toElement.classList[2].split('-')[1];
    getHabit(id)
      .then(response => {
        const parsedResponse = JSON.parse(response);
        downVote(parsedResponse[0]);
      })
      .catch(error => {});
  });
  $$('.upScore-Habit').on('click', ev => {
    let id = ev.toElement.classList[2].split('-')[1];
    getHabit(id)
      .then(response => {
        const parsedResponse = JSON.parse(response);
        upVote(parsedResponse[0]);
      })
      .catch(error => {});
  });
  $$('.delete-Habit').on('click', ev => {
    let id = ev.toElement.classList[2].split('-')[1];
    getHabit(id)
      .then(response => {
        const parsedResponse = JSON.parse(response);
        deleteHabit(parsedResponse[0]);
      })
      .catch(error => {});
  });

  $$('.open-edit-Habit').on('click', ev => {
    console.log('edit');
    console.log(ev);
    let id = ev.toElement.classList[2].split('-')[1];
    console.log(id);
    const editHabitDialog = app.dialog.create({
      el: $$('.edit-habit-dialog'),
      on: {
        opened: () => {
          console.log('Open');
        },
      },
    });

    editHabitDialog.open();

    $$('.save-edit-habit').on('click', () => {
      console.log('Saved account details');
      editHabitDialog.close();
    });

    $$('.cancel-edit-habit').on('click', () => {
      console.log('Cancel edit account');
      editHabitDialog.close();
    });

    $$('.edit-habit').on('click', ev => {
      getHabit(id)
        .then(response => {
          console.log(id);
          console.log(response);
          const parsedResponse = JSON.parse(response);
          var habit = app.form.convertToData('#edit-habits-form');
          parsedResponse[0].title = habit.title;
          parsedResponse[0].difficulty = habit.difficulty;
          parsedResponse[0].type = habit.type;
          console.log(parsedResponse[0]);
          editHabit(parsedResponse[0]);
        })
        .catch(error => {});
    });
  });
}

export default HabitsController;
