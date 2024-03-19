import Category, { CategoryDocument } from "../model/Category";

const getAllCategories = async (): Promise<CategoryDocument[]> => {
  return await Category.find();
  // limit
  // skip
  // {regex: search query}
};

const createCategory = async (category: CategoryDocument
): Promise<CategoryDocument> => {
  // save
  // 1. create new category
  // 2. return that
  return await category.save();
};

// To do: handle error
const getCategoryById = async (
  id: string
): Promise<CategoryDocument | undefined> => {
  const foundCategory = await Category.findById(id);
  if (foundCategory) {
    return foundCategory;
  }
};

const deleteCategoryById = async (id: string) => {
  const foundCategory = await Category.findByIdAndDelete(id);
  if (foundCategory) {
    return foundCategory;
  }
};

const updateCategory = async (
  id: string,
  newInformation: Partial<CategoryDocument>
) => {
  const updatedCategory = await Category.findByIdAndUpdate(id, newInformation, {
    new: true,
  });
  return updatedCategory;
};

export default {
  getAllCategories,
  createCategory,
  getCategoryById,
  deleteCategoryById,
};
