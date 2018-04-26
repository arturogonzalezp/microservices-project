import Framework7 from 'framework7';
import Auth from './auth';

export default class Tasks {
  constructor() {
    this.auth = new Auth();
    this.API_URL = 'http://localhost:4003';
  }

  async getTasks() {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request.get(
        `${this.API_URL}/user/${user.email}/tasks`,
        (data, status, xhr) => {
          resolve(data);
        },
        (xhr, status) => {
          reject(xhr.responseText);
        },
      );
    });
    const response = await promise;
    return response;
  }

  async getAdminTasks() {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request.get(
        `${this.API_URL}/user/${user.email}/task`,
        (data, status, xhr) => {
          resolve(data);
        },
        (xhr, status) => {
          reject(xhr.responseText);
        },
      );
    });
    const response = await promise;
    return response;
  }

  async newTask(task) {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request.post(
        `${this.API_URL}/user/${user.email}/task`,
        task,
        (data, status, xhr) => {
          resolve(xhr);
        },
        (xhr, status) => {
          reject(xhr.responseText);
        },
      );
    });
  }

  async updateTask(task) {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request.put(
        `${this.API_URL}/task/${task.id}`,
        task,
        (data, status, xhr) => {
          resolve(xhr);
        },
        (xhr, status) => {
          reject(xhr.responseText);
        },
      );
    });
  }

  async deleteTask(task) {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request.delete(
        `${this.API_URL}/task/${task.id}`,
        task,
        (data, status, xhr) => {
          resolve(xhr);
        },
        (xhr, status) => {
          reject(xhr.responseText);
        },
      );
    });
  }
}
