import app from './../app';
import Dom7 from 'dom7';
import Habits from '../services/habits';

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

function readTasks(response) {
  var color = "";
  for(var habit in response){
    if(habit.score < 0){
      color = "red";
    }else if(habit.score < 10 && habit.score >= 0){
      color = "orange";
    }else if(habit.score < 40 && habit.score >= 10){
      color = "yellow";
    }
    else if(habit.score < 50 && habit.score >= 40){
      color = "green";
    }
    else if(habit.score >= 50){
      color = "blue";
    }
    $$('.cards-container').append(
      "<div class='card'> <div class='card-header bg-color-"+color+"'>"+habit.title+"</div><div class='card-footer'><div class='card-footer segmented'><button class='button color-"+color+"'><i class='icon icon-fill f7-icons ios-only'>arrow_up</i></button><button class='button color-red'><i class='icon icon-fill f7-icons ios-only'>arrow_down</i></button></div></div></div>"
    );
  }
}

function getHabits() {
  habits
    .getHabits()
    .then(response => {
      console.log(response);
      readTasks(response);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {});
}

export default HabitsController;
