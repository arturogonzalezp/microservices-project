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
  try {
    const response = await auth.login(user);
    app.dialog.progress('Please wait', 'Logging in');
    setTimeout(() => {
      app.views.main.router.navigate('/settings/');
      app.dialog.close();
    }, 1000);
  } catch (err) {
    app.dialog.alert(err, 'Unable to sign in');
  }
}

export default LoginController;
