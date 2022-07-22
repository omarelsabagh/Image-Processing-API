"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const processing_controller_1 = __importDefault(require("./controller/processing.controller"));
const router = express_1.default.Router(); //creating a route for my end-point
router.get('/', processing_controller_1.default);
exports.default = router;
