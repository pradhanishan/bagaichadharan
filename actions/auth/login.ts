"use server";

import { z } from "zod";
import { LoginSchema } from "@/schemas";

export async function login(formData: z.infer<typeof LoginSchema>) {
  console.log(formData);
}
