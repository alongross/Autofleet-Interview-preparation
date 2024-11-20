let users = [];

class UserModel {
    static getAll() {
        return users;
    }

    static getById(id) {
        return users.find((user) => user.id === id);
    }

    static add(user) {
        users.push(user);
        return user;
    }

    static update(id, updatedData) {
        const index = users.findIndex((user) => user.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedData };
            return users[index];
        }
        return null;
    }

    static delete(id) {
        const index = users.findIndex((user) => user.id === id);
        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
        return null;
    }
}

export default UserModel; 
