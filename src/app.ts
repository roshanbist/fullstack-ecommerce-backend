import express from "express";
import dotenv from "dotenv";

import productsRouter from "./routers/productsRouter";
import usersRouter from "./routers/usersRouter";
import categoriesRouter from "./routers/categoriesRouter";

const app = express();
app.use(express.json());

dotenv.config({ path: ".env" });

app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);

export default app;
