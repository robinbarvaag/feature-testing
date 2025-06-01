import { Container } from '@repo/ui/components/containers';
import { SiteFooter } from '@repo/ui/site-footer/site-footer';
import { SiteHeader } from '@repo/ui/site-header/site-header';

import { auth } from '../(auth)/auth';
import { UserButton } from '../(auth)/components/user-button';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader>{user && <UserButton user={user} />}</SiteHeader>
      <main className="flex flex-1 flex-col">
        <Container>{children}</Container>
      </main>
      <SiteFooter />
    </div>
  );
}
