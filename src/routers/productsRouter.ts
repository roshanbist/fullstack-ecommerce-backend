import express from 'express';

import {
  createNewProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/productsController';
import adminCheck from '../middlewares/adminCheck';
import { passportAuthenticate } from '../misc/utils/AuthUtil';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', passportAuthenticate(), adminCheck, createNewProduct);

router.get('/:productId', getProductById);
router.put('/:productId', passportAuthenticate(), adminCheck, updateProduct);
router.delete('/:productId', passportAuthenticate(), adminCheck, deleteProductById);

export default router;



  // "name": "cup",
  //       "price": 5,
  //       "description": "this is a nice cup",
  //       "images": [
  //         "www.image1.com",
  //         "www.image2.com"
  //       ],
  //       "sizes": "L",
  //     "categoryId": "65fde5bc218dd71b8ebaeabb",
  
  // "firstName": "User1",
  //   "lastName": "last-name",
  //   "email": "user1@mail.com",
  //   "password": "12345",
  //   "userName": "user1",
  //   "role": "customer",
  //   "avatar": "www.ping1.com",
  //   "address": "address1",