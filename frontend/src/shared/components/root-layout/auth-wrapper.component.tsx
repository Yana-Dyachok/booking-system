'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Toast } from '@/shared/ui/toast/toast.component';
import { Header } from '../header';
import { Footer } from '../footer';
import { useAuthStore } from '@/shared/store';

const publicRoutes = ['/login', '/register', '/not-found'];

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { authToken, lastVisitedPage, setLastVisitedPage } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const isPublic = publicRoutes.includes(pathname);
  const shouldHideHeaderAndFooter = isPublic;
  const shouldPreservePageParam =
    pathname.includes('appointment') || pathname.includes('business');

  useEffect(() => {
    if (!isPublic && authToken) {
      setLastVisitedPage(pathname);
    }
  }, [pathname, isPublic, authToken, setLastVisitedPage]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const page = searchParams.get('page') || '1';
    if (!authToken && !isPublic) {
      const newUrl = shouldPreservePageParam ? `/login?page=${page}` : '/login';
      router.replace(newUrl);
    } else if (authToken && isPublic) {
      const redirectTo = lastVisitedPage || '/';
      const newUrl = shouldPreservePageParam
        ? `${redirectTo}?page=${page}`
        : redirectTo;
      router.replace(newUrl);
    } else {
      setIsAuthChecked(true);
    }
  }, [
    pathname,
    authToken,
    isPublic,
    router,
    lastVisitedPage,
    searchParams,
    shouldPreservePageParam,
  ]);

  if (!isAuthChecked && !isPublic) return null;

  return (
    <>
      {!shouldHideHeaderAndFooter && <Header />}
      {children}
      <Toast />
      {!shouldHideHeaderAndFooter && <Footer />}
    </>
  );
}
