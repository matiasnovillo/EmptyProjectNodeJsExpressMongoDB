import express from 'express';
import { merge, get } from 'lodash';

import { SelectBySessionToken } from '../db/CMSCore/UserModel'; 

export const isAuthenticated = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = request.cookies['NODEJSAPI-AUTH'];

    if (!sessionToken) {
      return response.sendStatus(403);
    }

    const existingUser = await SelectBySessionToken(sessionToken);

    if (!existingUser) {
      return response.sendStatus(403);
    }

    merge(request, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}

export const isOwner = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {
    const { id } = request.params;
    const currentUserId = get(request, 'identity._id') as string;

    if (!currentUserId) {
      return response.sendStatus(400);
    }

    if (currentUserId.toString() !== id) {
      return response.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}