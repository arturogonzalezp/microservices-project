import HabitsController from './habits.controller';

const habitsRouting = {
  name: 'habits',
  path: '/habits/',
  on: {
    pageInit: HabitsController,
  },
  template: require('./habits.html'),
};

export default habitsRouting;
