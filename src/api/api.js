import * as axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

export const authAPI = {
  signup(email, password) {
    return instance.post('/signup', { email, password })
      .catch((error) => {
        console.warn('Error :(');
      });
  },
  login(email, password) {
    return instance.post('/login', { email, password })
      .catch((error) => {
        console.warn('Error :(');
      });
  }
}

export const contactsAPI = {
  getContacts() {
    return instance.get('/contacts')
      .then(response => {
        return response.data;
      })
      .catch((error) => {
        console.warn(error);
        localStorage.removeItem('token');
      });
  },
  deleteContact(userId) {
    return instance.delete(`/contacts/${userId}`)
  },
  addContact({name, phone, email, company, address}) {
    return instance.post(`/contacts`, { name, phone, email, address })
  }
}
