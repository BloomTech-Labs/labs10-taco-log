//start dispatching actions here

//async dispatch example
// export const fetchData = () => dispatch => {
//     axios
//       .get('http://localhost:5000/api/friends')
//       .then(res => dispatch({ type: FETCH_DATA, payload: res.data }))
//       .catch(err => dispatch({ type: FETCH_ERROR, payload: err }));
//   };
//synchronus data example
// export const addTodo = todoObj => {
//     return {
//         type: ADD_TODO,
//         payload: todoObj
//       };
//     };

import { FETCH_TACOS, ADDDATABASE_TACOS } from './tacoActions';
import { GET_USER, CREATE_USER, loginUser, ASSIGN_ACHIEVEMENT, UPDATE_STATS, logTaco, DELETE_TACO, deleteTaco } from './userActions'

export { FETCH_TACOS, ADDDATABASE_TACOS, GET_USER, CREATE_USER, loginUser, ASSIGN_ACHIEVEMENT, UPDATE_STATS, logTaco, DELETE_TACO, deleteTaco };
