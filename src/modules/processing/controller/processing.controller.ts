import express from 'express';
import path from 'path';
import fsExists from 'fs.promises.exists';
import { creatingDir } from '../../utilities/creatingDirectory';
import { usingSharp } from '../../utilities/sharpFunction';
async function validationAndProcessing(
    req: express.Request,
    res: express.Response
): Promise<void> {
    //regex for width and height inputs to not accept letters
    const regForwidth = new RegExp('^[0-9]+$');
    if (
        //validating the width and height with regex
        regForwidth.test(req.query.width as string) == true &&
        regForwidth.test(req.query.height as string) == true
    ) {
        if (
            (await fsExists(
                //validating the image-name from request if the image exist in the images directory or not
                path.resolve('./') + `/images/${req.query.imageName}.jpg`
            )) == true
        ) {
            //getting the width and height inputs and convert the into number datatype
            const width = Number(req.query.width);
            const height = Number(req.query.height);

            //handle error if user entered width or height with 0 or -
            if (width <= 0 || height <= 0) {
                res.json('width and height cannot be minus or zero');
            } else {
                //creating variable to carry the path of the procced image
                let imgOutLocation: string;
                //creating the new directory to recieve the output processed images
                await creatingDir();

                if (
                    //checking if the image is already processed for cashing
                    (await fsExists(
                        `images/output/${req.query.imageName}_${width}_${height}.jpg`
                    )) == true
                ) {
                    //if already processed return it
                    imgOutLocation =
                        path.resolve('./') +
                        `/images/output/${req.query.imageName}_${width}_${height}.jpg`;

                    res.status(200).sendFile(imgOutLocation);
                } else {
                    //if not already processed process the image with sharp
                    usingSharp(req, res);
                }
            }
        } else {
            //error handle for invalid image name entered
            res.json(
                'this image is not in the images directory, please enter valid image name :)'
            );
        }
    } else {
        //error handle for invaid width or height entered
        res.json(
            'width or height are invalid, please enter a number in px for the width and height new dimensions :) '
        );
    }
}

export default validationAndProcessing;
