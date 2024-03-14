import express, { Request, Response } from "express";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  avatar: string;
  address: string;
};

type Email = {
  email: string;
};

let users: User[] = [
  {
    id: "1",
    name: "Ganesh",
    email: "user1@mail.com",
    password: "user1pasword",
    role: "admin",
    avatar: "user1Avatar",
    address: "user1Address",
  },
  {
    id: "2",
    name: "Rohan",
    email: "user2@mail.com",
    password: "user2pasword",
    role: "admin",
    avatar: "user2Avatar",
    address: "user2Address",
  },
  {
    id: "3",
    name: "Woong",
    email: "user3@mail.com",
    password: "user3pasword",
    role: "admin",
    avatar: "user3Avatar",
    address: "user3Address",
  },
];

const PORT = 8080;

const router = express.Router();

// Get all users
router.get("", (request: Request, response: Response) => {
  response.status(200).json(users);
});

// get single user
router.get("/:userId", (request: Request, response: Response) => {
  const userId = request.params.userId;
  const user = users.find((user) => {
    return user.id === userId;
  });
  response.status(200).json(user);
});

// create a new user
router.post("", (request: Request, response: Response) => {
  const newUser = request.body;
  console.log(newUser);
  users.push(newUser);
  response.status(201).json(newUser);
});

// Delete user
router.delete("/:userId", (request: Request, response: Response) => {
  const userId = request.params.userId;
  users = users.filter((item) => {
    return item.id !== userId;
  });
  response.sendStatus(204);
  console.log(users);
});

// Update user
router.put("/:userId", (request: Request, response: Response) => {
  const userId = request.params.userId;
  const userContent = request.body;
  const findUser = users.find((item) => {
    return item.id === userId;
  });
  users = users.map((item) => {
    if (item.id === userId) {
      return Object.assign({}, item, userContent);
    }
    return item;
  });
  response.status(201).json(users);
});

// check the mail
router.post("/is-available", (request: Request, response: Response) => {
  const emailParams = request.body.email;
  console.log("email ", emailParams);
  let isAvailiable = false;
  isAvailiable = users.some((item) => {
    return item.email === emailParams;
  });
  response.status(200).json({ isAvailiable: !isAvailiable });
});

export default router;
