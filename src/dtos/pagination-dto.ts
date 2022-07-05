/*eslint-disable */
export default interface PaginationDto {
  previousPage: number | null;
  nextPage: number | null;
  pageLimit: number;
  currentPage: number;
  numberOfPages: number;
  currentPageCount: number;
  allPagesCount: number;
}
