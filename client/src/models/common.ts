export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export namespace ResponseModel {
  export interface ResponseList<T> {
    data: T[];
    message?: string;
    // pagination: PaginationParams;
  }
  export interface ResponseObject<T> {
    data: T;
    message?: string;
    // pagination: PaginationParams;
  }
  export interface ResponseAny {
    data: any;
    message?: string;
    // pagination: PaginationParams;
  }
}


export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";

  [key: string]: any;
}
