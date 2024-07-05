const { MongoClient } = require("mongodb");

let _db ;

const mongoConnect = () => {
  MongoClient.connect(
    'mongodb+srv://uzomanwanne:uzomanwanne@cluster0.nlsnhtn.mongodb.net/webapp'
  )
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