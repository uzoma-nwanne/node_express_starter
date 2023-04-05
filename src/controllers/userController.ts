import { Request, Response } from "express";

type UserTable = {
  [key: string]: {
    name: string;
    email: string;
    id?: string | number;
  };
};

// in production we would use an actual database
// this object will act as temporary storage for our user object
const EPHEMERAL_DB: UserTable = {};

const getUser = (req: Request, res: Response) => {
  const { id } = req.params;

  if (EPHEMERAL_DB[id]) {
    // a 200 response is sent when things have gone successfully
    res.status(200).send({ user: { id, ...EPHEMERAL_DB[id] } });
  } else {
    // a 400 request means a request has been made that cannot be carried out
    // basically this an error on the user part and their query needs to be modified
    res.status(400).send({ error: "No user found" });
  }
};

const updateUser = (req: Request, res: Response) => {
  const { id, name, email } = req.body;

  if (EPHEMERAL_DB[id]) {
    EPHEMERAL_DB[id] = {
      ...EPHEMERAL_DB[id],
      ...{
        name: name || EPHEMERAL_DB[id].name,
        email: email || EPHEMERAL_DB[id].email,
      },
    };
    res.status(200).send({ user: { id, ...EPHEMERAL_DB[id] } });
  } else {
    res.status(400).send({ error: "No user found" });
  }
};

const removeUser = (req: Request, res: Response) => {
  const { id } = req.params;

  if (EPHEMERAL_DB[id]) {
    delete EPHEMERAL_DB[id];
    res.status(200).send({ message: `User with id: ${id} removed` });
  } else {
    res.status(400).send({ error: "No user found" });
  }
};

const createUser = (req: Request, res: Response) => {
  const { id, name, email } = req.body;

  EPHEMERAL_DB[id] = { name, email };

  res.status(200).send({ user: { id, ...EPHEMERAL_DB[id] } });
};

export { getUser, updateUser, removeUser, createUser };
