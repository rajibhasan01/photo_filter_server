"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const fileUpload_1 = require("../../validation/fileUpload");
const photoRoute = express_1.default.Router();
// Post new leave api
photoRoute.post("/blur", fileUpload_1.imageUpload.fields([{ name: "image", maxCount: 1 }]), fileUpload_1.fileSaveToServer, (req, res, nxt) => {
    res.send("hello i am here");
});
module.exports = photoRoute;
//# sourceMappingURL=photo.edit.js.map