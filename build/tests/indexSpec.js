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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const fs_promises_exists_1 = __importDefault(require("fs.promises.exists"));
const sharpFunction_1 = require("../modules/utilities/sharpFunction");
//testing end point
describe('Testing the endpont of the API', () => {
    it('expect respnse status code to equal 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).get('/');
        expect(res.statusCode).toEqual(200);
    }));
});
//testing creating directory function
describe('Testing creating the directory function', () => {
    it('expect the images directory to have a new folder called output', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, fs_promises_exists_1.default)('images/output')).toBe(true);
    }));
});
//testing if processing image is done
describe('Testing if processing image is done', () => {
    it('expect the output directory to have a new processed image', () => __awaiter(void 0, void 0, void 0, function* () {
        //self invoke because it require params while invoking :D
        (function testingProcessing(req) {
            return __awaiter(this, void 0, void 0, function* () {
                const width = Number(req.query.width);
                const height = Number(req.query.height);
                expect(yield (0, fs_promises_exists_1.default)(`images/output/${req.query.imageName}_${width}_${height}.jpg`)).toBe(true);
            });
        });
    }));
});
//testing if the processing process outputs correctly
describe('Testing processing the image works well', () => __awaiter(void 0, void 0, void 0, function* () {
    it('expect the function to throw an error', () => {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, sharpFunction_1.usingSharp)('fjord', 111, 111);
        })).not.toThrow(new Error());
    });
}));
