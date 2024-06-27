import { NextFunction, Request, Response } from 'express';
import db from '../../models';
import { StatusCodes } from 'http-status-codes';
import ValidationErrorBuilder from "../../../utils/validationErrorBuilder";
import usePagination from "../../hooks/usePagination";

const productController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, pageSize, offset, condition } = usePagination(req, [ 'name', 'description', 'category' ]);

      const { count, rows } = await db.Product.findAndCountAll({
        where: condition,
        offset,
        limit: pageSize
      });

      res.status(StatusCodes.OK).send({
        data: rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / pageSize),
          totalItems: count,
          itemsPerPage: pageSize,
          links: {
            first: `/products?page=1&pageSize=${pageSize}`,
            last: `/products?page=${Math.ceil(count / pageSize)}&pageSize=${pageSize}`,
            prev: page > 1 ? `/products?page=${page - 1}&pageSize=${pageSize}` : null,
            next: page < Math.ceil(count / pageSize) ? `/products?page=${page + 1}&pageSize=${pageSize}` : null
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
      if ('id' in req.body) delete req.body.id;
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
