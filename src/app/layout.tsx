import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Text Analyzer - Powered by Gemini & LangChain',
  description: 'Advanced AI-powered text analysis tool. Get instant sentiment analysis, topic extraction, and AI summaries. Built with Next.js 15, LangChain, and Google Gemini.',
  keywords: 'AI, text analysis, sentiment analysis, LangChain, Gemini, Next.js, automation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
