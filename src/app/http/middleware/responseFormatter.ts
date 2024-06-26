import { Request, Response, NextFunction } from 'express';
import { ResponseDto } from '../../../dto/responseDto';

const responseFormatter = (_req: Request, res: Response, next: NextFunction) => {
  const oldJson = res.json.bind(res);

  res.json = function (body: any) {
    if (res.headersSent) {
      return oldJson(body);
    }

    if (body && body.data !== undefined && body.success !== undefined && body.metadata !== undefined) {
      return oldJson(body);
    }

    if (body && body.success === false) {
      return oldJson(body);
    }

    const formattedResponse: ResponseDto<any> = {
      data: body,
      success: true,
      metadata: {
        message: []
      }
    };

    return oldJson(formattedResponse);
  };

  next();
};

export default responseFormatter;
