import User, { UserDocument } from "../model/User";

// services: async function
// talk to database
// methods: find();

const getAllUser = async () => {
  // find: methods by mongoose
  return await User.find();
};

export default { getAllUser };
