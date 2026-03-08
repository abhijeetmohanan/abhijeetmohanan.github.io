import './globals.css';
import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';

const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira' });

export const metadata: Metadata = {
  title: 'Abhijeet Mohanan | DevOps Engineer',
  description: 'DevOps Engineer specializing in Kubernetes, Cloud Infrastructure, and CI/CD',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={firaCode.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-mono antialiased" suppressHydrationWarning>
        {children}
        <div className="fixed bottom-4 right-4 text-[10px] font-mono text-text-muted/50 uppercase tracking-widest pointer-events-none z-50">
          built by antigravity [ gemini 3 flash ]
        </div>
      </body>
    </html>
  );
}
