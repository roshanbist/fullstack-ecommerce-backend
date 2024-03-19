import express, { Request, Response } from "express";

import userServices from "../services/users";

export async function getAllUsers(_: Request, response: Response) {
  const userList = await userServices.getAllUser();
  console.log(userList, "user");
  response.status(200).json(userList);
}

// get user by id
// req.params
// response
