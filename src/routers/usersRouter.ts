import express, { Request, Response } from 'express';

import { User } from '../misc/types/User';
import { PasswordReset, PasswordUpdte } from '../misc/types/Password';

let users: User[] = [
  {
    ID: "0",
    firstName: "Ganesh",
    lastName: "Poudel",
    email: "ganesh@mail.com",
    userName: "Ganesh",
    password: "GaneshPassword"
  },
  {
    ID: "1",
    firstName: "Roshan",
    lastName: "Bist",
    email: "roshan@mail.com",
    userName: "Roshan",
    password: "RoshanPassword"
  },
  {
    ID: "2",
    firstName: "Woong",
    lastName: "Shin",
    email: "woong@mail.com",
    userName: "Woong",
    password: "WoongPassword"
  },
];

const findUserIndex = (userId: string): number => {
  return users.findIndex((user: User) => user.ID === userId);
}

const findUserIndexByName = (userName: string): number => {
  return users.findIndex((user: User) => user.userName === userName);
}

const router = express.Router();

// #Ganesh
// Get all users
router.get("/", (request: Request, response: Response) => {
  response.status(200).json(users);
});

// #Ganesh
// Get single user
router.get("/:userId", (request: Request, response: Response) => {
  const userId = request.params.userId;
  const user = users.find((user: User) => {
    return user.ID === userId;
  });
  response.status(200).json(user);
});

// #Ganesh
// Create a new user
router.post("/", (request: Request, response: Response) => {
  const newUser: User = request.body;
  if (newUser) {
    newUser.ID = `${users.length}`;
    users.push(newUser);
  }
  
  response.status(201).json(newUser);
});

// #Ganesh
// Delete user
router.delete("/:userId", (request: Request, response: Response) => {
  const userId = request.params.userId;
  users = users.filter((item) => {
    return item.ID !== userId;
  });
  response.sendStatus(204);
});

// #Ganesh
// Check the mail
router.post("/is-available", (request: Request, response: Response) => {
  const emailParams = request.body.email;
  console.log("email ", emailParams);
  let isAvailiable = false;
  isAvailiable = users.some((item) => {
    return item.email === emailParams;
  });
  response.status(200).json({ isAvailiable: !isAvailiable });
});

// #Woong
// Update user profile
router.put("/:userId", (request: Request, response: Response) => { 
  const userId: string = request.params.userId;
  const userInfo: User = request.body;

  if (userId) {
    const matchedIndex: number = findUserIndex(userId);
    if (matchedIndex > -1) {
      users[matchedIndex].email = userInfo.email;
      users[matchedIndex].firstName = userInfo.firstName;
      users[matchedIndex].lastName = userInfo.lastName;
      
      return response.status(200).json(users[matchedIndex]);
    }
  } 
  
  return response.status(404).json({ message: "Not valid user"});
});

// #Woong
// Forget password request
router.post("/forgetPassword", (request: Request, response: Response) => { 
  const resetPasswordInfo: PasswordReset = request.body;
  if (resetPasswordInfo) {
    const matchedUser: User | undefined = users.find((user: User) => user.email === resetPasswordInfo.userEmail);
    if (matchedUser) {
      matchedUser.password = "0000";
      return response.status(200).json({ message: "Reset password successfully"});
    }

    return response.status(404).json({ message: "User is not exsited! Check the user email again!" })
  }

  return response.status(400).json({ message: "Password infomation is not valid"})
});

// #Woong
// Change password
router.post("/changePassword", (request: Request, response: Response) => { 
  const passwordInfo: PasswordUpdte = request.body;

  if (passwordInfo) {
    const matchedIndex: number = findUserIndexByName(passwordInfo.userName);
    if (matchedIndex > -1) {
      const existedUser: User = users[matchedIndex];
      if (existedUser && existedUser.password === passwordInfo.oldPassword) {
        existedUser.password = passwordInfo.newPassword;
        users[matchedIndex] = existedUser;

        return response.status(200).json({ message: "The password successfully changed!" });
      } 
      
      return response.status(404).json({ message: "The password is wrong!" });
    } 
  }
  
  return response.status(400).json({ message: "Not valid ino provided!" });
});

export default router;