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

let users: User[] = [
  {
    id: '1',
    name: 'Ganesh',
    email: 'user1@mail.com',
    password: 'user1pasword',
    role: 'customer',
    avatar: 'user1Avatar',
    address: 'user1Address',
  },
  {
    id: '2',
    name: 'Roshan',
    email: 'user2@mail.com',
    password: 'user2pasword',
    role: 'customer',
    avatar: 'user2Avatar',
    address: 'user2Address',
  },
  {
    id: '3',
    name: 'Woong',
    email: 'user3@mail.com',
    password: 'user3pasword',
    role: 'customer',
    avatar: 'user3Avatar',
    address: 'user3Address',
  },
];

const router = express.Router();

// method, endpoint, data 
router.get("/", (request: Request, response: Response) => {
  
});

router.post("/", (request: Request, response: Response) => {
  
});

export default router;