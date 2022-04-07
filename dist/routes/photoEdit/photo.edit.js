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
const photoRoute = express_1.default.Router();
// Upload Image API
photoRoute.post("/upload", up.imageUpload.fields([{ name: "image", maxCount: 1 }]), up.fileSaveToServer, sample.sampleFileGeneration, (req, res, nxt) => {
    const path = { imgPath: req.body.imgPath, filter_1: 'sample_images/sample_1.png', filter_2: 'sample_images/sample_2.png', filter_3: 'sample_images/sample_3.png', filter_4: 'sample_images/sample_4.png' };
    res.send(path);
});
// Border Creating API
photoRoute.post("/border", edit.borderImage, (req, res) => {
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
module.exports = photoRoute;
//# sourceMappingURL=photo.edit.js.map