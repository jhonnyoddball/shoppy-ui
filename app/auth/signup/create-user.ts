"use server";

import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import { post } from "@/app/common/util/fetch";
import { redirect } from "next/navigation";

export default async function createUser(
  _prevState: FormResponse,
  formData: FormData
): Promise<FormResponse> {
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  // log without exposing the raw password
  console.log("Creating user with data:", { email, password: password ? "***" : "" });

  const { error } = await post("users", formData);
  if (error) {
    console.error("Error creating user:", error);
    return { error };
  }

  redirect('/auth/login');
}
