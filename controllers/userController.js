import UserModel from '../models/userModel.js';

class UserController {
    static getUsers(req, res) {
        res.status(200).json({ users: UserModel.getAll() });
    }

    static getUserById(req, res) {
        const user = UserModel.getById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    static addUser(req, res) {
        const { id, name, email } = req.body;
        if (!id || !name || !email) {
            return res.status(400).json({ message: 'Invalid input' });
        }
        const newUser = UserModel.add({ id, name, email });
        res.status(201).json(newUser);
    }

    static updateUser(req, res) {
        const updatedUser = UserModel.update(req.params.id, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    static deleteUser(req, res) {
        const deletedUser = UserModel.delete(req.params.id);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
}

export default UserController; // Use default export
