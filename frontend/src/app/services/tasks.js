import Framework7 from 'framework7';
import Auth from './auth';

export default class Tasks {
  constructor() {
    this.auth = new Auth();
    this.API_URL = 'http://localhost:4003';
  }

  async getTask(taskId) {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request.get(
        `${this.API_URL}/task/${taskId}`,
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

  async getTasks() {
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
    console.log(user);
    const promise = new Promise((resolve, reject) => {
      Framework7.request.post(
        `${this.API_URL}/user/${user.email}/task`,
        task,
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

  async updateTask(task) {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request({
        url: `${this.API_URL}/task/${task.id}`,
        method: 'PUT',
        task,
        success: (data, status, xhr) => {
          resolve(data);
        },
        error: (xhr, status) => {
          reject(xhr.responseText);
        },
      });
    });
    let response = await promise;
    return promise;
  }

  async deleteTask(task) {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request({
        url: `${this.API_URL}/task/${task.id}`,
        method: 'DELETE',
        task,
        success: (data, status, xhr) => {
          resolve(data);
        },
        error: (xhr, status) => {
          reject(xhr.responseText);
        },
      });
    });
    let response = await promise;
    return promise;
  }
}
