import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<div id="drawer"></div>
				<div id="backdrop-hook"></div>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
