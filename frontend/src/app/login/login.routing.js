import LoginController from './login.controller';

const loginRouting = {
  name: 'login',
  path: '/login/',
  template: require('./login.html'),
  on: {
    pageInit: LoginController,
  },
};

export default loginRouting;
