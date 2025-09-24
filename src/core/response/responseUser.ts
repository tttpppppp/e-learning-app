export class ResponsePagination<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: T[];

  constructor(
    totalItems: number,
    totalPages: number,
    page: number,
    size: number,
    data: T[],
  ) {
    this.totalItems = totalItems;
    this.totalPages = totalPages;
    this.currentPage = page;
    this.pageSize = size;
    this.data = data;
  }
}
