import express from 'express';

import authentication from './authentication';
import UserRouter from './CMSCore/UserRouter';
import ProductRouter from './Shop/ProductRouter';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  UserRouter(router);
  ProductRouter(router);

  return router;
};