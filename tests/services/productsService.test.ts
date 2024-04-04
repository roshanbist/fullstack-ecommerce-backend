import connect, { MongoHelper } from '../db-helper';
import ProductModel, { ProductDocument } from '../../src/model/ProductModel';
import productsService from '../../src/services/productsService';
import { CategoryDocument } from '../../src/model/CategoryModel';
import { createCategory } from './categoriesService.test';
import {
  getProductData,
  productData,
} from '../controllers/productsController.test';
import {
  FilterProduct,
  Product,
  ProductsList,
} from '../../src/misc/types/Product';

export async function createProduct(
  categoryId: string
): Promise<ProductDocument> {
  const productDataObject = getProductData(productData, categoryId);
  const newProduct: ProductDocument = new ProductModel(productDataObject);
  return await productsService.createNewProduct(newProduct);
}

const filterProducts: Partial<FilterProduct> = {
  name: 'Product1',
  size: 'M',
};

describe('Product service test', () => {
  let mongoHelper: MongoHelper;

  //connect to database
  beforeAll(async () => {
    mongoHelper = await connect();
  });

  // close database
  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  // clear database after each test
  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  //test suites
  // get all products
  it('should get all products', async () => {
    // create category
    const category: CategoryDocument = await createCategory();

    const product: ProductDocument = await createProduct(category._id);

    const productList: ProductsList = await productsService.getAllProducts(
      filterProducts
    );

    expect(productList.total).toEqual(1);
    expect(productList.products[0]).toMatchObject({
      _id: product._id,
      name: product.name,
      images: product.images,
    });
  });

  // create product
  it('should create a product', async () => {
    // create category
    const category: CategoryDocument = await createCategory();

    const product: ProductDocument = await createProduct(category._id);

    expect(product).toHaveProperty('_id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('description');
  });

  // get a product by id
  it('should get a product by id', async () => {
    // create category
    const category: CategoryDocument = await createCategory();

    const product: ProductDocument = await createProduct(category._id);

    const foundProduct: ProductDocument = await productsService.getProductById(
      product._id
    );

    expect(foundProduct).toMatchObject({
      _id: product._id,
      name: product.name,
      images: product.images,
    });
  });

  // update product by id
  it('should update a product by id', async () => {
    // create category
    const category: CategoryDocument = await createCategory();

    const product: ProductDocument = await createProduct(category._id);

    const productUpdateData: Partial<Product> = {
      name: 'product1 new name',
      description: 'product1 new description',
    };

    const updateProduct: ProductDocument = await productsService.updateProduct(
      product._id,
      productUpdateData
    );

    expect(updateProduct).toMatchObject({
      _id: product._id,
      name: productUpdateData.name,
      description: productUpdateData.description,
    });
  });

  // delete product by id
  it('should delete a product by id', async () => {
    // create category
    const category: CategoryDocument = await createCategory();

    const product: ProductDocument = await createProduct(category._id);

    const deleteProduct = await productsService.deleteProductById(product._id);

    expect(deleteProduct).toMatchObject({
      _id: product._id,
      name: product.name,
      images: product.images,
    });
  });
});
