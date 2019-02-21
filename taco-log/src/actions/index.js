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
