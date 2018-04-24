import Framework7 from 'framework7';
import Auth from './auth';

export default class Habits {
  constructor() {
    this.auth = new Auth();
    this.API_URL = 'http://192.168.0.5:4002';
  }
}
