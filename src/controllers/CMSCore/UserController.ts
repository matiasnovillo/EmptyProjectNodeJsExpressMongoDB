import express from 'express';

import { SelectAll, Select1ById, Insert, UpdateById, DeleteById, SelectByEmail } from '../../db/CMSCore/UserModel';
import { authentication, random } from '../../helpers';

export const selectAllUser = async (request: express.Request, response: express.Response) => {
  try {
    const alluser = await SelectAll();

    return response.status(200).json(alluser);
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const select1ById = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params;

    const user = await Select1ById(id);

    return response.status(200).json(user);
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const insertUser = async (request: express.Request, response: express.Response) => {
  try {
    const { 
      email, 
      password, 
      username 
    } = request.body;

    if (!email || !password || !username) {
      return response.sendStatus(400);
    }

    const existingUser = await SelectByEmail(email);
  
    if (existingUser) {
      return response.sendStatus(400);
    }

    const salt = random();
    const user = await Insert({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return response.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}

export const updateUser = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params;
    const { username } = request.body;

    if (!username) {
      return response.sendStatus(400);
    }

    const user = await Select1ById(id);
    
    user.username = username;
    
    await user.save();

    return response.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}

export const deleteUser = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params;

    const deletedUser = await DeleteById(id);

    return response.json(deletedUser);
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}