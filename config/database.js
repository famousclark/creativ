const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/ur-eats',
  secretOrKey: "secret",
  port: process.env.PORT || 3001,
  basename: process.env.basename || ''
    //'url' : 'mongodb://127.1.1.0/express' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

     //Please replace your host file Here : 127.1.1.0 , Express is Collection Name (Database Name)
  
};
module.exports = config;
