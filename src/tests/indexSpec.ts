import request from 'supertest';
import { app } from '../index';
import fsExists from 'fs.promises.exists';
import express from 'express';

//testing end point

describe('Testing the endpont of the API', () => {
    it('expect respnse status code to equal 200', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });
});

//testing creating directory function

describe('Testing creating the directory function', () => {
    it('expect the images directory to have a new folder called output', async () => {
        expect(await fsExists('images/output')).toBe(true);
    });
});

//testing proceessing the image

/*i coppied the whole fuction of the processing here you can see
 the orignal in the processing.controller,ts file
 */

describe('Testing processing the image', () => {
    it('expect the output directory to have a new processed image', async () => {
        //self invoke because it require params while invoking :D
        (async function testingProcessing(req: express.Request): Promise<void> {
            const width = Number(req.query.width);
            const height = Number(req.query.height);

            expect(
                await fsExists(
                    `images/output/${req.query.imageName}_${width}_${height}.jpg`
                )
            ).toBe(true);
        });
    });
});
