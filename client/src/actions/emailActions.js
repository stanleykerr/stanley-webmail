import axios from 'axios';
import { GET_EMAILS, DELETE_EMAIL, SEND_EMAIL, EMAILS_LOADING, UPDATE_EMAIL } from './constants';
import Auth from '../modules/auth';

export const getEmails = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/emails', {
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`
    }
  }).then(res => dispatch({ type: GET_EMAILS, payload: res.data }));
};

export const sendEmail = item => dispatch => {
  axios.post('/api/emails/parse', item, {
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`
    }
  }).then(res => dispatch({ type: SEND_EMAIL, payload: res.data }));
};

export const deleteEmail = ids => dispatch => {
  axios.post('/api/emails/delete', {
    data: ids
  }, {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    }).then(res => dispatch({ type: DELETE_EMAIL, payload: ids }));
};

export const updateEmail = data => dispatch => {
  axios.post('/api/emails/update', {
    data: data
  }, {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`
      }
    }).then(res => dispatch({ type: UPDATE_EMAIL, payload: res.data }));
};

export const setItemsLoading = () => {
  return {
    type: EMAILS_LOADING
  };
};