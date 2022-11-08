"use client"
import "../styles/globals.css"

import { QueryClient, QueryClientProvider } from "react-query"

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const queryClient = new QueryClient()
	return (
		<html>
			<head>
				<title>Github Followers</title>
			</head>
			<QueryClientProvider client={queryClient}>
				<body className="bg-black flex justify-center items-center w-screen h-screen">
					{children}
				</body>
			</QueryClientProvider>
		</html>
	)
}
