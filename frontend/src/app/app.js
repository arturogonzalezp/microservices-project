import Framework7 from 'framework7';
import Dialog from 'framework7/dist/components/dialog/dialog.js';
import Form from 'framework7/dist/components/form/form.js';
import Modal from 'framework7/dist/components/modal/modal.js';
import Panel from 'framework7/dist/components/panel/panel.js';
import 'framework7/dist/css/framework7.min.css';
import 'framework7-icons';
import registerRouting from './register/register.routing';
import loginRouting from './login/login.routing';
import settingsRouting from './settings/settings.routing';
import habitsRouting from './th-habits/habits.routing';
import tasksRouting from './th-tasks/tasks.routing';
import Dom7 from 'dom7';
import Auth from './services/auth';
import notification from 'framework7/dist/components/notification/notification.js';

const $$ = Dom7;
const auth = new Auth();

Framework7.use([Dialog, Form, Modal, notification, Panel]);
const app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    loginRouting,
    registerRouting,
    settingsRouting,
    habitsRouting,
    tasksRouting,
  ],
});

const user = auth.getUser();
const mainView = app.views.create('.view-main');

if (app.initialized) {
  if (!user) {
    mainView.router.navigate('/login/');
  } else {
    const userNameText = $$('.panel-user-name');
    userNameText.text(user.name);
    mainView.router.navigate('/settings/');
  }
}

var leftPanel = app.panel.left;

$$('.open-left-panel').on('click', () => {
  leftPanel.open();
});
$$('.panel.panel-left a').on('click', () => {
  leftPanel.close();
});
$$('.logout-button').on('click', () => {
  auth.logout();
  mainView.router.navigate('/login/');
});

export default app;
