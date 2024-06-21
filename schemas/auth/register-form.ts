import { z } from "zod";

const RegisterSchema = z.object({
  name: z
    .string({ message: "Invalid input." })
    .min(1, { message: "Username is required." })
    .max(40, { message: "Username is too long." }),
  email: z
    .string({ message: "Invalid input." })
    .email({ message: "Email is required." })
    .min(3, { message: "Email is required." })
    .max(255, { message: "Email is too long." }),
  password: z
    .string({ message: "Invalid input." })
    .min(6, { message: "Password must have at least 6 characters." })
    .max(40, { message: "Password is too long." }),
});

export { RegisterSchema };
