'use client';
// app/api/auth/error/page.tsx
import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>{error ? error : 'An unknown error occurred during authentication.'}</p>
    </div>
  );
}
