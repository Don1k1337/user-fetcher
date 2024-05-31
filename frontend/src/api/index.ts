import apiUserFetcherService from "../utils/services/api.service.ts";
import type { AxiosPromise } from "axios";
import { GetUserParams, GetUserResponse } from "../types/api/Users.ts";

export function getUserByNameEmail(
  params: GetUserParams,
): AxiosPromise<GetUserResponse> {
  return apiUserFetcherService({
    url: "/search",
    method: "get",
    params,
  });
}
