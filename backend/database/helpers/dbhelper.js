const db = require('../dbConfig.js');

module.exports ={
    findUser,
    findByUserId,
  
};
function findUser(){
    return db('users');
}
function findByUserId(id){
    return db('users').where({ internal_Id: Number(id)})
}