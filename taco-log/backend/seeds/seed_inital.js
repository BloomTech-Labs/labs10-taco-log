const faker = require("faker");
const createFakerUser = () =>({
  username: faker.internet.userName(),
  password: faker.internet.password(),
  department: "User",
  email: faker.internet.email()
})
exports.seed = async function(knex, Promise) {
  // Users
  const fakeUsers = [];
  const desiredFakeUsers = 499;
  for(let i=0;i<desiredFakeUsers;i++){
    fakeUsers.push(createFakerUser());
  }

  await knex("users")
  .insert(fakeUsers)
};
