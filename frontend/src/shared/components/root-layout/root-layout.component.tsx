'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/shared/components/error-boundary/error-boundary';
import { Toast } from '@/shared/ui/toast/toast.component';

const queryClient = new QueryClient();

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        {children}
        <Toast />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
