import CartContextProvider from "@/components/CartContext";
import GlobalStyle from "@/styles/GlobalStyle";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Layout from "./Layout";
import NextNProgress from "nextjs-progressbar";
// import { Metadata } from "next";
import { Roboto } from "next/font/google";
import Head from "next/head";
const metadata = {
  title: "Drum center",
  description:
    "Discover an extensive collection of high-quality drums, percussion instruments, and accessories for drummers of all skill levels. Whether you're a beginner or a seasoned pro, our wide range of products, including drum sets, cymbals, drumsticks, and more, will cater to your every need. Browse through our handpicked selection of top brands and find the perfect gear to enhance your rhythm and elevate your performance. Get ready to unleash your creativity and passion for music with [Your Drum Center Name]. Happy drumming!",
};
const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <HelmetProvider> */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" sizes="any" />
        {/* <title>Ramzi E-commerce</title> */}
      </Head>
      <GlobalStyle className={roboto.className} />
      <CartContextProvider>
        <Layout>
          <NextNProgress />
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
      {/* </HelmetProvider> */}
    </>
  );
}
