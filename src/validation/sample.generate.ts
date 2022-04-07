import * as edit from "../services/service.photo.edit";

export const sampleFileGeneration = (req, res, next) => {
  const a1 = [0.5, 0.5, 0.34];
  const b1 = [0.33, 0.54, 0.2];
  const c1 = [0.59, 0.75, 0.4];

  const b2 = [0.789, 0.5, 0.34];
  const a2 = [0.33, 0.54, 0.9];
  const c2 = [0.59, 0.75, 0.4];

  const a3 = [0.789, 0.5, 0.34];
  const c3 = [0.33, 0.54, 0.9];
  const b3 = [0.59, 0.75, 0.4];

  const c4 = [0.01, 0.5, 0.2];
  const b4 = [0.33, 0.54, 0.1];
  const a4 = [0.59, 0.75, 0.4];

  const frmt = req.body.imgPath.split(".")[1];
  const img = req.files.image[0];
  req.body.args = { img, a:a1, b:b1, c:c1, frmt, number: 1 };
  edit.recombImage(req, res, next);

  req.body.args = { img, a:a2, b:b2, c:c2, frmt, number: 2 };
  edit.recombImage(req, res, next);

  req.body.args = { img, a:a3, b:b3, c:c3, frmt, number: 3 };
  edit.recombImage(req, res, next);

  req.body.args = { img, a:a4, b:b4, c:c4, frmt, number: 4 };
  edit.recombImage(req, res, next);
  next();
};
