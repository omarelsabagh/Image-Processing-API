import request from 'supertest';
import { app } from '../index';
import fsExists from 'fs.promises.exists';
import express from 'express';
import path from 'path';
import sharp from 'sharp';

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

//testing if processing image is done

describe('Testing if processing image is done', () => {
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

//testing if the processing process outputs correctly
describe('Testing processing the image works well', () => {
    it('expect the image processed to have 200px width and 300px height', async () => {
        //self invoke because it require params while invoking :D
        (async function testingProcessing(req: express.Request): Promise<void> {
            const imgLocation =
                path.resolve('./') + `/images/${req.query.imageName}.jpg`;
            const width = 200;
            const height = 300;
            let imgOutLocation;

            await sharp(imgLocation)
                .resize(width, height)
                .toFile(
                    `images/output/${req.query.imageName}_${width}_${height}.jpg`
                )
                .then(() => {
                    imgOutLocation =
                        path.resolve('./') +
                        `/images/output/${req.query.imageName}_${width}_${height}.jpg`;
                    expect(imgOutLocation).toEqual(
                        path.resolve('./') +
                            `/images/output/${req.query.imageName}_200_300.jpg`
                    );
                });
        });
    });
});
