import axios from 'axios';
import { FETCH_USER } from './types';
import { GET_PLACES } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const getPlaces = () => async dispatch => {
    const res = await axios.get('/facilities');

    dispatch({ type: GET_PLACES, payload: res.data });
};