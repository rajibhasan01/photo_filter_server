import express from "express";
import sharp from "sharp";
import * as up from "../../validation/fileUpload";
import * as edit from "../../services/service.photo.edit";

const photoRoute = express.Router();

// Post new image upload api
photoRoute.post(
  "/upload",
  up.imageUpload.fields([{ name: "image", maxCount: 1 }]),
  up.fileSaveToServer,
  (req, res, nxt) => {
    res.send({ imgPath: req.body.imgPath });
  }
);

photoRoute.post("/border", edit.borderImage, (req, res) => {
  res.send({ imgPath: req.body.imgPath });
});

photoRoute.post("/gray", edit.grayscaleImage, (req, res) => {
  res.send({ imgPath: req.body.imgPath });
});

photoRoute.post("/tint", edit.tintImage, (req, res) => {
  res.send({ imgPath: req.body.imgPath });
});

// // Resize
// photoRoute.post('/resize', async (req, res) => {
// 	const form = formidable();
// 	form.parse(req, (err, fields, files) => {
// 		if (err) {
// 			next(err);
// 			return;
// 		}
// 		const imageInput = files.image.path;
// 		const contentType = files.image.type;

// 		console.log("imageInput", imageInput);
// 		sharp(imageInput)
// 			.resize(512, 512)
// 			.png()
// 			.toBuffer()
// 			.then((data) => {
// 				const base64Data = data.toString('base64');
// 				res.status(202).json({ b64Data: base64Data, contentType: contentType, extension: 'png' });
// 				res.send(base64Data);
// 			})
// 			.catch((err) => console.log(err));
// 	});
// });

export = photoRoute;
