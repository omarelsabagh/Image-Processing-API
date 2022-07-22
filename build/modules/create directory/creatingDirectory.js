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
exports.creatingDir = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const fs_promises_exists_1 = __importDefault(require("fs.promises.exists"));
function creatingDir() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield (0, fs_promises_exists_1.default)('images/output')) == false) {
            //checking if the directory is already created
            fs_extra_1.default.ensureDir('images/output'); //create the directory
        }
    });
}
exports.creatingDir = creatingDir;
