import express from 'express';

import { selectAllUser, select1ById, insertUser, updateUser, deleteUser } from '../../controllers/CMSCore/UserController';
import { isAuthenticated, isOwner } from '../../middlewares';

export default (router: express.Router) => {
  router.get('/api/CMSCore/User', isAuthenticated, selectAllUser);
  
  router.get('/api/CMSCore/User/:id', isAuthenticated, select1ById);
  
  router.post('/api/CMSCore/User', isAuthenticated, insertUser);

  router.patch('/api/CMSCore/User/:id', isAuthenticated, updateUser);
  
  router.delete('/api/CMSCore/User/:id', isAuthenticated, deleteUser);
};