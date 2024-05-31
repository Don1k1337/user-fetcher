export interface GetUserParams {
  email: string;
  number: string;
}

export interface GetUserResponse {
  users: {
    email: string;
    number: string;
  }[];
}
