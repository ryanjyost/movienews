import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      style={{ backgroundColor: "#A9BCCF", fontFamily: "sans-serif" }}
    >
      <Head/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
