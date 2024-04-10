import { z } from "zod";

export const formFilterSchema = z.object({
  categories: z.array(z.string()),
});

export const formFilterCompanySchema = z.object({
  industry: z.array(z.string()),
});

export const formApplySchema = z.object({
  resume: z.any().refine((file: any) => file?.name, "Please upload Resume"),
  fullname: z
    .string({ required_error: "Fullname is required" })
    .min(5, { message: "Full name minimal 5 character" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "email not valid" }),
  phone: z.string().min(6, { message: "phone must have min 6 character" }),
  previousJobTitle: z.string(),
  linkedin: z.string(),
  portofolio: z.string(),
  coverLetter: z.string(),
});
