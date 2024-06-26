import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ValidationErrorBuilder from '../../../utils/ValidationErrorBuilder';
import bcrypt from 'bcryptjs';
import User from "../../models/user";
import generateAccessToken from "../../../utils/generateAccessToken";
import axios from "axios";

const authController = {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const existingUser = await User.findOne({ where: { email: req.body.email } });
      if (existingUser) {
        const error = ValidationErrorBuilder
          .buildError(
            'Registration failed: User already exists',
            'not_unique', 'email',
            req.body.email,
            User.build()
          );
        return next(error);
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password: hashedPassword });
      const accessToken = generateAccessToken(user);

      const userWithoutPassword = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      res.status(StatusCodes.CREATED).json({
        user: userWithoutPassword,
        accessToken,
      });
    } catch (error) {
      console.error('Error in signup:', error);
      next(error);
    }
  },

  signin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });

      if (!user) {
        const error = ValidationErrorBuilder
          .buildError(
            'Login failed: Invalid email or password',
            'invalid_credentials',
            'credentials',
            req.body.email,
            User.build()
          );
        return next(error);
      }

      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

      if (!isPasswordValid) {
        const error = ValidationErrorBuilder
          .buildError(
            'Login failed: Invalid email or password',
            'invalid_credentials',
            'password',
            req.body.password,
            User.build()
          );
        return next(error);
      }

      const accessToken = generateAccessToken(user);

      const userWithoutPassword = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      res.status(StatusCodes.OK).json({
        user: userWithoutPassword,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },

  githubSignin: async (req: Request, res: Response, next: NextFunction) => {
    const { githubToken } = req.body;

    try {
      if (!githubToken) {
        const error = ValidationErrorBuilder
          .buildError(
            'Login failed: Invalid GitHub token',
            'invalid_credentials',
            'credentials',
            req.body.email,
            User.build()
          );
        return next(error);
      }

      const githubResponse = await axios.get(`${process.env.GITHUB_API_URL}`, {
        headers: { Authorization: `Bearer ${githubToken}` },
      });

      const githubUser = githubResponse.data;

      let user = await User.findOne({ where: { email: githubUser.email } });

      if (!user) {
        const error = ValidationErrorBuilder
          .buildError(
            'Login failed: User not found',
            'invalid_credentials',
            'credentials',
            req.body.email,
            User.build()
          );
        return next(error);
      }

      const accessToken = generateAccessToken(user);

      const userWithoutPassword = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      res.status(StatusCodes.OK).json({
        user: userWithoutPassword,
        accessToken,
      });
    } catch (error) {
      const errorResponse = ValidationErrorBuilder
        .buildError(
          'Login failed: Invalid GitHub token',
          'invalid_credentials',
          'credentials',
          req.body.email,
          User.build()
        );
      next(errorResponse);
    }
  },
};

export default authController;

