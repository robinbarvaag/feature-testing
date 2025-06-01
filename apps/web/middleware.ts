export { auth as middleware } from './app/(auth)/auth';

export const config = {
  matcher: ['/', '/:id', '/api/:path*', '/login', '/register'],
};
