import { NextFunction, Request, Response } from 'express';
import db from '../../models';
import { StatusCodes } from 'http-status-codes';
import ValidationErrorBuilder from "../../../utils/ValidationErrorBuilder";
import usePagination from "../../hooks/usePagination";

const userController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, pageSize, offset, condition } = usePagination(req, [ 'firstName', 'lastName', 'email' ]);

      const { count, rows } = await db.User.findAndCountAll({
        where: condition,
        offset,
        limit: pageSize
      });

      const usersWithoutPassword = rows.map((user: { toJSON: () => any; }) => {
        const userJson = user.toJSON();
        delete userJson.password;
        return userJson;
      });

      res.status(StatusCodes.OK).send({
        data: usersWithoutPassword,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / pageSize),
          totalItems: count,
          itemsPerPage: pageSize,
          links: {
            first: `/users?page=1&pageSize=${pageSize}`,
            last: `/users?page=${Math.ceil(count / pageSize)}&pageSize=${pageSize}`,
            prev: page > 1 ? `/users?page=${page - 1}&pageSize=${pageSize}` : null,
            next: page < Math.ceil(count / pageSize) ? `/users?page=${page + 1}&pageSize=${pageSize}` : null
          }
        },
        success: true,
        metadata: {
          message: []
        },
      });
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
