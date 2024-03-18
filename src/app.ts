import express from 'express';
import dotenv from 'dotenv';

import productsRouter from './routers/productsRouter';
import usersRouter from './routers/usersRouter';
import categoriesRouter from './routers/categoriesRouter';
import adminRouter from './routers/adminRouter';

const app = express(); // Create a server with express
app.use(express.json()); // Return as json

dotenv.config({ path: '.env' });

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/admin', adminRouter);

export default app;
