import { Request } from 'express';
import { Op } from "sequelize";

type SortingParam = {
  id: string;
  desc: boolean;
}

function usePagination(req: Request, searchFields: string[]): {
  page: number,
  pageSize: number,
  offset: number,
  condition: any,
  order: [ string, 'ASC' | 'DESC' ][]
} {
  const term = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const offset = (page - 1) * pageSize;

  let order: [ string, 'ASC' | 'DESC' ][] = [];
  const sortingParam = req.query.sorting as string;
  if (sortingParam) {
    try {
      const sorting: SortingParam[] = JSON.parse(decodeURIComponent(sortingParam));
      order = sorting.map(sort => [ sort.id, sort.desc ? 'DESC' : 'ASC' ]);
    } catch (error) {
      console.error(error);
    }
  }

  const condition = term ? {
    [Op.or]: searchFields.map(field => ({ [field]: { [Op.like]: `%${term}%` } })),
  } : {};

  return { page, pageSize, offset, condition, order };
}

export default usePagination;
