import multer from "multer";
import * as fs from "fs";

const imageStorage = multer.memoryStorage();
const videoStorage = multer.memoryStorage();

// image upload
export const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 3000000, // 1000000 Bytes = 1 MB
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|pdf|jpeg|jpe|jif)$/)) {

      return cb(new Error("Please select jpg or png Image"));
    }
    cb(undefined, true);
  },
});



// Video Upload
export const videoUpload = multer({
  storage: videoStorage,
  limits: {
  fileSize: 15000000 // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
       return cb(new Error('Please upload a video'))
    }
    cb(undefined, true)
 }
})


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

  // Uploaded Image save
export const videoSaveToServer = (req, res, next) => {
  const video = req.files.video[0];
  console.log(video)
  const vidPath = `in_video/${video.originalname}`;

  if (video.fieldname === "video") {
    const fileContents = new Buffer(video.buffer, "base64");
    fs.writeFile(`video_folder/${vidPath}`, fileContents, (err) => {
      if (err) return console.error(err);
    });
  }

  const newData = { ...req.body, vidPath };

  req.body = newData;
  next();
};
