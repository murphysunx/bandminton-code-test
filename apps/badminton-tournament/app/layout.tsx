import Layout from '../core/layout';
import './global.css';
import { Providers } from './provider';

// export const metadata = {
//   title: 'Welcome to badminton-tournament',
//   description: 'Generated by create-nx-workspace',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
