import app from './../app';
import Dom7 from 'dom7';
import Habits from '../services/habits';

const $$ = Dom7;
const habits = new Habits();

function HabitsController() {
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
  console.log(habit);
  habits
    .newHabit(habit)
    .then(response => {
      console.log('YEAH');
      console.log(response);
    })
    .catch(error => {
      console.log('Chingo');
      console.log(error);
    })
    .finally(() => {});
}

function alterHabit(evt, page) {
  $$('.update-habit').on('click', () => {
    var habit = app.form.convertToData('#habits-update-form');
    updateHabit(habit);
  });
}

function updateHabit(habit) {
  habits.updateHabit(habit);
}

function removeHabit(evt, page) {
  $$('#delete-habit').on('click', () => {
    deleteHabit(habit);
  });
}

function deleteHabit(habit) {
  habits.deleteHabit(habit);
}

function addScore(evt, page) {
  $$('#upScore-habit').on('click', () => {
    upVote(habit);
  });
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

    let habitCard = $$(`<div class="card">
        <div class="card-header bg-color-${color}">
        ${habit.title}
        <button class="button edit-${habit.id} edit-Habit">
          editar
          </button>
        </div>
        <div class="card-footer">
          <div class="card-footer segmented">
            <button class="button color-${color} id-${habit.id} upScore-Habit">
              <i class="icon icon-fill f7-icons ios-only">arrow_up</i>
            </button>
            <button class="button color-${color} id-${
      habit.id
    } downScore-Habit">
              <i class="icon icon-fill f7-icons ios-only">arrow_down</i>
            </button>
          </div>
        </div>
      </div>
      <div class="dialog edit-habit-dialog">
                    <div class="dialog-inner">
                        <div class="dialog-title">
                            Edit Habit 
                        </div>
                        <div class="dialog-text">
                        </div>
                        <div class="list no-hairlines-md no-hairlines-ios">
                            <form class="list form-store-data" id="edit-habits-form">
                                <ul>
                                    <li class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Habit Title</div>
                                            <div class="item-input-wrap">
                                                <input name="title" type="text" placeholder="New habit name">
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="item-content item-input">
                                        <div class="item-content item-input">
                                            <div class="item-inner">
                                                <div class="item-title item-label">Difficulty</div>
                                                <div class="item-input-wrap">
                                                    <select name="difficulty">
                                                        <option value="easy" selected>Easy</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="hard">Hard</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="item-content item-input">
                                        <div class="item-content item-input">
                                            <div class="item-inner">
                                                <div class="item-title item-label">Type</div>
                                                <div class="item-input-wrap">
                                                    <select name="type">
                                                        <option value="good" selected>Good</option>
                                                        <option value="bad">Bad</option>
                                                        <option value="both">Both</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        <div class="dialog-buttons">
                            <span class="dialog-button cancel-edit-habit">Cancel</span>
                            <span class="dialog-button save-edit-habit" id="edit-habit">Save</span>
                        </div>
                    </div>
                </div>`);
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
  $$('.edit-Habit').on('click', ev => {
    let id = ev.toElement.classList[2].split('-')[1];
    getHabit(id)
      .then(response => {
        const parsedResponse = JSON.parse(response);
        var habit = app.form.convertToData('#edit-habit-form');
        editHabit(parsedResponse[0]);
      })
      .catch(error => {});
  });
}

function editHabit(habitId) {
  const habit = getHabit(habitId);
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

export default HabitsController;
