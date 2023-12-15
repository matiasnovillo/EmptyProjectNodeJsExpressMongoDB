import express from 'express';

import { SelectAll, Select1ById, Insert, UpdateById, DeleteById } from '../../db/Shop/ProductModel';
import { authentication, random } from '../../helpers';

export const selectAllProduct = async (request: express.Request, response: express.Response) => {
  try {
    const allproduct = await SelectAll();

    return response.status(200).json(allproduct);
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const select1ById = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params;

    const product = await Select1ById(id);

    return response.status(200).json(product);
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const insertProduct = async (request: express.Request, response: express.Response) => {
  try {
    const { 
      name, 
      isAvailable, 
      quantity,
      createdDate,
      price 
    } = request.body;

    if (!name || !isAvailable || !quantity || !createdDate || !price) {
      return response.sendStatus(400);
    }

    const product = await Insert({
        name, 
        isAvailable, 
        quantity,
        createdDate,
        price 
    });

    return response.status(200).json(product).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}

export const updateProduct = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params;
    const { 
        name, 
        isAvailable, 
        quantity,
        createdDate,
        price 
      } = request.body;

      if (!name || !isAvailable || !quantity || !createdDate || !price) {
        return response.sendStatus(400);
      }

    const product = await Select1ById(id);
    
    //Pass data from front-end to back-end
    product.name = name;
    product.isAvailable = isAvailable;
    product.quantity = quantity;
    product.createdDate = createdDate;
    product.price = price;
    
    await product.save();

    return response.status(200).json(product).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}

export const deleteProduct = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params;

    const deletedProduct = await DeleteById(id);

    return response.json(deletedProduct);
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}