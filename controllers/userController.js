
const getDB = require("../utils/database").getDB;

const getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await getDB().collection("users").findOne({ id });
  if (user) {
    // a 200 response is sent when things have gone successfully
    res.status(200).send(user);
  } else {
    // a 400 request means a request has been made that cannot be carried out
    // basically this an error on the user part and their query needs to be modified
    res.status(400).send({ error: "No user found" });
  }
};

const updateUser = async (req, res, next) => {
  const { id, name, email } = req.body;
  const db = getDB();
  const result = await db
    .collection("users")
    .updateOne(
      { id: id },
      { $set: { name: name, email: email } },
      { upsert: true }
    );
  if (result) {
    res.status(200).send({ user: result });
    console.log(result);
  } else {
    res.status(400).send({ error: "No user found" });
  }
};

const removeUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await getDB().collection("users").findOne({ id });
  if (user) {
    const result = await getDB().collection("users").deleteOne({ id });
    if (result) {
      res.status(200).send({ message: `User with id: ${id} removed` });
    } else {
      res.status(400).send({ error: "User remove not successful" });
    }
  } else {
    res.status(400).send({ error: "No user found" });
  }
};

const createUser = (req, res, next) => {
  const { id, name, email } = req.body;
  const db = getDB();
  db.collection("users")
    .insertOne({ id, name, email })
    .then((result) =>
      res
        .status(200)
        .send({ message: `User with ID ${id} inserted`, result: result })
    )
    .catch((err) => res.status(400).send({ message: "Error creating user" }));
};

module.exports = {
  getUser,
  updateUser,
  removeUser,
  createUser,
};
