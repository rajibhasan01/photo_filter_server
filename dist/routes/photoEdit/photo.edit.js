"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const up = __importStar(require("../../validation/fileUpload"));
const edit = __importStar(require("../../services/service.photo.edit"));
const sample = __importStar(require("../../validation/sample.generate"));
const child_process_1 = require("child_process");
const photoRoute = express_1.default.Router();
// Upload Image API
photoRoute.post("/upload", up.imageUpload.fields([{ name: "image", maxCount: 1 }]), up.fileSaveToServer, sample.sampleFileGeneration, (req, res, nxt) => {
    const path = { imgPath: req.body.imgPath, filter_1: 'sample_images/sample_1.png', filter_2: 'sample_images/sample_2.png', filter_3: 'sample_images/sample_3.png', filter_4: 'sample_images/sample_4.png' };
    res.send(path);
});
// Border Creating API
photoRoute.post("/border", edit.borderImage, (req, res) => {
    console.log("border value", req.body);
    res.send({ imgPath: req.body.imgPath });
});
// Gray Scale Convert API
photoRoute.post("/gray", edit.grayscaleImage, (req, res) => {
    res.send({ imgPath: req.body.imgPath });
});
// Tint Image API
photoRoute.post("/tint", edit.tintImage, (req, res) => {
    res.send({ imgPath: req.body.imgPath });
});
// Sharpen Image API
photoRoute.post("/sharpen", edit.sharpenImage, (req, res) => {
    res.send({ imgPath: req.body.imgPath });
});
// Custom Filter Image API
photoRoute.post("/custom_filter", edit.customizeFilter, (req, res) => {
    res.send({ imgPath: req.body.imgPath });
});
// Background Remove Image API
photoRoute.post("/remove_bg", (req, res) => {
    const img = req.body.imgPath.split('/')[1];
    (0, child_process_1.execSync)(`rembg i uploads/image_folder/in_images/${img} uploads/image_folder/remove_bg/${img}`, { encoding: 'utf-8' });
    res.send({ imgPath: `remove_bg/${img}` });
});
// Background Remove Image API
photoRoute.post("/stroke", (req, res) => {
    console.log("Clicking");
    const img = req.body.imgPath.split('/')[1];
    const stroke = req.body.stroke;
    (0, child_process_1.execSync)(`python python/stroke.py ${img} ${stroke}`, { encoding: 'utf-8' });
    res.send({ imgPath: `out_images/${img}` });
});
// Sketch Image API
photoRoute.post("/sketch", (req, res) => {
    console.log("Clicking sketch");
    const img = req.body.imgPath.split('/')[1];
    const sketch = req.body.sketch;
    const sigma = req.body.sigma;
    (0, child_process_1.execSync)(`python python/sketch.py ${img} ${sketch} ${sigma}`, { encoding: 'utf-8' });
    res.send({ imgPath: `out_images/${img}` });
});
module.exports = photoRoute;
//# sourceMappingURL=photo.edit.js.map