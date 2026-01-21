export interface Credito {
  id: number;
  numeroCredito: string;
  numeroNfse: string;
  valorCredito: number;
  valorUtilizado: number;
  valorDisponivel: number;
  dataCarga: string;
  dataConstituicao: string;
  valorIssqn: number;
  tipoCredito: string;
  simplesNacional: boolean;
  aliquota: number;
  valorFaturado: number;
  valorDeducao: number;
  baseCalculo: number;
}

export interface PageableInfo {
  pageNumber: number;
  pageSize: number;
  offset: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: PageableInfo;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}
