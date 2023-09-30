import express from 'express';
import { Book } from '../models/bookModel.js';


const router = express.Router();


router.post('/', async(req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({ message: 'Data fields missing' });
        };
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.get('/', async(req, res) => {
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get('/:id', async(req, res) => {
    try{
        const book = await Book.findById(req.params.id);
        if(book){
            return res.status(200).send(book);
        } else {
            return res.status(404).send({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async(req, res) => {
    try{
        const result = await Book.findByIdAndDelete(req.params.id);
        if(result){
            return res.status(200).send({ message: 'Book deleted' });
        } else {
            return res.status(404).send({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.put('/:id', async(req, res) => {
    try{
        const book = await Book.findById(req.params.id);
        if(book){
            book.title = req.body.title || book.title;
            book.author = req.body.author || book.author;
            book.publishYear = req.body.publishYear || book.publishYear;

            const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).send(updatedBook);
        } else {
            return res.status(404).send({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default router;