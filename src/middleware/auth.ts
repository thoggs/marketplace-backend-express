import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import ValidationErrorBuilder from "../utils/ValidationErrorBuilder";
import User from "../models/user";

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: Express.User | undefined) => {
    if (err || !user) {
      const error = ValidationErrorBuilder
        .buildError(
          'Authentication Failed: Unable to verify credentials. Access denied.',
          'unauthorized',
          'authorization',
          req.body.email,
          User.build()
        );
      return next(error);
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authenticateJwt;
