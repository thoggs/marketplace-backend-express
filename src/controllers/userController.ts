import { NextFunction, Request, Response } from 'express';
import db from '../models';
import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import ValidationErrorBuilder from "../utils/ValidationErrorBuilder";

const userController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { term } = req.body;
      const condition = term
        ? {
          [Op.or]: [
            { firstName: { [Op.like]: `%${term}%` } },
            { lastName: { [Op.like]: `%${term}%` } },
            { email: { [Op.like]: `%${term}%` } },
          ],
        }
        : {};

      const users = await db.User.findAll({ where: condition });

      const usersWithoutPassword = users.map((user: { toJSON: () => any; }) => {
        const userJson = user.toJSON();
        delete userJson.password;
        return userJson;
      });

      res.status(StatusCodes.OK).send(usersWithoutPassword);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await db.User.create(req.body);
      res.status(StatusCodes.CREATED).send(user);
    } catch (error) {
      next(error);
    }
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await db.User.findByPk(req.params.id);
      if (user) {
        res.status(StatusCodes.OK).json(user);
      } else {
        const error = ValidationErrorBuilder
          .buildError('User not found', 'not_found', 'id', req.params.id, db.User.build());
        return next(error);
      }
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await db.User.findByPk(req.params.id);
      if (!user) {
        const error = ValidationErrorBuilder
          .buildError('User not found', 'not_found', 'id', req.params.id, db.User.build());
        return next(error);
      }

      const [ updated ] = await db.User.update(req.body, {
        where: { id: req.params.id },
      });

      if (updated) {
        const updatedUser = await db.User.findByPk(req.params.id);
        res.status(StatusCodes.OK).json(updatedUser);
      } else {
        const error = ValidationErrorBuilder
          .buildError('Update failed', 'update_failed', 'id', req.params.id, user);
        return next(error);
      }
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await db.User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.status(StatusCodes.OK).json(user);
      } else {
        const error = ValidationErrorBuilder
          .buildError('User not found', 'not_found', 'id', req.params.id, db.User.build());
        return next(error);
      }
    } catch (error) {
      next(error);
    }
  }
};

export default userController;
