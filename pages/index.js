import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const renderVarietyTwitter = () => {
    return (
      <>
        <a
          className="twitter-timeline"
          href="https://twitter.com/Variety?ref_src=twsrc%5Etfw"
        >
          Tweets by Variety
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>
      </>
    );
  };

  const renderDeadlineTwitter = () => {
    return (
      <>
        <a
          className="twitter-timeline"
          href="https://twitter.com/DEADLINE?ref_src=twsrc%5Etfw"
        >
          Tweets by DEADLINE
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Movie News Dashboard</title>
        <meta
          name="description"
          content="The most efficient way to keep up with film/tv industry news."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
}
