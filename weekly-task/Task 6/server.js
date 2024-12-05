import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyparser from 'body-parser';
import connectDB from './api/mongodb/connect.js';
import todoListRoutes from './api/routes/todoListRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use('/', todoListRoutes);

app.use((req, res) => {
    res.status(404).send('Invalid request!');
});

const startServer = async () => {
    try {
        const port = process.env.PORT || 3000;
        connectDB('mongodb+srv://phu270904:9LyCW3Tizg5YXPak@cluster0.ln0mw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');        
        app.listen(port, () => console.log('todo list RESTful API server started on: ' + port));
    } catch (error) {
        console.log(error);
    }
}

startServer();