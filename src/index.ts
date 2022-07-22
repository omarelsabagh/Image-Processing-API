import express from 'express';
import precessingRouter from './modules/processing/processing.router';

//creating server

const app = express();
const port = 3000;

app.use(precessingRouter);

app.listen(port);

//exporting the server for testing the end-point

export { app };
