import sharp from "sharp";

// get metadata
export const getMetadata = async (args) => {
  const metadata = await sharp(`uploads/image_folder/in_images/${args.img}`).metadata();

  return metadata;
};

// Resize image
export const resizeImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .resize({
        width: args?.width,
        height: args?.height,
      })
      .toFile(`./image/outputImage/resize_image_${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Border image
export const borderImage = async (req, res, next) => {
  if (req.body.imgPath != null) {
    const img = req.body.imgPath.split("/")[1];
    const args = { ...req.body, img };

    if (args?.inside === 1) {
      try {
        getMetadata(args).then((resp) => {
          args.width = resp.width - (args?.left + args?.right);
          args.height = resp.height - (args?.top + args?.bottom);

          sharp(`uploads/image_folder/in_images/${args.img}`)
            .resize({ width: args?.width, height: args?.height })
            .extend({
              top: args?.top,
              bottom: args?.bottom,
              left: args?.left,
              right: args?.right,
              background: {
                r: args?.color[0],
                g: args?.color[1],
                b: args?.color[2],
                alpha: args?.color[3],
              },
            })
            .toFile(`uploads/image_folder/out_images/${args.img}`)
            .then(req.body.imgPath = `out_images/${args.img}`)
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await sharp(`uploads/image_folder/in_images/${args.img}`)
          .extend({
            top: args?.top,
            bottom: args?.bottom,
            left: args?.left,
            right: args?.right,
            background: {
              r: args?.color[0],
              g: args?.color[1],
              b: args?.color[2],
              alpha: args?.color[3],
            },
          })
          .toFile(`uploads/image_folder/out_images/${args.img}`)
          .then(req.body.imgPath = `out_images/${args.img}`)
      } catch (error) {
        console.log(error);
      }
    }
  }
  await next();
};

// Crop image
export const cropImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .extract({
        width: args?.width,
        height: args?.height,
        left: args?.left,
        top: args?.top,
      })
      .toFile(`./image/outputImage/crop_image${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Rotate image
export const rotateImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .rotate(args?.deg)
      .toFile(`./image/outputImage/rotate_image${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Blur image
export const blurImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .blur(args?.blur_amount)
      .toFile(`./image/outputImage/blur_image${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// // Composite image
// export const compositeImages = async (args) => {
//     try {
//         await sharp(`./image/inputImage/${args?.background_img}`)
//         .composite([
//             {
//               input: `./image/inputImage/${args?.img}`,
//               top: args?.top,
//               left: args.left,
//             },
//           ])
//         .toFile(`./image/outputImage/composite_image${args?.img}`);
//     } catch (error) {
//       console.log(error);
//     }
// }

// Add text on image
export const addTextOnImage = async (args) => {
  try {
    const svgImage = `
    <svg width="${args?.width}" height="${args?.height}">
      <style>
      .title { fill: #001; font-size: 70px; font-weight: bold;}
      </style>
      <text x="50%" y="50%" text-anchor="middle" class="title">${args?.text}</text>
    </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    await sharp(`./image/inputImage/${args?.img}`)
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .toFile(`./image/outputImage/addText_image${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Composite image
export const overlayImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.background_img}`)
      // .rotate(180)
      // .resize(300)
      .flatten({ background: "#FFFFFF" })
      .composite([
        {
          input: `./image/inputImage/${args?.img}`,
          top: args?.top,
          left: args.left,
        },
      ])
      .sharpen()
      .withMetadata()
      .jpeg({ quality: 90 })
      .toFile(`./image/outputImage/overlay_image${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Flip image
export const flipImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .flip()
      .toFile(`./image/outputImage/flip_image${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Flop image
export const flopImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .flop()
      .toFile(`./image/outputImage/flop_image${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Affine image
export const affineImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .affine(
        [
          [args?.x1, args?.y1],
          [args?.x2, args?.y2],
        ],
        {
          background: args?.bg,
          interpolate: sharp.interpolators.nohalo,
        }
      )
      .toFile(`./image/outputImage/affine_image${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Sharpen image
export const sharpenImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .sharpen({
        sigma: args?.sigma,
        m1: args?.sharpen_m1,
        m2: args?.sharpen_m2,
        x1: args?.sharpen_x1,
        y2: args?.sharpen_y2,
        y3: args?.sharpen_y3,
      })
      .toFile(`./image/outputImage/sharpen_image${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Median image
export const medianImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img_1}`)
      .median(args?.median)
      .toFile(`./image/outputImage/median_image${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Flatten image
export const flattenImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.background_img}`)
      .flatten({ background: args?.bg_color })
      .toFile(`./image/outputImage/flatten_image_${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Normalize image
export const normalizeImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img_1}`)
      .normalize(args?.contrast)
      .toFile(`./image/outputImage/normalize_image_${args?.img_1}`);
  } catch (error) {
    console.log(error);
  }
};

// Clahe image
export const claheImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img_1}`)
      .clahe({
        width: args?.kernel_width,
        height: args?.kernel_height,
      })
      .toFile(`./image/outputImage/clahe_image_${args?.img_1}`);
  } catch (error) {
    console.log(error);
  }
};

// Convolve image
export const convolveImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .convolve({
        width: 3,
        height: 3,
        kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
      })
      .toFile(`./image/outputImage/convolve_image_${args?.img_1}`);
  } catch (error) {
    console.log(error);
  }
};

// Recomb image
export const recombImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .recomb([
        [args?.a[0], args?.a[1], args?.a[2]],
        [args?.b[0], args?.b[1], args?.b[2]],
        [args?.c[0], args?.c[1], args?.c[2]],
      ])
      .toFile(`./image/outputImage/recomb_image_${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Brightness image
export const brightnessImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .modulate({
        brightness: args?.brightness,
      })
      .toFile(`./image/outputImage/brightness_image_${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Hue image
export const hueImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .modulate({
        hue: args?.hue,
      })
      .toFile(`./image/outputImage/hue_image_${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Lightness image
export const lightnessImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img_1}`)
      .modulate({
        lightness: args?.lightness,
      })
      .toFile(`./image/outputImage/lightness_image_${args?.img_1}`);
  } catch (error) {
    console.log(error);
  }
};

// Tint image
export const tintImage = async (req,res,next) => {

  if (req.body.imgPath != null) {
      const img = req.body.imgPath.split("/")[1];
      const args = { ...req.body, img };
      try {
      await sharp(`uploads/image_folder/in_images/${args.img}`)
        .tint({ r: args?.color[0], g: args?.color[1], b: args?.color[2] })
        .toFile(`uploads/image_folder/out_images/${args.img}`);
      } catch (error) {
      console.log(error);
    }
    req.body.imgPath = `out_images/${args.img}`;
  }

  next();

};

// Grayscale image
export const grayscaleImage = async (req,res,next) => {
  const img = req.body.imgPath.split("/")[1];
  const args = { ...req.body, img };
  try {
    await sharp(`uploads/image_folder/in_images/${args.img}`)
      .greyscale(args?.grayscale)
      .toFile(`uploads/image_folder/out_images/${args.img}`);
  } catch (error) {
    console.log(error);
  }
  req.body.imgPath = `out_images/${args.img}`;

  next();
};

// ExtractChannel image
export const extractChannelImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .extractChannel(args?.extractChannel)
      .toFile(`./image/outputImage/extractChannel_image_${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Bandbool And Operation image
export const bandboolAndImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .bandbool(sharp.bool.and)
      .toFile(`./image/outputImage/bandbool_image_${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Bandbool Or Operation image
export const bandboolOrImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .bandbool(sharp.bool.or)
      .toFile(`./image/outputImage/bandbool_or_image_${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};

// Bandbool EOR Operation image
export const bandboolEorImage = async (args) => {
  try {
    await sharp(`./image/inputImage/${args?.img}`)
      .bandbool(sharp.bool.eor)
      .toFile(`./image/outputImage/bandbool_eor_image_${args?.img}`);
  } catch (error) {
    console.log(error);
  }
};
