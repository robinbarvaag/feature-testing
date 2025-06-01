import "server-only";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { prisma } from "../client";
import type { User } from "../generated/client/index.js";

// Auth.js / NextAuth.js has built-in adapters for Prisma
// https://authjs.dev/reference/adapter/prisma

export async function getUser(email: string): Promise<User | null> {
  try {
    console.log("Getting user");
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    return await prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}
