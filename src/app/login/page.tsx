"use client";

import { useForm, FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginAction, State } from "./actions";
import { loginSchema } from "@/schemas/loginSchema";

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [state, formAction] = useFormState<State, FormData>(loginAction, null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state?.status === "error") {
      if (state.errors) {
        state.errors.forEach((error) => {
          form.setError(error.path as FieldPath<z.infer<typeof loginSchema>>, {
            message: error.message,
          });
        });
      } else {
        form.setError("root", { message: state.message });
      }
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8 max-w-3xl mx-auto py-10">
        {form.formState.errors.root && (
          <div className="text-red-500">
            {form.formState.errors.root.message}
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={pending} type="submit">
          {pending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
