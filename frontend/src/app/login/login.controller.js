import Dom7 from 'dom7';
const $$ = Dom7;
import app from './../app';
import Auth from '../services/auth';

function LoginController(evt, page) {
  console.log('SignIn Controller');
  $$('.login-button').on('click', () => {
    const user = app.form.convertToData('#login-form');
    login(user);
  });
}

async function login(user) {
  const auth = new Auth();
  app.dialog.progress('Please wait', 'Logging in');
  try {
    const response = await auth.login(user);
    app.dialog.close();
    app.views.main.router.navigate('/settings/');
  } catch (err) {
    app.dialog.close();
    app.dialog.alert(err, 'Unable to sign in');
  }
}

export default LoginController;
