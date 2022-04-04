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
exports.fileSaveToServer = exports.imageUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs = __importStar(require("fs"));
const imageStorage = multer_1.default.memoryStorage();
exports.imageUpload = (0, multer_1.default)({
    storage: imageStorage,
    limits: {
        fileSize: 3000000, // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        // if (!file.originalname.match(/\.(png|jpg|pdf|jpeg|jpe|jif)$/)) {
        //   return cb(new Error("Please select jpg or png Image"));
        // }
        cb(undefined, true);
    },
});
const fileSaveToServer = (req, res, next) => {
    const image = req.files.image[0];
    console.log(image);
    const imgPath = `in_images/${image.originalname}`;
    if (image.fieldname === "image") {
        const fileContents = new Buffer(image.buffer, "base64");
        fs.writeFile(`image_folder/${imgPath}`, fileContents, (err) => {
            if (err)
                return console.error(err);
        });
    }
    const newData = Object.assign(Object.assign({}, req.body), { imgPath });
    req.body = newData;
    next();
};
exports.fileSaveToServer = fileSaveToServer;
//# sourceMappingURL=fileUpload.js.map