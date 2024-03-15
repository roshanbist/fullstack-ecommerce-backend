import express, { Request, Response } from 'express';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  avatar: string;
  address: string;
};

type ResetPasswordInfo = {
  userEmail: string;
}

type passwordUpdte = {
  username: string;
  oldPassword: string;
  newPassword: string
}

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

const findUserIndex = (userId: string): number => {
  return users.findIndex((user: User) => user.id === userId);
}

const findUserIndexByName = (userName: string): number => {
  return users.findIndex((user: User) => user.name === userName);
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
  const user = users.find((user) => {
    return user.id === userId;
  });
  response.status(200).json(user);
});

// #Ganesh
// Create a new user
router.post("/", (request: Request, response: Response) => {
  const newUser: User = request.body;
  if (newUser) {
    newUser.role = "customer";
    newUser.id = `${users.length + 1}`;
    users.push(newUser);
  }
  
  response.status(201).json(newUser);
});

// #Ganesh
// Delete user
router.delete("/:userId", (request: Request, response: Response) => {
  const userId = request.params.userId;
  users = users.filter((item) => {
    return item.id !== userId;
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
  // Update user profile (first name, last name, email)
  const userId: string = request.params.userId;
  const userInfo: User = request.body;

  if (userId) {
    const matchedIndex: number = findUserIndex(userId);
    if (matchedIndex > -1) {
      users[matchedIndex] = {
        ...users[matchedIndex],
        ...userInfo
      }

      return response.status(201).json(users[matchedIndex]);
    }
  } 
  
  return response.status(404).json({ message: "Not valid user"});
});

// #Woong
// Forget password request
router.post("/forgetPassword", (request: Request, response: Response) => { 
  const resetPasswordInfo: ResetPasswordInfo = request.body;
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
  const passwordInfo: passwordUpdte = request.body;

  if (passwordInfo) {
    const matchedIndex: number = findUserIndexByName(passwordInfo.username);
    if (matchedIndex > -1) {
      const existedUser: User = users[matchedIndex];
      if (existedUser && existedUser.password === passwordInfo.oldPassword) {
        existedUser.password = passwordInfo.newPassword;
        users[matchedIndex] = existedUser;

        return response.status(200).json({ message: "The password successfully changed!"});
      } 
      
      return response.status(404).json({ message: "The password is wrong!"});
    } 
  }
  
  return response.status(400).json({ message: "Not valid ino provided!"});
});

export default router;
