"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_promises_exists_1 = __importDefault(require("fs.promises.exists"));
const creatingDirectory_1 = require("../../utilities/creatingDirectory");
const sharpFunction_1 = require("../../utilities/sharpFunction");
function validationAndProcessing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //regex for width and height inputs to not accept letters
        const regForwidth = new RegExp('^[0-9]+$');
        if (
        //validating the width and height with regex
        regForwidth.test(req.query.width) == true &&
            regForwidth.test(req.query.height) == true) {
            if ((yield (0, fs_promises_exists_1.default)(
            //validating the image-name from request if the image exist in the images directory or not
            path_1.default.resolve('./') + `/images/${req.query.imageName}.jpg`)) == true) {
                //getting the width and height inputs and convert the into number datatype
                const width = Number(req.query.width);
                const height = Number(req.query.height);
                //handle error if user entered width or height with 0 or -
                if (width <= 0 || height <= 0) {
                    res.json('width and height cannot be minus or zero');
                }
                else {
                    //creating variable to carry the path of the procced image
                    let imgOutLocation;
                    //creating the new directory to recieve the output processed images
                    yield (0, creatingDirectory_1.creatingDir)();
                    if (
                    //checking if the image is already processed for cashing
                    (yield (0, fs_promises_exists_1.default)(`images/output/${req.query.imageName}_${width}_${height}.jpg`)) == true) {
                        //if already processed return it
                        imgOutLocation =
                            path_1.default.resolve('./') +
                                `/images/output/${req.query.imageName}_${width}_${height}.jpg`;
                        res.status(200).sendFile(imgOutLocation);
                    }
                    else {
                        //if not already processed process the image with sharp
                        (0, sharpFunction_1.usingSharp)(req, res);
                    }
                }
            }
            else {
                //error handle for invalid image name entered
                res.json('this image is not in the images directory, please enter valid image name :)');
            }
        }
        else {
            //error handle for invaid width or height entered
            res.json('width or height are invalid, please enter a number in px for the width and height new dimensions :) ');
        }
    });
}
exports.default = validationAndProcessing;
