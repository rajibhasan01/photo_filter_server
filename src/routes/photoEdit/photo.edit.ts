import express from "express";
import sharp from "sharp";
import * as up from "../../validation/fileUpload";
import * as edit from "../../services/service.photo.edit";
import * as sample from "../../validation/sample.generate"

const photoRoute = express.Router();

// Upload Image API
photoRoute.post(
  "/upload",
  up.imageUpload.fields([{ name: "image", maxCount: 1 }]),
  up.fileSaveToServer,
  sample.sampleFileGeneration,
  (req, res, nxt) => {
    const path = { imgPath: req.body.imgPath, filter_1: 'sample_images/sample_1.png', filter_2: 'sample_images/sample_2.png', filter_3: 'sample_images/sample_3.png', filter_4: 'sample_images/sample_4.png'};
    res.send(path);
  }
);

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


export = photoRoute;
