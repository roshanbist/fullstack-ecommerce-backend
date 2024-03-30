import User, { UserDocument } from '../model/UserModel';

const getAllUsers = async (): Promise<UserDocument[]> => {
  return await User.find();
};

const getUserById = async (id: string): Promise<UserDocument | null> => {
  return await User.findById(id);
};

const createUser = async (user: UserDocument): Promise<UserDocument | null> => {
  return await user.save();
};

const deleteUser = async (id: string): Promise<UserDocument | null> => {
  return await User.findByIdAndDelete(id);
};

const updateUser = async (id: string, newInformation: Partial<UserDocument>): Promise<UserDocument | null> => {
  const updatedUser = await User.findByIdAndUpdate(id, newInformation, {
    new: true,
  });
  return updatedUser;
};

const findOrCreateUser = async (userInfo: UserDocument): Promise<UserDocument | null> => {
  const existedUser: UserDocument | null = await getUserByEmail(userInfo.email);
  if (existedUser) {
    return existedUser;
  }

  return await createUser(userInfo);
}

// #Woong
const getUserByEmail = async (email: string): Promise<UserDocument | null> => {
  return await User.findOne({ email });
};

// #Woong
const resetPassword = async (user: UserDocument): Promise<UserDocument | null> => {
  return await user.save();
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  resetPassword,
  getUserByEmail,
  findOrCreateUser
};
