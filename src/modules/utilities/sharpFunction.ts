import express from 'express';
import path from 'path';
import sharp from 'sharp';

async function usingSharp(
    req: express.Request,
    res: express.Response
): Promise<void> {
    const imgLocation =
        path.resolve('./') + `/images/${req.query.imageName}.jpg`;
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    let imgOutLocation;

    await sharp(imgLocation)
        .resize(width, height)
        .toFile(`images/output/${req.query.imageName}_${width}_${height}.jpg`)
        .then(() => {
            imgOutLocation =
                path.resolve('./') +
                `/images/output/${req.query.imageName}_${width}_${height}.jpg`;

            res.status(200).sendFile(imgOutLocation);
        });
}

export { usingSharp };
