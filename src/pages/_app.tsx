import Layout from "@/components/Layout/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { RecoilRoot, RecoilEnv } from "recoil";
import Head from "next/head";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState("dark");
  return (
    <>
      <Head>
        <meta
          name={process.env.NEXT_PUBLIC_JUICYADS_NAME}
          content={process.env.NEXT_PUBLIC_JUICYADS_CONTENT}
        />
      </Head>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  );
}

// @ts-ignore
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59"
  );

  return {
    props: {},
  };
}
