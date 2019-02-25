import {
  GET_USER,
  CREATE_USER,
  ASSIGN_ACHIEVEMENT,
  UPDATE_STATS,
  DELETE_TACO
} from "../actions";

const initialState = {
  user: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case CREATE_USER:
      return {
        ...state,
        user: action.payload
      };
    case ASSIGN_ACHIEVEMENT:
      return {
        ...state,
        user: action.payload
      };
    case UPDATE_STATS:
      return {
        ...state,
        user: action.payload
      };
    case DELETE_TACO:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
