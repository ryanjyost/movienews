import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
let Parser = require("rss-parser");
let parser = new Parser();

const CORS_PROXY = "https://arcane-everglades-70095.herokuapp.com";

const youtubeRssUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=";
const feeds = {
  rogerebert: {
    title: "Roger Ebert",
    name: "RogerEbert.com",
    url: "https://www.rogerebert.com/feed/",
    link: "https://www.rogerebert.com",
  },
  movieCoverage: {
    title: "Movie Coverage",
    name: "Movie Coverage",
    channelId: "UCwYzZs_hwA6NdaQp6Hjhe5w",
  },
};

//

export default function Home() {
  const [feedItemsByKey, setFeedItemsByKey] = useState({});

  useEffect(() => {
    async function init() {
      // fetch(`${CORS_PROXY}/https://www.rogerebert.com/feed/`).then(
      //   async (res) => {
      //     console.log(await res.text());
      //   }
      // );

      for (const [key, feed] of Object.entries(feeds)) {
        const feedData = await parser.parseURL(
          CORS_PROXY +
            "/" +
            (feed.channelId ? `${youtubeRssUrl}${feed.channelId}` : feed.url)
        );

        setFeedItemsByKey((d) => ({
          ...d,
          [key]: feedData.items.map((item) => ({
            ...item,
            source: feed.name,
            sourceConfig: feed,
          })),
        }));
      }
    }

    init();
  }, []);

  const rowStyle = {
    display: "flex",
    width: "100%",
    overflowX: "scroll",
    backgroundColor: "#A9BCCF",
  };
  const twitterStyle = {
    width: "100%",
    minWidth: 400,
    height: 500,
    overflow: "auto",
    margin: 10,
    borderRadius: 8,
    border: "2px solid rgba(255, 255, 255, 0.4)",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  };

  const renderRssFeed = (key) => {
    const config = feeds[key];
    const items = feedItemsByKey[key];
    if (!items) return null;

    const itemHeight = 200;
    const imgWidth = itemHeight;

    return (
      <div
        style={{
          ...rowStyle,
          padding: 20,
          height: itemHeight * 2 + 100,
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        {items.map((item) => {
          const doc = new DOMParser().parseFromString(item.content, "text/xml");
          const img = doc?.querySelector("img");
          const src = img?.attributes?.src?.nodeValue;

          if (item.sourceConfig.channelId) {
            const link = item.link.replace("watch?v=", "embed/");
            return (
              <iframe
                height={itemHeight * 2}
                width={itemHeight * 2 * (16 / 9)}
                src={link}
                style={{ marginRight: 20 }}
              ></iframe>
            );
          }

          return (
            <a
              key={item.id}
              href={item.link}
              target={"_blank"}
              style={{
                display: "flex",
                flexDirection: "row",
                margin: 10,
                backgroundColor: "#ffffff",
                height: itemHeight,
                width: itemHeight * 3,
                borderRadius: 6,
              }}
            >
              {src ? (
                <img
                  src={src}
                  height={itemHeight}
                  width={imgWidth}
                  style={{
                    objectFit: "cover",
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                />
              ) : null}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    position: "absolute",
                    background:
                      "linear-gradient(to top, transparent, 60%, white)",
                    height: 30,
                    top: 0,
                    left: 0,
                    borderBottomRightRadius: 6,
                  }}
                />
                <div
                  style={{
                    padding: 20,
                    color: "rgba(0, 0, 0, 0.8)",
                    overflow: "scroll",
                    height: "100%",
                  }}
                >
                  <h3 style={{ marginBottom: 10 }}>{item.title}</h3>
                  <p
                    style={{
                      fontSize: 16,
                      color: "rgba(0, 0, 0, 0.6)",
                      display: "WebkitBox",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                  >
                    <b>{item.source}</b> | <i>{item.author}</i> |{" "}
                    {item.contentSnippet}
                  </p>
                </div>
                <div
                  style={{
                    width: "100%",
                    position: "absolute",
                    background:
                      "linear-gradient(to top, white, 60%, transparent)",
                    height: 30,
                    bottom: 0,
                    left: 0,
                    borderBottomRightRadius: 6,
                  }}
                />
              </div>
            </a>
          );
        })}
      </div>
    );
  };

  const renderVarietyTwitter = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/Variety?ref_src=twsrc%5Etfw"
        >
          Tweets by Variety
        </a>
      </div>
    );
  };

  const renderDeadlineTwitter = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/DEADLINE?ref_src=twsrc%5Etfw"
        >
          Tweets by DEADLINE
        </a>
      </div>
    );
  };

  const renderHollywoodReporterTwitter = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/THR?ref_src=twsrc%5Etfw"
        >
          Tweets by THR
        </a>
      </div>
    );
  };

  const renderIMDB = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/IMDb?ref_src=twsrc%5Etfw"
        >
          Tweets by IMDb
        </a>
      </div>
    );
  };

  const renderCollider = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/Collider?ref_src=twsrc%5Etfw"
        >
          Tweets by Collider
        </a>
      </div>
    );
  };

  const renderScreenrant = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/screenrant?ref_src=twsrc%5Etfw"
        >
          Tweets by screenrant
        </a>
      </div>
    );
  };

  const renderCinemaBlend = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/CinemaBlend?ref_src=twsrc%5Etfw"
        >
          Tweets by CinemaBlend
        </a>
      </div>
    );
  };

  const renderRottenTomatoes = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/RottenTomatoes?ref_src=twsrc%5Etfw"
        >
          Tweets by RottenTomatoes
        </a>
      </div>
    );
  };

  const renderMetacritic = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/metacritic?ref_src=twsrc%5Etfw"
        >
          Tweets by metacritic
        </a>
      </div>
    );
  };

  const renderNbc = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/NBCUniversal?ref_src=twsrc%5Etfw"
        >
          Tweets by NBCUniversal
        </a>
      </div>
    );
  };

  const renderParamount = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/paramountplus?ref_src=twsrc%5Etfw"
        >
          Tweets by paramountplus
        </a>
      </div>
    );
  };

  const renderWarner = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/wbpictures?ref_src=twsrc%5Etfw"
        >
          Tweets by wbpictures
        </a>
      </div>
    );
  };

  const renderDisney = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/DisneyStudios?ref_src=twsrc%5Etfw"
        >
          Tweets by DisneyStudios
        </a>
      </div>
    );
  };

  const renderSony = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/SonyPictures?ref_src=twsrc%5Etfw"
        >
          Tweets by SonyPictures
        </a>
      </div>
    );
  };

  const renderNetflix = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/netflix?ref_src=twsrc%5Etfw"
        >
          Tweets by netflix
        </a>
      </div>
    );
  };

  const renderHulu = () => {
    return (
      <div style={twitterStyle}>
        <a
          className="twitter-timeline"
          href="https://twitter.com/hulu?ref_src=twsrc%5Etfw"
        >
          Tweets by hulu
        </a>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Movie News Dashboard</title>
        <meta
          name="description"
          content="The most efficient way to keep up with film/tv news."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>
      </Head>
      <main
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <div style={rowStyle}>
          {renderDeadlineTwitter()}
          {renderVarietyTwitter()}
          {renderHollywoodReporterTwitter()}
          {renderIMDB()}
          {renderRottenTomatoes()}
          {renderCollider()}
          {renderScreenrant()}
          {renderCinemaBlend()}
          {renderMetacritic()}
        </div>
        {renderRssFeed("rogerebert")}
        {renderRssFeed("movieCoverage")}
        <div style={rowStyle}>
          {renderNetflix()}
          {renderHulu()}
          {renderDisney()}
          {renderWarner()}
          {renderNbc()}
          {renderParamount()}
          {renderSony()}
        </div>
        {/*<div style={rowStyle}>MOVIE and TV TRAILERS</div>*/}
        {/*<div style={rowStyle}>releases</div>*/}
        {/*<div style={rowStyle}> trades deals</div>*/}
      </main>
    </>
  );
}
