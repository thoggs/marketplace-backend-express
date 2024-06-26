import { Request } from 'express';
import { Op } from "sequelize";

function usePagination(req: Request, searchFields: string[]): {
  page: number,
  pageSize: number,
  offset: number,
  condition: any
} {
  const term = req.query.term as string;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const offset = (page - 1) * pageSize;

  const condition = term ? {
    [Op.or]: searchFields.map(field => ({ [field]: { [Op.like]: `%${term}%` } })),
  } : {};

  return { page, pageSize, offset, condition };
}

export default usePagination;