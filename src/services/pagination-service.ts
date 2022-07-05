import { Request } from 'express';
import type PaginationDto from '../dtos/pagination-dto';

const PaginationService = {
  LIMIT: 10,

  getParams(req: Request) {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);

    return {
      page: isNaN(page) ? 1 : page,
      pageLimit: isNaN(limit) ? PaginationService.LIMIT : limit,
      pageOffset: (isNaN(page) || page <= 1) ? 0 : (page * limit) - limit,
    };
  },

  getResponse(
    currentPage: number, 
    pageLimit: number, 
    allPagesCount: number, 
    currentPageCount: number
  ): PaginationDto {
    const numberOfPages = Math.ceil(allPagesCount / pageLimit);

    const nextPage = currentPage + 1;
    const previousPage = currentPage - 1;

    return {
      pageLimit,
      currentPage,
      numberOfPages,
      allPagesCount,
      currentPageCount,
      nextPage: nextPage > numberOfPages ? null : nextPage,
      previousPage: previousPage < 1 ? null : previousPage,
    };
  },
};

export default PaginationService;
