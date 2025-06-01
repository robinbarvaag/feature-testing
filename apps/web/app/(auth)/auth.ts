import { PrismaAdapter } from '@auth/prisma-adapter';
import type { User } from '@repo/db';
import { prisma } from '@repo/db';
import { compare } from 'bcrypt-ts';
import type { NextAuthConfig, Session } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface ExtendedSession extends Session {
  user: User;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/error',
    newUser: '/register',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = authFormSchema.safeParse(credentials);
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        const passwordsMatch = await compare(password, user.password!);

        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/', nextUrl as unknown as URL));
      }

      if (isOnRegister || isOnLogin) {
        return true;
      }

      if (isLoggedIn) return true;
      return false;
    },
  },
} satisfies NextAuthConfig);
