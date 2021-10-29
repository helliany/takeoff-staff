import * as axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

export const authAPI = {
  signup(email, password) {
    return instance.post('/signup', { email, password })
  },
  login(email, password) {
    return instance.post('/login', { email, password })
  }
}

export const contactsAPI = {
  getContacts() {
    return instance.get('/contacts')
      .then(response => {
        return response.data;
      })
  },
  deleteContact(userId) {
    return instance.delete(`/contacts/${userId}`)
  },
  addContact({name, phone, email, address}) {
    return instance.post(`/contacts`, { name, phone, email, address })
  },
  updateContact({id, name, phone, email, address}) {
    return instance.patch(`/contacts/${id}`, { name, phone, email, address })
  }
}
