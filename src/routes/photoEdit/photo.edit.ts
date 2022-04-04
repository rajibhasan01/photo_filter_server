import express from "express";
import { imageUpload, fileSaveToServer } from "../../validation/fileUpload";

const photoRoute = express.Router();

// Post new leave api
photoRoute.post(
  "/blur",
  imageUpload.fields([{ name: "image", maxCount: 1 }]),
  fileSaveToServer,
  (req, res, nxt) => {
    res.send("hello i am here");
  }
);

export = photoRoute;
