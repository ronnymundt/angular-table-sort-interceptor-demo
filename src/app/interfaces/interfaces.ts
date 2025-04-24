export interface IReqresInDto {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUserData[];
  support: ISupport;
}

export interface IUserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ISupport {
  url: string;
  text: string;
}

