"use server";

import { User } from "@/Models/User";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import dbConnect from "@/lib/db";

export const register = async (formData: FormData) => {
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("필드값을 입력해주세요");
  }

  await dbConnect();

  // existing user check

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new Error("이미 등록된 사용자 입니다.");

  const hashedPassword = await hash(password, 12);

  await User.create({ firstName, lastName, email, password: hashedPassword });

  console.log("User created successfully 👍");
  redirect("/login");
};

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }

  redirect("/");
};

export const fetchAllUsers = async () => {
  await dbConnect();
  const users = await User.find({});
  return users;
};
