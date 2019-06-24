const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/creativ',
  secret: "creativ-proj-secret",
  port: process.env.PORT || 3001,
  roles: ["USER", "ADMIN"],
  basename: process.env.basename || ''
};
module.exports = config;
