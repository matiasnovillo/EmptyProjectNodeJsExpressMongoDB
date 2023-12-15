import express from 'express';

import { selectAllProduct, select1ById, insertProduct, updateProduct, deleteProduct } from '../../controllers/Shop/ProductController';
import { isAuthenticated, isOwner } from '../../middlewares';

export default (router: express.Router) => {
  router.get('/api/Shop/Product', isAuthenticated, selectAllProduct);
  
  router.get('/api/Shop/Product/:id', isAuthenticated, select1ById);
  
  router.post('/api/Shop/Product', isAuthenticated, insertProduct);

  router.patch('/api/Shop/Product/:id', isAuthenticated, updateProduct);
  
  router.delete('/api/Shop/Product/:id', isAuthenticated, deleteProduct);
};