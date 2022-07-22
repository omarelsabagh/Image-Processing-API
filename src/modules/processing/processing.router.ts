import express from 'express';
import validationAndProcessing from './controller/processing.controller';

const router = express.Router(); //creating a route for my end-point

router.get('/', validationAndProcessing);

export default router;
