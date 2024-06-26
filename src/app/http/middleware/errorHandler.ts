import { Request, Response, NextFunction } from 'express';
import { ResponseDto } from '../../../dto/responseDto';
import { StatusCodes } from 'http-status-codes';
import formatSequelizeError from "../../../utils/formatSequelizeError";

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const formattedErrors = formatSequelizeError(err);

  const response: ResponseDto<any> = {
    data: [],
    success: false,
    metadata: {
      message: formattedErrors,
    },
  };

  res.status(err.status || StatusCodes.BAD_REQUEST).json(response);
};

export default errorHandler;
