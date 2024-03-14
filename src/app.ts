import express, { Request, Response } from 'express';

import productsRouter from './routers/productsRouter';
import usersRouter from './routers/usersRouter';

const PORT = 8080;
const app = express(); // Create a server with express
app.use(express.json()); // Return as json

app.get("/", (request: Request, response: Response) => {
  response.status(200).json("Hello world");
});

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:', PORT);
});