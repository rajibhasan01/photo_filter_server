import express from "express";
import sharp from "sharp";
import * as up from "../../validation/fileUpload";
import * as edit from "../../services/service.photo.edit";
import * as sample from "../../validation/sample.generate"
import { execSync } from 'child_process';


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
  console.log("border value", req.body);
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

// Sharpen Image API
photoRoute.post("/sharpen", edit.sharpenImage, (req, res) => {
  res.send({ imgPath: req.body.imgPath });
});

// Custom Filter Image API
photoRoute.post("/custom_filter", edit.customizeFilter, (req, res) => {
  res.send({ imgPath: req.body.imgPath });
});

// Background Remove Image API
photoRoute.post("/remove_bg", (req, res) => {

  const img = req.body.imgPath.split('/')[1];
  execSync(`rembg i uploads/image_folder/in_images/${img} uploads/image_folder/remove_bg/${img}`, { encoding: 'utf-8' });
  res.send({imgPath:`remove_bg/${img}`});
});


// Background Remove Image API
photoRoute.post("/stroke", (req, res) => {
  console.log("Clicking");

  const img = req.body.imgPath.split('/')[1];
  const stroke = req.body.stroke;
  execSync(`python python/stroke.py ${img} ${stroke}`, { encoding: 'utf-8' });
  res.send({imgPath:`out_images/${img}`});
});

export = photoRoute;
