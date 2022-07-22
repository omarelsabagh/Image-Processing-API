import fs from 'fs-extra';
import fsExists from 'fs.promises.exists';
async function creatingDir(): Promise<void> {
    if ((await fsExists('images/output')) == false) {
        //checking if the directory is already created
        fs.ensureDir('images/output'); //create the directory
    }
}

export { creatingDir };
