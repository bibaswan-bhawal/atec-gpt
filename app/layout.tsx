import type { Metadata } from 'next';

import { GeistSans } from 'geist/font/sans';

import './globals.css';

export const metadata: Metadata = {
	title: 'ATEC GPT',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={GeistSans.variable}>
			<body>{children}</body>
		</html>
	);
}
