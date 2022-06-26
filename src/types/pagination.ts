export type Pagination = {
  total: number;
  lastPage: number;
  perPage: number;
  currentPage: number | string;
  from: number;
  to: number;
};

export default Pagination;
