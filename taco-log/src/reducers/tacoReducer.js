import { FETCH_TACOS, ADDDATABASETACOS } from '../actions';

const initialState = {
  tacos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TACOS:
      return {
        ...state,
        tacos: action.payload
      };
    default:
      return state;
  }
};
