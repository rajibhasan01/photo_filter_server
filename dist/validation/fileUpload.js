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
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoSaveToServer = exports.fileSaveToServer = exports.videoUpload = exports.imageUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs = __importStar(require("fs"));
const imageStorage = multer_1.default.memoryStorage();
const videoStorage = multer_1.default.memoryStorage();
// image upload
exports.imageUpload = (0, multer_1.default)({
    storage: imageStorage,
    limits: {
        fileSize: 3000000, // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|pdf|jpeg|jpe|jif)$/)) {
            return cb(new Error("Please select jpg or png Image"));
        }
        cb(undefined, true);
    },
});
// Video Upload
exports.videoUpload = (0, multer_1.default)({
    storage: videoStorage,
    limits: {
        fileSize: 15000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        // upload only mp4 and mkv format
        if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
            return cb(new Error('Please upload a video'));
        }
        cb(undefined, true);
    }
});
// Uploaded Image save
const fileSaveToServer = (req, res, next) => {
    const image = req.files.image[0];
    const imgPath = `in_images/${image.originalname}`;
    if (image.fieldname === "image") {
        const fileContents = new Buffer(image.buffer, "base64");
        fs.writeFile(`uploads/image_folder/${imgPath}`, fileContents, (err) => {
            if (err)
                return console.error(err);
        });
    }
    const newData = Object.assign(Object.assign({}, req.body), { imgPath });
    req.body = newData;
    next();
};
exports.fileSaveToServer = fileSaveToServer;
// Uploaded Image save
const videoSaveToServer = (req, res, next) => {
    const video = req.files.video[0];
    console.log(video);
    const vidPath = `in_video/${video.originalname}`;
    if (video.fieldname === "video") {
        const fileContents = new Buffer(video.buffer, "base64");
        fs.writeFile(`uploads/video_folder/${vidPath}`, fileContents, (err) => {
            if (err)
                return console.error(err);
        });
    }
    const newData = Object.assign(Object.assign({}, req.body), { vidPath });
    req.body = newData;
    next();
};
exports.videoSaveToServer = videoSaveToServer;
//# sourceMappingURL=fileUpload.js.map