// import request from 'supertest';
import connect, { MongoHelper } from '../db-helper';

// import app from '../../src/app';
import categoriesService from '../../src/services/categoriesService';
import CategoryModel, { CategoryDocument } from '../../src/model/CategoryModel';
// import { getCategoryData } from '../controllers/categoriesController.test';
import { getCategoryData } from '../utils/controllerUtil';
import { UserRole } from '../../src/misc/types/User';
import { Category } from '../../src/misc/types/Category';
import { createCategoryInService } from '../utils/serviceUtil';

// createCategory
// export async function createCategory(): Promise<CategoryDocument> {
//   const categoryData: Category = getCategoryData();
//   const category: CategoryDocument = new CategoryModel(categoryData);
//   return await categoriesService.createCategory(category);
// }

//tear down
describe('category service test', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  // get all categories
  it('should return a list of categories', async () => {
    const category: CategoryDocument = await createCategoryInService();

    const categoryList = await categoriesService.getAllCategories();
    expect(categoryList.length).toEqual(1);
    expect(categoryList[0]).toMatchObject({
      _id: category._id,
      name: category.name,
      image: category.image,
      __v: category.__v,
    });
  });

  it('should return a category with categoryId', async () => {
    const category: CategoryDocument = await createCategoryInService();
    const foundCategory: CategoryDocument | null =
      await categoriesService.getCategoryById(category._id);

    expect(foundCategory).toMatchObject({
      _id: category._id,
      name: category.name,
      image: category.image,
      __v: category.__v,
    });
  });

  it('should create a category', async () => {
    const category: CategoryDocument = await createCategoryInService();
    expect(category).toHaveProperty('_id');
    expect(category).toHaveProperty('name');
    expect(category).toHaveProperty('image');
    expect(category).toHaveProperty('__v');
  });

  it('should update a category', async () => {
    const category: CategoryDocument = await createCategoryInService();
    const categoryUpdateData: Partial<Category> = {
      name: 'updated name',
      image: 'http://updatedImage.png',
    };

    const updatedCategory: CategoryDocument | null =
      await categoriesService.updateCategory(category._id, categoryUpdateData);
    expect(updatedCategory).toMatchObject({
      _id: category._id,
      name: categoryUpdateData.name,
      image: categoryUpdateData.image,
      __v: category.__v,
    });
  });

  it('should delete a category', async () => {
    const category: CategoryDocument = await createCategoryInService();
    const deletedCategory: CategoryDocument | null =
      await categoriesService.deleteCategoryById(category._id);
    expect(deletedCategory).toMatchObject({
      _id: category._id,
      name: category.name,
      image: category.image,
      __v: category.__v,
    });
  });
});
