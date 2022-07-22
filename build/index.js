"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const processing_router_1 = __importDefault(require("./modules/processing/processing.router"));
//creating server
const app = (0, express_1.default)();
exports.app = app;
const port = 3000;
app.use(processing_router_1.default);
app.listen(port);
