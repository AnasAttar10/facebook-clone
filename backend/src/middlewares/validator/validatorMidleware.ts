import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validatorMidleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
  } else {
    next();
  }
};

export default validatorMidleware;
