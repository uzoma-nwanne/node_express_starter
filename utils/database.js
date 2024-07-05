const { MongoClient } = require("mongodb");

let _db ;

const mongoConnect = () => {
  MongoClient.connect(
    `${process.env.MONGO_URI}`
  ) //I did not use .env so that it will be easy for someone to help me out
    .then((client) => {
      console.log("Connected to MongoDB");
      _db = client.db()
    })
    .catch((err) => console.log(err));
};

const getDB = ()=>{
    if(_db){
        return _db
    }
    throw 'No database found'
}
exports.mongoConnect = mongoConnect
exports.getDB = getDB