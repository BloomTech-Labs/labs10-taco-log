const db = require('../dbConfig.js');

module.exports ={
    findUser,
    getUser
      
  
};
function findUser(id){
    if (id){
        return db('users').where({ internal_Id: Number(id)})
    }
    return db('users');
}
async function getUser(id){
    const user = await db('users').where({internal_Id: id})
    const achievements = await db('user_achievements')
        .where({'user_id': id})
        .join('achievements', 'user_achievements.achievement_id', 'achievements.id')
        .select('achievements.title', 'achievements.description')
    const taco_logs = await db('taco-log').where({user_id: id})
    const { name, internal_id, username, email, ext__user_id } = user[0];
    const result = {
        internal_id, username, name, email, ext__user_id, taco_logs, achievements
    }
    return result;
}

