import { NextFunction, Request, Response } from 'express';
import db from '../models';
import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import ValidationErrorBuilder from "../utils/ValidationErrorBuilder";

const productController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { term } = req.query;
      const condition = term
        ? {
          [Op.or]: [
            { name: { [Op.like]: `%${term}%` } },
            { description: { [Op.like]: `%${term}%` } },
            { category: { [Op.like]: `%${term}%` } },
          ],
        }
        : {};

      const products = await db.Product.findAll({ where: condition });
      res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await db.Product.create(req.body);
      res.status(StatusCodes.CREATED).json(product);
    } catch (error) {
      next(error);
    }
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await db.Product.findByPk(req.params.id);
      if (product) {
        res.status(StatusCodes.OK).json(product);
      } else {
        const error = ValidationErrorBuilder
          .buildError('Product not found', 'not_found', 'id', req.params.id, db.Product.build());
        return next(error);
      }
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await db.Product.findByPk(req.params.id);
      if (!product) {
        const error = ValidationErrorBuilder
          .buildError('Product not found', 'not_found', 'id', req.params.id, db.Product.build());
        return next(error);
      }

      const [ updated ] = await db.Product.update(req.body, {
        where: { id: req.params.id },
      });

      if (updated) {
        const updatedProduct = await db.Product.findByPk(req.params.id);
        res.status(StatusCodes.OK).json(updatedProduct);
      } else {
        const error = ValidationErrorBuilder
          .buildError('Update failed', 'update_failed', 'id', req.params.id, product);
        return next(error);
      }
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await db.Product.findByPk(req.params.id);
      if (product) {
        await product.destroy();
        res.status(StatusCodes.OK).json(product);
      } else {
        const error = ValidationErrorBuilder
          .buildError('Product not found', 'not_found', 'id', req.params.id, db.Product.build());
        return next(error);
      }
    } catch (error) {
      next(error);
    }
  }
};

export default productController;
