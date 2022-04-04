import multer from "multer";
import * as fs from "fs";

const imageStorage = multer.memoryStorage();

export const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 3000000, // 1000000 Bytes = 1 MB
  },

  fileFilter(req, file, cb) {
    // if (!file.originalname.match(/\.(png|jpg|pdf|jpeg|jpe|jif)$/)) {

    //   return cb(new Error("Please select jpg or png Image"));
    // }
    cb(undefined, true);
  },
});


// Uploaded Image save
export const fileSaveToServer = (req, res, next) => {
    const image = req.files.image[0];
    const imgPath = `in_images/${image.originalname}`;

    if (image.fieldname === "image") {
      const fileContents = new Buffer(image.buffer, "base64");
      fs.writeFile(`image_folder/${imgPath}`, fileContents, (err) => {
        if (err) return console.error(err);
      });
    }

    const newData = { ...req.body, imgPath };

    req.body = newData;
    next();
  };
