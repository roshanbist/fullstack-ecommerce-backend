import express from "express";
import usersRouter from "./routers/usersRouter";

const PORT = 8080;
// create server with express
const app = express();
app.use(express.json());
app.use("/api/v1/users", usersRouter);

app.listen(PORT, () => {
  console.log(`server running at... http://localhost:${PORT}`);
});
