import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.addUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router; 
