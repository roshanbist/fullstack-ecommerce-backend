import { Request, Response } from 'express';

import { User } from '../misc/types/User';
import { PasswordReset, PasswordUpdte } from '../misc/types/Password';

// DB
let users: User[] = [
  {
    id: "0",
    firstName: "Ganesh",
    lastName: "Poudel",
    email: "ganesh@mail.com",
    userName: "Ganesh",
    password: "GaneshPassword"
  },
  {
    id: "1",
    firstName: "Roshan",
    lastName: "Bist",
    email: "roshan@mail.com",
    userName: "Roshan",
    password: "RoshanPassword"
  },
  {
    id: "2",
    firstName: "Woong",
    lastName: "Shin",
    email: "woong@mail.com",
    userName: "Woong",
    password: "WoongPassword"
  },
];

const findUserIndex = (userId: string): number => {
  return users.findIndex((user: User) => user.id === userId);
}

const findUserIndexByName = (userName: string): number => {
  return users.findIndex((user: User) => user.userName === userName);
}

// #Ganesh
export function getUsers(request: Request, response: Response) {
  response.status(200).json(users);
}

// #Ganesh
export function getSingleUser(request: Request, response: Response) {
  const userId = request.params.userId;
  const user = users.find((user: User) => {
    return user.id === userId;
  });
  response.status(200).json(user);
}

// #Ganesh
// Create a new user
export function createNewUser(request: Request, response: Response) {
  const newUser: User = request.body;
  if (newUser) {
    newUser.id = `${users.length}`;
    users.push(newUser);
  }
  
  response.status(201).json(newUser);
}

// #Ganesh
export function deleteUser(request: Request, response: Response) {
  const userId = request.params.userId;
  users = users.filter((item) => {
    return item.id !== userId;
  });
  response.sendStatus(204);
}

// #Ganesh
export function checkEmailAvailable(request: Request, response: Response) {
  const emailParams = request.body.email;
  let isAvailiable = false;
  isAvailiable = users.some((item) => {
    return item.email === emailParams;
  });
  response.status(200).json({ isAvailiable: !isAvailiable });
}

// #Woong
export function updateUser(request: Request, response: Response) {
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
}

// #Woong
export function forgetPassword(request: Request, response: Response) {
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
}

// #Woong
export function changePassword(request: Request, response: Response) {
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
}




