'use client';

import { Suspense } from 'react';
import { AuthWrapper } from './auth-wrapper.component';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/shared/components/error-boundary/error-boundary';

const queryClient = new QueryClient();

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <AuthWrapper>{children}</AuthWrapper>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
