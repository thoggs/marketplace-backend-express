import { Request, Response } from 'express';

const healthController = {
  healthCheck: (_: Request, res: Response) => {
    res.send('Server is running');
  }
};

export default healthController;