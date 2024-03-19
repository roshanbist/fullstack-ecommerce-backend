import { Request, Response } from "express";

import categoriesService from "../services/categoriesService";
import CategoryModel, { CategoryDocument } from "../model/CategoryModel";

export const getAllCategories = async (req: Request, res: Response) => {
  const categories = await categoriesService.getAllCategories();
  
  res.status(200).json(categories);
} 

export const getCategoryById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const category = await categoriesService.getCategoryById(id);

  res.status(201).json(category);
}

export const createCategory = async (req: Request, res: Response) => {
  const newData = new CategoryModel(req.body);
  const newCategory = await categoriesService.createCategory(newData);

  res.status(201).json(newCategory);
}

export const updateCategory = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const newData = req.body as Partial<CategoryDocument>;
  const newCategory = await categoriesService.updateCategory(id, newData);
  
  res.status(200).json(newCategory);
}

export const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const newCategory = await categoriesService.deleteCategoryById(id);
  
  res.status(204).json();
}



