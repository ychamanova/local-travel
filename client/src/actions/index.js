import axios from 'axios';
import store from '../store';
import { FETCH_USER } from './types';


export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    //the server sends back the user data
    dispatch({ type: FETCH_USER, payload: res.data });
};