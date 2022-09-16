import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { ImSpinner5 } from "react-icons/im";
import { useEffect, useRef, useState } from "react";
import { IconButton, ScrollTo } from "../components";
import { throttle } from "../utils/throttle";
import { FaChevronUp } from "react-icons/fa";
import constant from "../constants/constant";

const defaultSrc = "/images/example.svg";
const siteURL = "https://github-cool-covers.vercel.app/";

const pickRandomPattern = () => {
  const patterns = constant.PATTERNS_AVALIABLE;
  const randomIndex = Math.floor(Math.random() * patterns.length);
  return patterns[randomIndex];
};

const pickRandomGoogleFontName = () => {
  // get all google fonts names
  const fonts = constant.GOOGLE_FONT_NAMES;

  const randomIndex = Math.floor(Math.random() * fonts.length);

  return fonts[randomIndex];
};

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [src, setSrc] = useState(defaultSrc);
  const [queryURL, setQueryURL] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  const onCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(queryURL);
    // change the copy button to a checkmark
    const ele = e.target as HTMLButtonElement;
    if (!ele) return;
    if (ele.innerText === "Copied") return;
    ele.innerText = "Copied";
    ele.classList.add("!bg-green-500");
    setTimeout(() => {
      ele.innerText = "Copy";
      ele.classList.remove("!bg-green-500");
    }, 4000);
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getImage = async (username: string) => {
    setIsLoading(true);
    try {
      const queryStr = `?username=${username}&text=Hi+I'm+@${username}&fontFamily=${pickRandomGoogleFontName()}&pattern=${pickRandomPattern()}&textFontSize=4.5rem&textWordSpacing=25px`;
      const image = await axios.get(`/api/get-cover${queryStr}`);
      const svgData = image.data;
      // to data url
      const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(
        svgData
      ).toString("base64")}`;
      setQueryURL(`${window.location.origin}/api/get-cover${queryStr}`);
      setSrc(svgDataUrl);
    } catch (error) {
      setSrc(defaultSrc);
    }
    setIsLoading(false);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    if (!username) return;
    await getImage(username);
  };

  useEffect(() => {
    const onThrottleCallback = (
      pageYOffset: number,
      nav: HTMLDivElement,
      btn: HTMLButtonElement
    ) => {
      let navOffsetTop = nav.offsetTop ?? 0;
      // let pageYOffset = window.pageYOffset ?? 0;
      if (pageYOffset > navOffsetTop) nav.classList.add("sticky");
      else nav.classList.remove("sticky");

      // back to top button
      if (!btn) return;
      if (pageYOffset > 300) btn.classList.add("floating-btn-show");
      else btn.classList.remove("floating-btn-show");
    };
    const onScroll = throttle(onThrottleCallback, 100);

    const onScrollHandler = (e: Event) => {
      if (!window || !navRef?.current || !backToTopRef?.current) return;
      onScroll(window.pageYOffset ?? 0, navRef.current, backToTopRef.current);
    };

    window.addEventListener("scroll", onScrollHandler);

    return () => {
      window.removeEventListener("scroll", onScrollHandler);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Cool Covers</title>
        <meta name="description" content="Generate cool covers for your GitHub profile.">
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteURL} />
        <meta property="og:title" content="Github Cool Covers" />
        <meta property="og:description" content="Generate cool covers for your GitHub profile." />
        <meta property="og:image" content="/screenshots/landingPage.png" />
        <meta property="twitter:card" content="Generate cool covers for your GitHub profile. Just enter your GitHub username and we'll generate a cool cover for you." />
        <meta property="twitter:url" content={siteURL} />
        <meta property="twitter:title" content="Github Cool Covers" />
        <meta property="twitter:description" content="Generate cool covers for your GitHub profile." />
        <meta property="twitter:image" content="/screenshots/landingPage.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        <script src="/scripts/wow.min.js/" defer />
        <script src="/scripts/main.min.js/" defer />
        <link rel="preload" as="image" href="/images/buymeacoffee.png" />
      </Head>

      <div className="">
        <div
          ref={navRef}
          className="ud-header absolute top-0 left-0 z-40 flex w-full items-center bg-transparent"
        >
          <div className="container">
            <div className="relative -mx-4 px-2 flex items-center justify-between">
              <Link href="/" passHref>
                <a className="mt-1">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    height={50}
                    width={50}
                    className="header-logo w-full"
                  />
                </a>
              </Link>
              <a
                href="https://github.com/uditkumar01/cool-covers"
                className="signUpBtn items-center flex gap-2 rounded-lg bg-white bg-opacity-20 py-2.5 sm:py-2 px-3 shadow-sm sm:px-6 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark"
              >
                <AiFillGithub size={22} />{" "}
                <span className="hidden sm:flex">Source Code</span>
              </a>
            </div>
          </div>
        </div>

        <div
          id="home"
          className="relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]"
        >
          <div className="container">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4">
                <div
                  className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
                  data-wow-delay=".2s"
                >
                  <h1 className="mb-8 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug">
                    GitHub Cool Covers
                  </h1>
                  <p className="mx-auto mb-10 max-w-[600px] text-base text-[#e4e4e4] sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed">
                    Generate cool covers for your GitHub profile. Just enter
                    your GitHub username and we{"'"}ll generate a cool cover for
                    you.
                  </p>
                  <div className="mb-10 flex gap-3 flex-wrap items-center justify-center">
                    <ScrollTo
                      scrollToId="generate-covers"
                      key={"scrollTo-get-started-btn"}
                    >
                      <button className="inline-flex items-center justify-center w-[217px] rounded-lg bg-white py-4 px-6 text-center text-base font-medium text-dark hover:text-primary hover:shadow-lg sm:px-10 hover:-translate-y-[2px] transition-all duration-300 ease-in-out">
                        Get Started
                      </button>
                    </ScrollTo>

                    <a
                      href="https://www.buymeacoffee.com/uditkumar01"
                      target="_blank"
                      rel="noreferrer"
                      className="relative h-[57px] w-[217px] bg-[#ffdd00] rounded-md overflow-hidden hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300 ease-in-out"
                    >
                      <Image
                        src="/images/buymeacoffee.png"
                        alt="Buy Me A Coffee"
                        layout="fill"
                        loading="eager"
                      />
                    </a>
                  </div>
                  <div
                    className="wow fadeInUp flex justify-center"
                    data-wow-delay=".3s"
                  >
                    <button
                      className="inline-flex items-center justify-center rounded-lg border-gray-400 border-dotted border-2 py-2 px-4 text-center text-base font-medium text-white hover:text-yellow-100 hover:shadow-lg sm:px-7 hover:-translate-y-[2px] transition-all duration-300 ease-in-out"
                      onClick={() => {
                        window?.open(
                          "https://github.com/uditkumar01/cool-covers",
                          "_blank"
                        );
                      }}
                    >
                      ⭐ Star on GitHub{" "}
                      <span className="pl-2">
                        <svg
                          width="20"
                          height="8"
                          viewBox="0 0 20 8"
                          className="fill-current"
                        >
                          <path d="M19.2188 2.90632L17.0625 0.343819C16.875 0.125069 16.5312 0.0938193 16.2812 0.281319C16.0625 0.468819 16.0312 0.812569 16.2188 1.06257L18.25 3.46882H0.9375C0.625 3.46882 0.375 3.71882 0.375 4.03132C0.375 4.34382 0.625 4.59382 0.9375 4.59382H18.25L16.2188 7.00007C16.0312 7.21882 16.0625 7.56257 16.2812 7.78132C16.375 7.87507 16.5 7.90632 16.625 7.90632C16.7812 7.90632 16.9375 7.84382 17.0312 7.71882L19.1875 5.15632C19.75 4.46882 19.75 3.53132 19.2188 2.90632Z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full px-4">
                <div
                  className="wow fadeInUp relative z-10 mx-auto max-w-[845px]"
                  data-wow-delay=".25s"
                >
                  <div className="mt-16">
                    <picture>
                      <source srcSet="/hero/hero-image.png" type="image/png" />
                      <img
                        src="/hero/hero-image.png"
                        alt="hero"
                        className="mx-auto max-w-full rounded-t-xl rounded-tr-xl"
                        loading="lazy"
                        draggable="false"
                      />
                    </picture>
                  </div>
                  <div className="absolute bottom-0 -left-9 z-[-1]">
                    <picture>
                      <source
                        srcSet="/images/pattern.svg"
                        type="image/svg+xml"
                      />
                      <img
                        src="/images/pattern.svg"
                        alt="css pattern"
                        draggable="false"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                  <div className="absolute -top-6 -right-6 z-[-1]">
                    <picture>
                      <source
                        srcSet="/images/pattern.svg"
                        type="image/svg+xml"
                      />
                      <img
                        src="/images/pattern.svg"
                        alt="css pattern"
                        draggable="false"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section
          id="about"
          className="bg-white pt-20 pb-20 lg:pt-[120px] lg:pb-[120px]"
        >
          <div className="container text-center" id="generate-covers">
            <h1 className="mb-4 text-3xl font-bold leading-snug text-black sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug">
              GitHub Cool Covers
            </h1>
            <p className="mx-auto mb-10 max-w-[600px] text-base text-gray-400 sm:text-md sm:leading-relaxed md:text-lg md:leading-relaxed">
              Generate cool covers for your GitHub profile. Just enter your
              GitHub username and we{"'"}ll generate a cool cover for you.
            </p>
            <div className="wow fadeInUp bg-white" data-wow-delay=".2s">
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                  <div className="flex flex-col items-center justify-between overflow-hidden border">
                    <form
                      className="flex flex-col md:flex-row justify-center gap-2 w-full py-12 px-7 sm:px-12 md:p-16 lg:max-w-[565px] lg:py-9 lg:px-16 xl:max-w-[640px] xl:p-[70px]"
                      onSubmit={onSubmitHandler}
                    >
                      <input
                        type="text"
                        name="username"
                        placeholder="Enter GitHub Username"
                        className="w-full sm:w-full md:w-full lg:w-full xl:w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 focus:shadow-outline scale-100 active:scale-[1.02] transition-all duration-200 ease-in-out"
                        required
                      />
                      <button
                        type="submit"
                        className={`inline-flex items-center justify-center rounded bg-primary py-3 px-6 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-lg scale-100 active:scale-95 ${
                          isLoading ? "animate-pulse" : ""
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <ImSpinner5 className="animate-spin mr-2" />
                            Generating...
                          </>
                        ) : (
                          "Generate"
                        )}
                      </button>
                    </form>
                    <div className="mb-1 sflex flex-col gap-20 items-center">
                      <div className="relative z-10 inline-block rounded-md lg:rounded-xl overflow-hidden mx-2">
                        <picture>
                          <source srcSet={src} type="image/svg+xml" />
                          <img
                            src={src}
                            alt="image"
                            className={`mx-auto lg:ml-auto ${
                              isLoading ? "animate-pulse" : ""
                            }`}
                            draggable="false"
                            loading="lazy"
                          />
                        </picture>
                      </div>
                      {queryURL && (
                        <div className="flex justify-center">
                          <div
                            className={`mt-10 mb-4 md:mb-12 relative bg-gray-200 flex items-center justify-between mx-2 py-2 px-4 pr-3 rounded-md transition-all duration-200 ease-in-out w-full max-w-[300px] sm:max-w-xs md:max-w-sm`}
                          >
                            <p className="text-ellipsis overflow-hidden whitespace-nowrap w-full max-w-[300px] sm:max-w-xs md:max-w-sm text-gray-400">
                              {queryURL}
                            </p>
                            <IconButton
                              className={
                                "!bg-primary hover:opacity-90 opacity-100 cursor-pointer !w-16 text-sm"
                              }
                              onClick={onCopy}
                            >
                              Copy
                            </IconButton>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 overflow-hidden bg-[#f3f4ff] pt-16 lg:pt-[80px]">
          <div className="mx-auto mb-[60px] max-w-[620px] text-center lg:mb-20">
            <span className="mb-2 block text-lg font-semibold text-primary"></span>
            <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[42px]">
              Want to know more?
            </h2>
            <p className="text-lg leading-relaxed text-body-color sm:text-xl sm:leading-relaxed px-2">
              Check out the GitHub Cool Covers documentation to explore more
              customization options and features.
            </p>

            <div className="w-full flex justify-center mt-10">
              <a
                href="https://github.com/uditkumar01/cool-covers"
                className="items-center flex gap-2 rounded-lg bg-primary py-2 px-6 text-base font-medium text-white duration-300 ease-in-out w-fit"
              >
                <AiFillGithub size={22} /> Go to GitHub
              </a>
            </div>
          </div>
        </section>

        <footer
          className="wow fadeIn flex gap-4 justify-center px-4 py-10 relative z-10 bg-black"
          data-wow-delay=".15s"
        >
          <IconButton
            onClick={() => {
              window.open("https://github.com/uditkumar01", "_blank");
            }}
          >
            <AiFillGithub size={22} />
          </IconButton>
          <IconButton
            className="hover:bg-[#1d9bf0]"
            onClick={() => {
              window.open("https://twitter.com/uditkumar_01", "_blank");
            }}
          >
            <AiFillTwitterCircle size={22} />
          </IconButton>
          <IconButton
            className="hover:bg-[#0a66c2]"
            onClick={() => {
              window.open("https://www.linkedin.com/in/uditkumar01", "_blank");
            }}
          >
            <AiFillLinkedin size={22} />
          </IconButton>
        </footer>

        <button
          ref={backToTopRef}
          className="back-to-top fixed bottom-8 flex right-8 left-auto z-[999] h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-dark"
          onClick={goToTop}
        >
          <FaChevronUp />
        </button>
      </div>
    </>
  );
};

export default Home;
