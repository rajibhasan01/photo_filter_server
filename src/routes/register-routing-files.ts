import express from "express";
import photoRoute from "./photoEdit/photo.edit";

const registeredRouters = express.Router();

registeredRouters.use("/img/", photoRoute);

export = registeredRouters;