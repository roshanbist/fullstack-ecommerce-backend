// Create database
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

async function connect (): Promise<MongoHelper> {
  const mongodb = await MongoMemoryServer.create();
  const uri = mongodb.getUri();

  await mongoose.connect(uri);

  return {
    closeDatabase: async (): Promise<void> => {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongodb.stop();
    },
    clearDatabase: async (): Promise<void> => {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    }
  }
}

export default connect;

export type MongoHelper = {
  closeDatabase: () => Promise<void>,
  clearDatabase: () => Promise<void>
}