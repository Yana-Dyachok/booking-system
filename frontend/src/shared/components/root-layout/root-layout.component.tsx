'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/shared/components/error-boundary/error-boundary';
import { Toast } from '@/shared/ui/toast/toast.component';
import { Header } from '../header';
import { Footer } from '../footer';
import { useAuthStore } from '@/shared/store';

const queryClient = new QueryClient();
const publicRoutes = ['/login', '/register', '/not-found'];

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const authToken = useAuthStore((state) => state.authToken);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const isPublic = publicRoutes.includes(pathname);
  const shouldHideHeaderAndFooter = isPublic;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!authToken && !isPublic) {
      router.replace('/login');
    } else if (authToken && isPublic) {
      router.replace('/');
    } else {
      setIsAuthChecked(true);
    }
  }, [pathname, authToken, isPublic, router]);

  if (!isAuthChecked && !isPublic) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        {!shouldHideHeaderAndFooter && <Header />}
        {children}
        {!shouldHideHeaderAndFooter && <Footer />}
        <Toast />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
