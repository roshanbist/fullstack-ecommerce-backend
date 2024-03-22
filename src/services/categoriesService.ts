import CategoryModel, { CategoryDocument } from "../model/CategoryModel";

const getAllCategories = async (): Promise<CategoryDocument[]> => {
  return await CategoryModel.find();
}

const getCategoryById = async (categoryId: string): Promise<CategoryDocument | null> => {
  return await CategoryModel.findById(categoryId);
}

const createCategory = async (category: CategoryDocument): Promise<CategoryDocument> => {
  return await category.save();
}
 
const updateCategory = async (categoryId: string, newData: Partial<CategoryDocument>): Promise<CategoryDocument | null> => {
  const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, newData, {
    new: true
  });

  return updatedCategory;
}

const deleteCategoryById = async (categoryId: string): Promise<CategoryDocument | null> => {
  return await CategoryModel.findByIdAndDelete(categoryId);
}

export default { 
  getAllCategories, 
  getCategoryById ,
  createCategory,
  updateCategory,
  deleteCategoryById
};  