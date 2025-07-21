import express from 'express';
import { createUserController, getAllUsersController, deleteUserController, updateUserContoller } from '../controllers/crudUsersController.js';

const crudUsers = express.Router();

crudUsers.get('/getAllUsers', getAllUsersController);
crudUsers.post('/createUser', createUserController);
crudUsers.delete('/deleteUser/:id', deleteUserController);
crudUsers.put('/updateUser/:id', updateUserContoller);

export default crudUsers;