import Framework7 from 'framework7';
import Auth from './auth';

export default class Habits {
  constructor() {
    this.auth = new Auth();
    this.API_URL = 'http://192.168.1.72:4002';
  }

  async getHabit(habitId) {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request.get(
        `${this.API_URL}/user/${user.email}/habits/${habitId}`,
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

  async getHabits() {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request.get(
        `${this.API_URL}/user/${user.email}/habits`,
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

  async getAdminHabits() {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request.get(
        `${this.API_URL}/user/habits`,
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

  async newHabit(habit) {
    console.log('NEW HABIIIIIIT');
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request.post(
        `${this.API_URL}/user/${user.email}/habits`,
        habit,
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

  async updateHabit(habit) {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request.put(
        `${this.API_URL}/user/${user.email}/habits/${habit.id}`,
        habit,
        (data, status, xhr) => {
          resolve(xhr);
        },
        (xhr, status) => {
          reject(xhr.responseText);
        },
      );
    });
  }

  async deleteHabit(habit) {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request.delete(
        `${this.API_URL}/user${user.email}/habits/${habit.id}`,
        habit,
        (data, status, xhr) => {
          resolve(xhr);
        },
        (xhr, status) => {
          reject(xhr.responseText);
        },
      );
    });
  }

  async deleteHabit(habit) {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request({
        url: `${this.API_URL}/user${user.email}/habits`,
        method: 'DELETE',
        habit,
        success: (data, status, xhr) => {
          resolve(xhr);
        },
        error: (xhr, status) => {
          reject(xhr.responseText);
        },
      });
    });
    let response = await promise;
    return promise;
  }

  async upVote(habit) {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request({
        url: `${this.API_URL}/user/${user.email}/habits/${habit.id}/score/add`,
        method: 'PATCH',
        habit,
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

  async downVote(habit) {
    const user = this.auth.getUser();
    const promise = new Promise((resolve, reject) => {
      Framework7.request({
        url: `${this.API_URL}/user/${user.email}/habits/${habit.id}/score/subtract`,
        method: 'PATCH',
        habit,
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
