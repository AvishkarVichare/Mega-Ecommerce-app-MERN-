import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// morgan logger 
app.use(morgan('tiny')); // combined can be used

export default app;