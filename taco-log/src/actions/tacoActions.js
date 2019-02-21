export const FETCH_TACOS = 'FETCH_TACOS';
export const ADDDATABASE_TACOS = 'ADDDATABASE_TACOS';

const local = 'http://localhost:5000/';
const heroku = 'https://tacobe.herokuapp.com/';
const link = local;

export const GET_TACO = () => dispatch => {
  axios
    .get(`${link}api/tacos`)
    .then(res => dispatch({ type: FETCH_TACOS, payload: res.data }));
};

export const ADD_TACO = taco => dispatch => {
  axios
    .post(`${link}api/friends`, taco)
    .then(res => dispatch({ type: ADDDATABASE_TACOS, payload: res.data }));
};
