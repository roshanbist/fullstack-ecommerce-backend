// connect database
// password: ngocanhfs17
// mongodb+srv://ngocanhhsgs:<password>@cluster0.rnslrmg.mongodb.net/

import mongoose from "mongoose";
import app from "./app";

// get database url
const mongodbUrl = process.env.MONGODB_URL as string;
const port = process.env.PORT as string;
// library: mongoose

mongoose
  .connect(mongodbUrl, {
    dbName: "fs17",
  })
  .then(() => {
    // logic
    app.listen(port, () => {
      console.log("Database is connected");
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.log("MongDB connection error" + error);
    process.exit(1);
  });
