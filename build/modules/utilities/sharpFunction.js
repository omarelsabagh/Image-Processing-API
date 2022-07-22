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
exports.usingSharp = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
function usingSharp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const imgLocation = path_1.default.resolve('./') + `/images/${req.query.imageName}.jpg`;
        const width = Number(req.query.width);
        const height = Number(req.query.height);
        let imgOutLocation;
        yield (0, sharp_1.default)(imgLocation)
            .resize(width, height)
            .toFile(`images/output/${req.query.imageName}_${width}_${height}.jpg`)
            .then(() => {
            imgOutLocation =
                path_1.default.resolve('./') +
                    `/images/output/${req.query.imageName}_${width}_${height}.jpg`;
            res.status(200).sendFile(imgOutLocation);
        });
    });
}
exports.usingSharp = usingSharp;
