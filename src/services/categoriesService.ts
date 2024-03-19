import CategoryModel, { CategoryDocument } from "../model/CategoryModel";

const getAllCategories = async (): Promise<CategoryDocument[]> => {
  return await CategoryModel.find();
}

const getCategoryById = async (id: string): Promise<CategoryDocument | null> => {
  return await CategoryModel.findById(id);
}

const createCategory = async (category: CategoryDocument): Promise<CategoryDocument> => {
  return await CategoryModel.create(category);
  // return category.save();
}
 
const updateCategory = async (id: string, newData: Partial<CategoryDocument>): Promise<CategoryDocument | null> => {
  const updatedCategory = await CategoryModel.findByIdAndUpdate(id, newData, {
    new: true
  });

  return updatedCategory;
}

const deleteCategoryById = async (id: string): Promise<CategoryDocument | null> => {
  return await CategoryModel.findByIdAndDelete(id);
}

export default { 
  getAllCategories, 
  getCategoryById ,
  createCategory,
  updateCategory,
  deleteCategoryById
};  