import express from "express";
import * as up from "../../validation/fileUpload";

const videoRoute = express.Router();

// Post new video upload api
videoRoute.post(
  "/uploadVideo",
  up.videoUpload.fields([{ name: "video", maxCount: 1 }]),
  up.videoSaveToServer,
  (req: any, res) => {
    res.send("vidoe upload done");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

export = videoRoute;
