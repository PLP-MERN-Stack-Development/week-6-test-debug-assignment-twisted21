// server/jest.setup.js
// Jest setup file for MongoDB Memory Server.
// This file runs before all tests to connect to a temporary in-memory MongoDB instance.

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo;

// Before all tests, start the in-memory MongoDB server and connect Mongoose to it.
beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri);
});

// Before each test, clear all collections to ensure test isolation.
beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
});

// After all tests, stop the in-memory MongoDB server and disconnect Mongoose.
afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.disconnect();
});

