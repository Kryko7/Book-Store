
import { PORT, DB_URI } from './config.js';
import express from 'express';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import pkg from 'jshint/src/prod-params.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const { async } = pkg;


const app = express();

// Middleware
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/books', booksRoute);


mongoose
    .connect(DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });


