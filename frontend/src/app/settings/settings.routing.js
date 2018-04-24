import SettingsController from './settings.controller';
import app from '../app';
import Auth from '../services/auth';
const auth = new Auth();
const settingsRouting = {
  name: 'settings',
  path: '/settings/',
  template: require('./settings.html'),
  on: {
    pageInit: SettingsController,
  },
};

export default settingsRouting;
