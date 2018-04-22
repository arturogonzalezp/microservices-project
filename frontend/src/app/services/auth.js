import Framework7 from 'framework7';

export default class Auth {
  constructor() {
    this.API_URL = 'http://192.168.0.5:4001';
  }

  async register(user) {
    const promise = new Promise((resolve, reject) => {
      Framework7.request.post(
        `${this.API_URL}/account`,
        user,
        (data, status, xhr) => {
          delete user.password;
          localStorage.setItem('user', JSON.stringify(user));
          resolve(xhr);
        },
        (xhr, status) => {
          reject(xhr.responseText);
        },
      );
    });
    let response = await promise;
    return response;
  }

  getUser() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return null;
    }
  }

  async login(user) {
    let promise = new Promise((resolve, reject) => {
      return Framework7.request.post(
        `${this.API_URL}/login`,
        user,
        (data, status, xhr) => {
          const userObj = JSON.parse(data);
          delete userObj.password;
          localStorage.setItem('user', JSON.stringify(userObj));
          resolve(xhr);
        },
        (xhr, status) => {
          reject(xhr.responseText);
        },
      );
    });
    let response = await promise;
    return response;
  }

  logout() {
    localStorage.removeItem('user');
  }
}
