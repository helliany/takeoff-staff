import * as axios from "axios";

const instance = axios.create({
  // baseURL: 'url',
});

export const authAPI = {
  login(username, password) {
    return instance.post('url', { username, password })
      .catch((error) => {
        console.warn('Error :(');
      });
  },
  logout() {
    return instance.delete(`url`);
  }
}

export const contactsAPI = {
  getContacts() {
    return instance.get('url', {
      headers: {Authorization: `Token ${localStorage.getItem('token')}`}
    })
      .then(response => {
        return response.data;
      })
      .catch((error) => {
        console.warn(error);
        localStorage.removeItem('token');
      });
  }
}
