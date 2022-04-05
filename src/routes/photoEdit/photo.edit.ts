import express from "express";
import * as up from "../../validation/fileUpload";

const photoRoute = express.Router();

// Post new image upload api
photoRoute.post(
  "/upload",
  up.imageUpload.fields([{ name: "image", maxCount: 1 }]),
  up.fileSaveToServer,
  (req, res, nxt) => {
    res.send({msg: "hello i am here"});
  }
);

export = photoRoute;
