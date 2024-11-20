import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import UserModel from '../models/userModel.js'; // Import UserModel to clear state

describe('User Functionality Tests', () => {
    let newUser;

    beforeEach(() => {
        // Reset the users array before each test
        UserModel.getAll().length = 0;

        // Define the test user
        newUser = { id: '1', name: 'alon gross', email: 'alon.gross@example.com' };
    });

    it('should create a new user', async () => {
        const res = await request(app).post('/api/users').send(newUser);
        expect(res.status).to.be.equal(201);
        expect(res.body).to.deep.equal(newUser);
    });

    it('should retrieve the created user', async () => {
        await request(app).post('/api/users').send(newUser);
        const res = await request(app).get('/api/users');
        expect(res.status).to.be.equal(200);
        expect(res.body.users).to.have.lengthOf(1); // Expect exactly one user
        expect(res.body.users[0]).to.deep.equal(newUser);
    });

    it('should update the user information', async () => {
        await request(app).post('/api/users').send(newUser);
        const updatedUser = { name: 'John Updated', email: 'john.updated@example.com' };
        const res = await request(app).put(`/api/users/${newUser.id}`).send(updatedUser);
        expect(res.status).to.be.equal(200);
        expect(res.body).to.deep.equal({ id: '1', ...updatedUser });
    });

    it('should delete the user', async () => {
        await request(app).post('/api/users').send(newUser);
        const res = await request(app).delete(`/api/users/${newUser.id}`);
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.equal('User deleted');
    });

    it('should return 404 for non-existent user on deletion', async () => {
        const res = await request(app).delete('/api/users/999');
        expect(res.status).to.be.equal(404);
        expect(res.body.message).to.equal('User not found');
    });
});
