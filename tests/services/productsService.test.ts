import connect, { MongoHelper } from '../db-helper';
import { ProductDocument } from '../../src/model/ProductModel';
import productsService from '../../src/services/productsService';

import { Product, ProductsList } from '../../src/misc/types/Product';
import { createProductInService } from '../utils/serviceUtil';

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
    const product: ProductDocument = await createProductInService();

    const productList: ProductsList = await productsService.getAllProducts({});

    expect(productList).toHaveProperty('products');
    expect(productList).toHaveProperty('total');
    expect(productList.total).toBe(1);
    expect(productList.products.length).toBe(1);
    expect(productList.products[0]).toMatchObject({
      _id: product._id,
      title: product.title,
      images: product.images,
    });
  });

  // create product
  it('should create a product', async () => {
    const product: ProductDocument = await createProductInService();

    expect(product).toHaveProperty('_id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('size');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('images');
  });

  // get a product by id
  it('should get a product by id', async () => {
    const product: ProductDocument = await createProductInService();

    const foundProduct: ProductDocument = await productsService.getProductById(
      product._id
    );

    expect(foundProduct).toMatchObject({
      _id: product._id,
      title: product.title,
      images: product.images,
    });
  });

  // update product by id
  it('should update a product by id', async () => {
    const product: ProductDocument = await createProductInService();

    const productUpdateData: Partial<Product> = {
      title: 'product1 new name',
      description: 'product1 new description',
    };

    const updateProduct: ProductDocument = await productsService.updateProduct(
      product._id,
      productUpdateData
    );

    expect(updateProduct).toMatchObject({
      _id: product._id,
      title: productUpdateData.title,
      description: productUpdateData.description,
    });
  });

  // delete product by id
  it('should delete a product by id', async () => {
    const product: ProductDocument = await createProductInService();

    const deleteProduct = await productsService.deleteProductById(product._id);

    expect(deleteProduct).toMatchObject({
      _id: product._id,
      title: product.title,
      images: product.images,
    });
  });
});
