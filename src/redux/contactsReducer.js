import {contactsAPI} from "../api/api";

const SET_CONTACTS = 'SET_CONTACTS';

let initialState = {
  contacts: [],
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS: {
      return {...state, contacts: action.contacts}
    }
    default:
      return state;
  }
}

export const setContacts = (contacts) => ({type: SET_CONTACTS, contacts})

export const requestContacts = () => async (dispatch) => {
  const data = await contactsAPI.getContacts();
  dispatch(setContacts(data));
}

export default contactsReducer;
