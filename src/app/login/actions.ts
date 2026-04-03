"use server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password")).trim();

  if (!email || !password) {
    return { error: "Enter email or password" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Uncorrect email or password" };
      }

      return { error: "Authorization  error" };
    }

    throw error;
  }
}
