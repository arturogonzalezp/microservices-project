import app from './../app';
import Dom7 from 'dom7';
import Tasks from '../services/tasks';

const $$ = Dom7;
const habits = new Habits();

function HabitsController() {
  console.log('Habits');
  getHabits();
}

function registerHabit(evt, page) {
  $$('.create-habit').on('click', () => {
    var habit = app.form.convertToData('#habits-form');
    addHabit(habit);
  });
}

function addHabit(habit) {
  habits.addHabit(habit);
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
  $$('.delete-habit').on('click', () => {
    deleteHabit(habit);
  });
}

function deleteHabit(habit) {
  habits.deleteHabit(habit);
}

function addScore(evt, page) {
  $$('.upScore-habit').on('click', () => {
    upVote(habit);
  });
}

function upVote(habit) {
  habits.upVote(habit);
}

function substractScore(evt, page) {
  $$('.downScore-habit').on('click', () => {
    downVote(habit);
  });
}

function downVote(habit) {
  habits.downVote(habit);
}

function getHabits() {
  habits
    .getHabits()
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {});
}

export default HabitsController;
