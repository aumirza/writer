"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { loginSchema } from "@/schemas/loginSchema";
import { ZodError } from "zod";

export type State = {
  status: "success" | "error";
  message: string;
  errors?: Array<{
    path: string;
    message: string;
  }>;
} | null;

export async function loginAction(
  prevState: State | null,
  data: FormData
): Promise<State> {
  try {
    const validatedData = loginSchema.parse(data);
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(validatedData);

    if (error) {
      return {
        status: "error",
        message: "Could not authenticate. Please check your credentials.",
      };
    }

    revalidatePath("/");
    redirect("/admin");
  } catch (error) {
    // If it's a NEXT_REDIRECT error, rethrow it
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      String(error.digest).startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    if (error instanceof ZodError) {
      return {
        status: "error",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: `Server validation: ${issue.message}`,
        })),
        message: "Invalid form data",
      };
    }
    console.error(error);
  }

  return {
    status: "error",
    message: "Something went wrong",
  };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/login?m=could not signup");
  }

  revalidatePath("/");
  redirect("/");
}
