import path from 'path';
import sharp from 'sharp';

async function usingSharp(
    imagename: string | unknown,
    width: number,
    height: number
): Promise<void> {
    await sharp(path.resolve('./') + `/images/${imagename as string}.jpg`)
        .resize(Number(width) as number, Number(height))
        .toFile(
            `images/output/${imagename as string}_${Number(width)}_${Number(
                height
            )}.jpg`
        )
        .catch((err) => {
            Promise.reject(new Error(err));
        });
}

export { usingSharp };
