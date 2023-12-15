import express from "express";

import { SelectByEmail, Insert } from "../db/CMSCore/UserModel";
import { authentication, random } from "../helpers";

export const login = async (request: express.Request, response: express.Response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.sendStatus(400);
    }

    const user = await SelectByEmail(email).select("+authentication.salt +authentication.password");

    if (!user) {
      return response.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);
    
    if (user.authentication.password != expectedHash) {
      return response.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    response.cookie("NODEJSAPI-AUTH", user.authentication.sessionToken, { domain: "localhost", path: "/" });

    return response.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const register = async (request: express.Request, response: express.Response) => {
  try {
    const { email, password, username } = request.body;

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