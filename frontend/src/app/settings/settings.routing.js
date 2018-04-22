import SettingsController from './settings.controller';

const settingsRouting = {
  name: 'settings',
  path: '/settings/',
  template: require('./settings.html'),
  on: {
    pageInit: SettingsController,
  },
};

export default settingsRouting;
