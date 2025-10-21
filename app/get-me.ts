"use server"

import { get } from "./common/util/fetch";

export async function getMe() {
  return get("users/me");
}
