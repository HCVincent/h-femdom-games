import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name={process.env.NEXT_PUBLIC_JUICYADS_NAME}
          content={process.env.NEXT_PUBLIC_JUICYADS_CONTENT}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
