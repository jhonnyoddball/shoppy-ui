"use server";

import { revalidateTag } from "next/cache";
import { getHeaders, post } from "../../common/util/fetch";
import { API_URL } from "@/app/common/constants/api";

export default async function createProduct(
  formData: FormData
) {
  const response = await post("products", formData);
  const productImage = formData.get("image");
  // FormDataEntryValue can be string | File | null. Avoid using `instanceof File` on the server
  // because `File` is not defined in Node. Instead, ensure the entry is not a string and not null.
  if (response.data && productImage && typeof productImage !== 'string' && !response.error) {
    await uploadProductImage(response.data.id, productImage as Blob);
  }
  revalidateTag('products');
  return response;
}

async function uploadProductImage(productId: number, file: Blob) {
  const formData = new FormData();
  // If the blob has a name (File from browser), use it; otherwise provide a default filename
  const filename = (file as Blob & { name?: string }).name ?? `photo-${Date.now()}.jpg`;
  formData.append('image', file, filename);
  await fetch(`${API_URL}/products/${productId}/image`, {
    body: formData,
    method: "POST",
    headers: getHeaders(),
  });
}
