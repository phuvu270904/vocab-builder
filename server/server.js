import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import vocabRoutes from './api/routes/vocabRoutes.js';
import Vocab from './api/models/vocabModel.js';
import connectDB from './api/mongodb/connect.js';


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/', vocabRoutes);

const startServer = async () => {
    try {
        connectDB('mongodb+srv://phu270904:1jIjZXMya63mV7Te@cluster0.iwir6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');        
        app.listen(port, () => console.log('Server started on port ' + port));
    } catch (error) {
        console.log(error);
    }
}

startServer();