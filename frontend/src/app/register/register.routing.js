import RegisterController from './register.controller';

const registerRouting = {
  name: 'register',
  path: '/register/',
  template: require('./register.html'),
  on: {
    pageInit: RegisterController,
  },
};

export default registerRouting;
