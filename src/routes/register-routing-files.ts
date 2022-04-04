import express from "express";
import photoRoute from "./photoEdit/photo.edit";
import videoRoute from "./videoEdit/video.edit";

const registeredRouters = express.Router();

registeredRouters.use("/img/", photoRoute);
registeredRouters.use("/vid/", videoRoute);

export = registeredRouters;