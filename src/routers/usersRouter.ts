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

type Email = {
  email: string;
};

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
  
  return response.status(400).json({ message: "Not valid user"});
});

// Forget password request
router.get("/forgetPassword", (request: Request, response: Response) => { 
  // Our senario is redirecting to /changePasswordForm to get passwordInfo in frontend 
  // But for now we will leave it as it is
  console.log("forgetPassword");
  return response.redirect("/"); // TODO should be fixed later or some other way
});

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
      
      return response.status(400).json({ message: "The password is wrong!"});
    } 
  }
  
  return response.status(400).json({ message: "Not valid ino provided!"});
});

export default router;
