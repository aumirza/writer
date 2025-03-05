import { z } from "zod";
import { zfd } from "zod-form-data";

export const loginSchema = zfd.formData({
  email: zfd.text(z.string()),
  password: zfd.text(z.string()),
});
