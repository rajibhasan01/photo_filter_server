"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bandboolEorImage = exports.bandboolOrImage = exports.bandboolAndImage = exports.extractChannelImage = exports.grayscaleImage = exports.tintImage = exports.lightnessImage = exports.hueImage = exports.brightnessImage = exports.recombImage = exports.convolveImage = exports.claheImage = exports.normalizeImage = exports.flattenImage = exports.medianImage = exports.sharpenImage = exports.affineImage = exports.flopImage = exports.flipImage = exports.overlayImage = exports.addTextOnImage = exports.blurImage = exports.rotateImage = exports.cropImage = exports.borderImage = exports.resizeImage = exports.getMetadata = void 0;
const sharp_1 = __importDefault(require("sharp"));
// get metadata
const getMetadata = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const metadata = yield (0, sharp_1.default)(`uploads/image_folder/in_images/${args.img}`).metadata();
    return metadata;
});
exports.getMetadata = getMetadata;
// Resize image
const resizeImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .resize({
            width: args === null || args === void 0 ? void 0 : args.width,
            height: args === null || args === void 0 ? void 0 : args.height,
        })
            .toFile(`./image/outputImage/resize_image_${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.resizeImage = resizeImage;
// Border image
const borderImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.imgPath != null) {
        const img = req.body.imgPath.split("/")[1];
        const args = Object.assign(Object.assign({}, req.body), { img });
        if ((args === null || args === void 0 ? void 0 : args.inside) === 1) {
            try {
                (0, exports.getMetadata)(args).then((resp) => {
                    args.width = resp.width - ((args === null || args === void 0 ? void 0 : args.left) + (args === null || args === void 0 ? void 0 : args.right));
                    args.height = resp.height - ((args === null || args === void 0 ? void 0 : args.top) + (args === null || args === void 0 ? void 0 : args.bottom));
                    (0, sharp_1.default)(`uploads/image_folder/in_images/${args.img}`)
                        .resize({ width: args === null || args === void 0 ? void 0 : args.width, height: args === null || args === void 0 ? void 0 : args.height })
                        .extend({
                        top: args === null || args === void 0 ? void 0 : args.top,
                        bottom: args === null || args === void 0 ? void 0 : args.bottom,
                        left: args === null || args === void 0 ? void 0 : args.left,
                        right: args === null || args === void 0 ? void 0 : args.right,
                        background: {
                            r: args === null || args === void 0 ? void 0 : args.color[0],
                            g: args === null || args === void 0 ? void 0 : args.color[1],
                            b: args === null || args === void 0 ? void 0 : args.color[2],
                            alpha: args === null || args === void 0 ? void 0 : args.color[3],
                        },
                    })
                        .toFile(`uploads/image_folder/out_images/${args.img}`)
                        .then(req.body.imgPath = `out_images/${args.img}`);
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                yield (0, sharp_1.default)(`uploads/image_folder/in_images/${args.img}`)
                    .extend({
                    top: args === null || args === void 0 ? void 0 : args.top,
                    bottom: args === null || args === void 0 ? void 0 : args.bottom,
                    left: args === null || args === void 0 ? void 0 : args.left,
                    right: args === null || args === void 0 ? void 0 : args.right,
                    background: {
                        r: args === null || args === void 0 ? void 0 : args.color[0],
                        g: args === null || args === void 0 ? void 0 : args.color[1],
                        b: args === null || args === void 0 ? void 0 : args.color[2],
                        alpha: args === null || args === void 0 ? void 0 : args.color[3],
                    },
                })
                    .toFile(`uploads/image_folder/out_images/${args.img}`)
                    .then(req.body.imgPath = `out_images/${args.img}`);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    yield next();
});
exports.borderImage = borderImage;
// Crop image
const cropImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .extract({
            width: args === null || args === void 0 ? void 0 : args.width,
            height: args === null || args === void 0 ? void 0 : args.height,
            left: args === null || args === void 0 ? void 0 : args.left,
            top: args === null || args === void 0 ? void 0 : args.top,
        })
            .toFile(`./image/outputImage/crop_image${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.cropImage = cropImage;
// Rotate image
const rotateImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .rotate(args === null || args === void 0 ? void 0 : args.deg)
            .toFile(`./image/outputImage/rotate_image${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.rotateImage = rotateImage;
// Blur image
const blurImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .blur(args === null || args === void 0 ? void 0 : args.blur_amount)
            .toFile(`./image/outputImage/blur_image${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.blurImage = blurImage;
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
const addTextOnImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const svgImage = `
    <svg width="${args === null || args === void 0 ? void 0 : args.width}" height="${args === null || args === void 0 ? void 0 : args.height}">
      <style>
      .title { fill: #001; font-size: 70px; font-weight: bold;}
      </style>
      <text x="50%" y="50%" text-anchor="middle" class="title">${args === null || args === void 0 ? void 0 : args.text}</text>
    </svg>
    `;
        const svgBuffer = Buffer.from(svgImage);
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .composite([
            {
                input: svgBuffer,
                top: 0,
                left: 0,
            },
        ])
            .toFile(`./image/outputImage/addText_image${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.addTextOnImage = addTextOnImage;
// Composite image
const overlayImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.background_img}`)
            // .rotate(180)
            // .resize(300)
            .flatten({ background: "#FFFFFF" })
            .composite([
            {
                input: `./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`,
                top: args === null || args === void 0 ? void 0 : args.top,
                left: args.left,
            },
        ])
            .sharpen()
            .withMetadata()
            .jpeg({ quality: 90 })
            .toFile(`./image/outputImage/overlay_image${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.overlayImage = overlayImage;
// Flip image
const flipImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .flip()
            .toFile(`./image/outputImage/flip_image${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.flipImage = flipImage;
// Flop image
const flopImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .flop()
            .toFile(`./image/outputImage/flop_image${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.flopImage = flopImage;
// Affine image
const affineImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .affine([
            [args === null || args === void 0 ? void 0 : args.x1, args === null || args === void 0 ? void 0 : args.y1],
            [args === null || args === void 0 ? void 0 : args.x2, args === null || args === void 0 ? void 0 : args.y2],
        ], {
            background: args === null || args === void 0 ? void 0 : args.bg,
            interpolate: sharp_1.default.interpolators.nohalo,
        })
            .toFile(`./image/outputImage/affine_image${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.affineImage = affineImage;
// Sharpen image
const sharpenImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .sharpen({
            sigma: args === null || args === void 0 ? void 0 : args.sigma,
            m1: args === null || args === void 0 ? void 0 : args.sharpen_m1,
            m2: args === null || args === void 0 ? void 0 : args.sharpen_m2,
            x1: args === null || args === void 0 ? void 0 : args.sharpen_x1,
            y2: args === null || args === void 0 ? void 0 : args.sharpen_y2,
            y3: args === null || args === void 0 ? void 0 : args.sharpen_y3,
        })
            .toFile(`./image/outputImage/sharpen_image${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sharpenImage = sharpenImage;
// Median image
const medianImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img_1}`)
            .median(args === null || args === void 0 ? void 0 : args.median)
            .toFile(`./image/outputImage/median_image${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.medianImage = medianImage;
// Flatten image
const flattenImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.background_img}`)
            .flatten({ background: args === null || args === void 0 ? void 0 : args.bg_color })
            .toFile(`./image/outputImage/flatten_image_${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.flattenImage = flattenImage;
// Normalize image
const normalizeImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img_1}`)
            .normalize(args === null || args === void 0 ? void 0 : args.contrast)
            .toFile(`./image/outputImage/normalize_image_${args === null || args === void 0 ? void 0 : args.img_1}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.normalizeImage = normalizeImage;
// Clahe image
const claheImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img_1}`)
            .clahe({
            width: args === null || args === void 0 ? void 0 : args.kernel_width,
            height: args === null || args === void 0 ? void 0 : args.kernel_height,
        })
            .toFile(`./image/outputImage/clahe_image_${args === null || args === void 0 ? void 0 : args.img_1}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.claheImage = claheImage;
// Convolve image
const convolveImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .convolve({
            width: 3,
            height: 3,
            kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
        })
            .toFile(`./image/outputImage/convolve_image_${args === null || args === void 0 ? void 0 : args.img_1}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.convolveImage = convolveImage;
// Recomb image
const recombImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const args = req.body.args;
    console.log('args new', args);
    try {
        yield (0, sharp_1.default)(args.img.buffer)
            .recomb([
            [args === null || args === void 0 ? void 0 : args.a[0], args === null || args === void 0 ? void 0 : args.a[1], args === null || args === void 0 ? void 0 : args.a[2]],
            [args === null || args === void 0 ? void 0 : args.b[0], args === null || args === void 0 ? void 0 : args.b[1], args === null || args === void 0 ? void 0 : args.b[2]],
            [args === null || args === void 0 ? void 0 : args.c[0], args === null || args === void 0 ? void 0 : args.c[1], args === null || args === void 0 ? void 0 : args.c[2]],
        ])
            .png()
            .toFile(`uploads/image_folder/sample_images/sample_${args.number}.png`);
    }
    catch (error) {
        console.log(error);
    }
    next();
});
exports.recombImage = recombImage;
// Brightness image
const brightnessImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .modulate({
            brightness: args === null || args === void 0 ? void 0 : args.brightness,
        })
            .toFile(`./image/outputImage/brightness_image_${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.brightnessImage = brightnessImage;
// Hue image
const hueImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .modulate({
            hue: args === null || args === void 0 ? void 0 : args.hue,
        })
            .toFile(`./image/outputImage/hue_image_${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.hueImage = hueImage;
// Lightness image
const lightnessImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img_1}`)
            .modulate({
            lightness: args === null || args === void 0 ? void 0 : args.lightness,
        })
            .toFile(`./image/outputImage/lightness_image_${args === null || args === void 0 ? void 0 : args.img_1}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.lightnessImage = lightnessImage;
// Tint image
const tintImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.imgPath != null) {
        const img = req.body.imgPath.split("/")[1];
        const args = Object.assign(Object.assign({}, req.body), { img });
        try {
            yield (0, sharp_1.default)(`uploads/image_folder/in_images/${args.img}`)
                .tint({ r: args === null || args === void 0 ? void 0 : args.color[0], g: args === null || args === void 0 ? void 0 : args.color[1], b: args === null || args === void 0 ? void 0 : args.color[2] })
                .toFile(`uploads/image_folder/out_images/${args.img}`);
        }
        catch (error) {
            console.log(error);
        }
        req.body.imgPath = `out_images/${args.img}`;
    }
    next();
});
exports.tintImage = tintImage;
// Grayscale image
const grayscaleImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const img = req.body.imgPath.split("/")[1];
    const args = Object.assign(Object.assign({}, req.body), { img });
    try {
        yield (0, sharp_1.default)(`uploads/image_folder/in_images/${args.img}`)
            .greyscale(args === null || args === void 0 ? void 0 : args.grayscale)
            .toFile(`uploads/image_folder/out_images/${args.img}`);
    }
    catch (error) {
        console.log(error);
    }
    req.body.imgPath = `out_images/${args.img}`;
    next();
});
exports.grayscaleImage = grayscaleImage;
// ExtractChannel image
const extractChannelImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .extractChannel(args === null || args === void 0 ? void 0 : args.extractChannel)
            .toFile(`./image/outputImage/extractChannel_image_${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.extractChannelImage = extractChannelImage;
// Bandbool And Operation image
const bandboolAndImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .bandbool(sharp_1.default.bool.and)
            .toFile(`./image/outputImage/bandbool_image_${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.bandboolAndImage = bandboolAndImage;
// Bandbool Or Operation image
const bandboolOrImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .bandbool(sharp_1.default.bool.or)
            .toFile(`./image/outputImage/bandbool_or_image_${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.bandboolOrImage = bandboolOrImage;
// Bandbool EOR Operation image
const bandboolEorImage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(`./image/inputImage/${args === null || args === void 0 ? void 0 : args.img}`)
            .bandbool(sharp_1.default.bool.eor)
            .toFile(`./image/outputImage/bandbool_eor_image_${args === null || args === void 0 ? void 0 : args.img}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.bandboolEorImage = bandboolEorImage;
//# sourceMappingURL=service.photo.edit.js.map