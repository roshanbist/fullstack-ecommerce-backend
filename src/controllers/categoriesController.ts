import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import categoriesService from '../services/categoriesService';
import CategoryModel, { CategoryDocument } from '../model/CategoryModel';
import { ApiError, BadRequest, ForbiddenError, InternalServerError, NotFoundError } from '../errors/ApiError';

// #Woong
export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories: CategoryDocument[] = await categoriesService.getAllCategories();
    if (categories) {
      return res.status(200).json(categories);
    }

    throw new NotFoundError('No categories found');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) { // from mongoose
      return next(new BadRequest('Wrong format to get categories'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot find the categories'));
  }
} 

// #Woong
export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const category: CategoryDocument | null = await categoriesService.getCategoryById(id);
    if (category) {
      return res.status(201).json(category);
    }

    throw new NotFoundError('No matched category with the id');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) { // from mongoose
      return next(new BadRequest('Wrong id format'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot find the category'));
  }
}

// #Woong
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newData: CategoryDocument = new CategoryModel(req.body);
    const newCategory: CategoryDocument = await categoriesService.createCategory(newData);
    if (newCategory) {
      return res.status(201).json(newCategory);
    }

    throw new ForbiddenError('Creating category is not allowed');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) { // from mongoose
      return next(new BadRequest('Wrong data format to create'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot create a new category'));
  }
}

// #Woong
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const newData = req.body as Partial<CategoryDocument>;
    const newCategory = await categoriesService.updateCategory(id, newData);
    if (newCategory) {
      return res.status(200).json(newCategory);
    }
    
    throw new ForbiddenError('Updating category is not allowed');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) { // from mongoose
      return next(new BadRequest('Wrong data format to udpate'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot update the category'));
  }
  
}

// #Woong
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const newCategory: CategoryDocument | null = await categoriesService.deleteCategoryById(id);
    if (newCategory) {
      return res.status(204).json();
    }
    
    throw new ForbiddenError('Delete category is not allowed');
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) { // from mongoose
      return next(new BadRequest('Wrong data format to delete'));
    } else if (e instanceof ApiError) {
      return next(e);
    }

    return next(new InternalServerError('Cannot delete the category'));
  }
}



