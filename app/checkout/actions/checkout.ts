"use server"

import { post } from "@/app/common/util/fetch"

export default async function checkout(productId: number) {
  const response = await post('checkout/session', { productId });
  return response;
}
