import Framework7 from 'framework7';
import 'framework7/dist/css/framework7.min.css';
import registerRouting from './register/register.routing';
import loginRouting from './login/login.routing';

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
  routes: [loginRouting, registerRouting],
});

const mainView = app.views.create('.view-main');

export default app;
