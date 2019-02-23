import axios from "axios";
// import { firebase, provider } from '../firebase/firebase';

export const GET_USER = "GET_USER";
export const CREATE_USER = "CREATE_USER";
export const ASSIGN_ACHIEVEMENT = "ASSIGN_ACHIEVEMENT";
export const UPDATE_STATS = "UPDATE_STATS";
export const DELETE_TACO = "DELETE_TACO";

const local = "http://localhost:5000/";
const heroku = "https://tacobe.herokuapp.com/";
const url = heroku;

export const loginUser = user => dispatch => {
  axios
    .get(`${url}api/users`)
    .then(res => {
      let post = true;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].ext_user_id === user.ext_user_id) {
          axios
            .get(`${url}api/users/${res.data[i].internal_id}`)
            .then(res => {
              dispatch({ type: GET_USER, payload: res.data });
            })
            .catch(err => {
              console.log(err);
            });
          post = false;
        }
      }
      if (post) {
        axios
          .post(`${url}api/users`, user)
          .then(res => {
            const stats = { user_id: res.data.internal_id };
            axios
              .post(`${url}api/user_stats`, stats)
              .then(res => {
                dispatch({ type: CREATE_USER, payload: res.data });
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const logTaco = (taco, header) => dispatch => {
  axios
    .post(`${url}api/tacos`, taco, header)
    .then(res => {
      const stats = {
        tacos_logged: res.data.taco_logs.length
      };

      axios
        .put(`${url}api/user_stats/${res.data.internal_id}`, stats, header)
        .then(res => {
          if (res.data.stats[0].tacos_logged >= 5) {
            const achievement = {
              user_id: res.data.internal_id,
              achievement_id: 2
            };
            axios
              .post(`${url}api/user_achievements`, achievement, header)
              .then(res => {
                dispatch({ type: ASSIGN_ACHIEVEMENT, payload: res.data });
              })
              .catch(err => {
                console.log(err);
              });
          }
          dispatch({ type: UPDATE_STATS, payload: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteTaco = (id, user) => dispatch => {
  axios
    .delete(`${url}api/tacos/${id}`, { data: { user } })
    .then(res => {
      dispatch({ type: DELETE_TACO, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};
