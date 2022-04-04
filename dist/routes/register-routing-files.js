"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const photo_edit_1 = __importDefault(require("./photoEdit/photo.edit"));
const registeredRouters = express_1.default.Router();
registeredRouters.use("/img/", photo_edit_1.default);
module.exports = registeredRouters;
//# sourceMappingURL=register-routing-files.js.map