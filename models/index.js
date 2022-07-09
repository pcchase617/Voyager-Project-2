//the MODEL of the MVC, define all data logic and relations here
// import models
const User = require('./User');
// const Example2 = require('./Example2');
// const Example4 = require('./Example4');
// const Example3 = require('./Example3');

// Users belongsTo Example2
// User.belongsTo(Example2);
// Categories have many Users
// Example2.hasMany(User);
// Users belongToMany Example4s (through Example3)
// User.belongsToMany(Example4, {
//   through: Example3,
//   foreignKey: 'User_id',
// });
// Example4s belongToMany Users (through Example3)
// Example4.belongsToMany(User, {
//   through: Example3,
//   foreignKey: 'Example4_id',
// });

module.exports = {
  User,
  // Example2,
  // Example4,
  // Example3,
};

//import the example model
// const Example = require('./Example');

// Example.hasMany();

// module.exports = { Example };
