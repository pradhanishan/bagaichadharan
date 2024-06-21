"use server";

import { z } from "zod";
import { RegisterSchema } from "@/schemas";

export async function Register(formData: z.infer<typeof RegisterSchema>) {
  console.log(formData);
}
