import Dom7 from 'dom7';
const $$ = Dom7;
import app from './../app';
import Auth from './../services/auth';

function RegisterController(evt, page) {
  $$('.create-habit').on('click', () => {
    var habit = app.form.convertToData('#register-form');
    createUser(user);
  });
}

function createUser(user) {
  const auth = new Auth();
  auth
    .register(user)
    .then(response => {
      app.views.main.router.navigate('/settings/');
    })
    .catch(error => {
      app.dialog.alert(error, 'Unable to create account');
    })
    .finally(() => {});
}

export default RegisterController;
