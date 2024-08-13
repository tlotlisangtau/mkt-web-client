
import Nav from '../components/Nav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Classify a Classifieds Ads Category Responsive Web Template - Home </title>
      </head>
      <body>{children}</body>
    </html>
  );
}
