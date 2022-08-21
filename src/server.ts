import dotenv from 'dotenv'; dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

import usersRouter from './routes/users';

const app = express();

(() => {
    // Connecting to Mongo:
    if (process.env.DATABASE_URL === undefined) throw new Error("Invalid ENV File");
    mongoose.connect(process.env.DATABASE_URL);
    const db = mongoose.connection;
    db.on('error', error => console.error(error));
    db.once('open', () => console.log('Connected to Mongo'));

    // Setting app to JSON
    app.use(express.json());

    // Routes:
    app.use('/users', usersRouter);

    // Initialise Server:
    app.listen(3000, () => console.log('Server Started'));
})();