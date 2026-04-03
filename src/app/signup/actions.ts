"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignupState = { error?: string };

export async function signupAction(
  _prevState: SignupState | null,
  formData: FormData,
): Promise<SignupState> {
  const name = formData.get("name") as string | undefined;
  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password")).trim();

  if (!email) {
    return { error: "Enter email" };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Uncorrect email format" };
  }

  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    return { error: "Password must be at least 8 characters long" };
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return { error: "The email is already taken" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  redirect("/login");
}
