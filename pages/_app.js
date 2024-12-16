import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Christmas App</title>
        <meta name="description" content="A festive Christmas page" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
