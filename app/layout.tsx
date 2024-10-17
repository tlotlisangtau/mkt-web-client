'use client';
import { SessionProvider } from 'next-auth/react';
import React, { Suspense } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>
          Classify a Classifieds Ads Category Responsive Web Template - Home{" "}
        </title>
      </head>
      <body>
        <Suspense fallback={<div>Loading redirect...</div>}>
          <SessionProvider>{children}</SessionProvider>
        </Suspense>
      </body>
    </html>
  );
}
