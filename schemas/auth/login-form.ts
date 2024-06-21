import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string({ message: "Invalid input." })
    .email({ message: "Email is required." })
    .min(3, { message: "Email is required." })
    .max(255, { message: "Email is too long." }),
  password: z
    .string({ message: "Invalid input." })
    .min(1, { message: "Password is required." })
    .max(40, { message: "Password is too long." }),
});

export { LoginSchema };
