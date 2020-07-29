import { GET_PLACES } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case GET_PLACES:
            return action.payload || false;
        default:
            return state;
    }
}