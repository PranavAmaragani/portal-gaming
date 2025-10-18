"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";


const AnimatedButton = ({
  children,
  dark = false,
}: {
  children: string;
  dark?: boolean;
}) => {
  return (
    <motion.button
      initial="initial"
      whileHover="hovered"
      className={`flex items-center justify-between ${dark ? "bg-white" : "bg-[#FFF4F2]"
        } px-4 py-2 rounded-full w-fit gap-3 text-sm sm:text-base md:text-lg shadow-sm`}
    >
      {/* --- Animated Text --- */}
      <div className="relative overflow-hidden">
        <motion.span
          variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`block ${dark ? "text-black font-medium" : "text-black font-semibold"}`}
        >
          {children}
        </motion.span>
        <motion.span
          variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`absolute inset-0 block ${dark ? "text-black font-medium" : "text-black font-semibold"}`}
        >
          {children}
        </motion.span>
      </div>

      {/* --- Animated Arrow (circle is static, only arrow flips) --- */}
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black overflow-hidden">
        <div className="relative overflow-hidden">
          <motion.div
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <ArrowUpRight size={16} className="text-white" />
          </motion.div>
          <motion.div
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ArrowUpRight size={16} className="text-white" />
          </motion.div>
        </div>
      </span>
    </motion.button>
  );
};

const AnimatedGrid = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Trigger animation when visible
  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView]);

  // Animation variants for parent and children
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const iconTransition = {
    duration: 1.4,
    ease: "easeOut",
  };

  const delayUnit = 0.15;

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={controls}
      className="grid grid-cols-3 grid-rows-2 gap-2 w-60 sm:w-68 md:w-64 lg:w-[300px]"
    >
      <motion.div variants={item} className="col-span-2">
        <Image
          src="/signup.svg"
          alt="Sign up"
          width={120}
          height={120}
          className="rounded-xl w-full h-full object-cover"
        />
      </motion.div>

      <motion.div variants={item} className="col-span-1">
        <Image
          src="/success.svg"
          alt="Success"
          width={120}
          height={120}
          className="rounded-xl w-full h-full object-cover"
        />
      </motion.div>

      <motion.div variants={item} className="col-span-3">
        <Image
          src="/supertege.svg"
          alt="SuperTege"
          width={300}
          height={160}
          className="rounded-xl w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};


export default function Home() {
  const hexRef = useRef(null);
  const hexControls = useAnimation();
  const hexInView = useInView(hexRef, { once: true, margin: "-50px" });

  // Wallet grid animation refs
  const walletRef = useRef(null);
  const walletControls = useAnimation();
  const walletInView = useInView(walletRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (hexInView) hexControls.start("visible");
    if (walletInView) walletControls.start("visible");
  }, [hexInView, walletInView]);

  const images = [
    "/dog.avif",
    "/rooniverse.avif",
    "/spacenation.avif",
    "/lyux.avif",
    "/medieval.avif",
    "/parallel.avif",
    "/final.avif",
    "/conflict.avif",
  ];

  // Infinite scroll duplication logic
  useEffect(() => {
    const scrollers = document.querySelectorAll<HTMLElement>(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");

        const inner = scroller.querySelector(".scroller__inner");
        if (!inner) return;

        const children = Array.from(inner.children);
        children.forEach((child) => {
          const clone = child.cloneNode(true) as HTMLElement;
          clone.setAttribute("aria-hidden", "true");
          inner.appendChild(clone);
        });
      });
    }
  }, []);

  return (
    <div
      className="grid w-full gap-4 p-4
                 sm:grid-cols-1 sm:grid-rows-4
                 md:grid-cols-1 md:grid-rows-4
                 lg:grid-cols-2 lg:grid-rows-2"
    >
      {/* ================= FIRST CARD ================= */}
      <div className="h-[100vh] w-full bg-[#AE94FB] rounded-2xl p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-white text-lg sm:text-xl md:text-2xl lg:text-[30px] leading-[1.1]">
            The interoperable Hyperway
          </div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>

        {/* Hub + Pipes + Icons */}
        <div className="flex justify-center items-center flex-1">
          <div className="relative w-[350px] h-[320px]">
            {/* ===== BACKGROUND SQUARE CONNECTOR ===== */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <svg
                width="130%"
                height="130%"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute"
              >
                <rect
                  x="15"
                  y="15"
                  width="270"
                  height="270"
                  rx="20"
                  stroke="#BEABF7"
                  strokeWidth="4"
                  opacity="0.6"
                />
              </svg>
            </div>

            {/* ===== HUB ===== */}

            <div className="absolute w-28 h-28 border border-[#BEAAF7]/60 rounded-full flex items-center justify-center bg-[#AE94FB] z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 1280 }} // 3 full rotations (360 * 3)
                transition={{
                  duration: 1.5, // 3 seconds
                  ease: "easeInOut",
                  repeat: 0, // run once
                }}
              >
                <svg width="80" height="92" viewBox="0 0 80 92" fill="none">
                  <path
                    d="M39.5719 0.521484L39.5721 22.2974L60.2369 34.146L60.2269 57.6864L79.2164 46.7986L79.1706 23.2889L39.5719 0.521484Z"
                    fill="white"
                  />
                  <path
                    d="M0.0868852 23.2027L0.0302734 68.643L19.023 57.757L19.0228 34.06L39.555 22.2947L20.5653 11.4066L0.0868852 23.2027Z"
                    fill="white"
                  />
                  <path
                    d="M19.0222 57.7416L19.0224 79.5175L39.5466 91.231L79.2001 68.5614L60.2105 57.6733L39.5475 69.5185L19.0222 57.7416Z"
                    fill="white"
                  />
                </svg>
              </motion.div>
            </div>

            {/* ===== PIPES ===== */}
            {/* Top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <svg width="6" height="170" viewBox="0 0 6 160" fill="none">
                <line x1="3" y1="0" x2="3" y2="160" stroke="#BEABF7" strokeWidth="6" />
              </svg>
            </div>

            {/* Bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <svg width="6" height="170" viewBox="0 0 6 160" fill="none">
                <line x1="3" y1="0" x2="3" y2="160" stroke="#BEABF7" strokeWidth="6" />
              </svg>
            </div>

            {/* Top-Left */}
            <div className="absolute">
              <svg width="170" height="179" viewBox="-3 -3 123 79" fill="none">
                <path
                  d="M0.256836 0.624023H32.9614C42.6225 0.624023 50.4545 8.45596 50.4545 18.1171V55.3851C50.4545 65.0463 58.2864 72.8782 67.9476 72.8782H116.452"
                  stroke="#BEABF7"
                  strokeWidth="4.26"
                />
              </svg>
            </div>

            {/* Bottom-Left */}
            <div className="absolute bottom-0">
              <svg width="170" height="179" viewBox="-3 -3 123 79" fill="none">
                <path
                  d="M0.256836 72.7109H32.9614C42.6225 72.7109 50.4545 64.879 50.4545 55.2178V17.9499C50.4545 8.2887 58.2864 0.456772 67.9476 0.456772H116.452"
                  stroke="#BEABF7"
                  strokeWidth="4.26"
                />
              </svg>
            </div>

            {/* Top-Right */}
            <div className="absolute right-0">
              <svg width="170" height="179" viewBox="-3 -3 123 79" fill="none">
                <path
                  d="M116.591 0.624023H83.8863C74.2251 0.624023 66.3932 8.45596 66.3932 18.1171V55.3851C66.3932 65.0463 58.5613 72.8782 48.9001 72.8782H0.396072"
                  stroke="#BEABF7"
                  strokeWidth="4.26"
                />
              </svg>
            </div>

            {/* Bottom-Right */}
            <div className="absolute right-0 bottom-0">
              <svg width="170" height="179" viewBox="-3 -3 123 79" fill="none">
                <path
                  d="M116.591 72.7109H83.8863C74.2251 72.7109 66.3932 64.879 66.3932 55.2178V17.9499C66.3932 8.2887 58.5613 0.456772 48.9001 0.456772H0.396072"
                  stroke="#BEABF7"
                  strokeWidth="4.26"
                />
              </svg>
            </div>

            {/* ===== ICONS ===== */}
            {/* Top */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg width="57" height="56" viewBox="0 0 57 56" fill="none" id="svg-1161523131_1575">
                <path d="M28.3178 55.532C43.6245 55.532 56.033 43.1235 56.033 27.8168C56.033 12.5101 43.6245 0.101562 28.3178 0.101562C13.0111 0.101562 0.602539 12.5101 0.602539 27.8168C0.602539 43.1235 13.0111 55.532 28.3178 55.532Z" fill="#F7931A"></path>
                <path d="M40.7709 24.3874C41.3148 20.7567 38.5485 18.8045 34.7688 17.5019L35.9952 12.5824L33.002 11.8376L31.8067 16.6271C31.0203 16.4296 30.2131 16.246 29.4076 16.0624L30.6115 11.2417L27.6183 10.4951L26.3919 15.4128C25.7406 15.2639 25.0997 15.1184 24.4795 14.9625L24.483 14.9469L20.3534 13.9162L19.5566 17.1139C19.5566 17.1139 21.779 17.6231 21.7323 17.6543C22.9448 17.9574 23.1631 18.7595 23.1267 19.3969L21.7305 25.0006C21.8137 25.0214 21.9211 25.0525 22.0423 25.0993L21.7253 25.0214L19.7679 32.8717C19.619 33.2389 19.2431 33.7915 18.3943 33.5819C18.4255 33.6252 16.2187 33.0397 16.2187 33.0397L14.7324 36.466L18.6299 37.4378C19.3539 37.6197 20.0641 37.8102 20.7622 37.9886L19.5237 42.9635L22.5152 43.7084L23.7416 38.7889C24.5592 39.0089 25.3526 39.2133 26.1286 39.4073L24.9056 44.306L27.8989 45.0508L29.1374 40.0863C34.2439 41.0529 38.0825 40.6631 39.6987 36.0451C41.0013 32.3278 39.6346 30.1816 36.9479 28.7837C38.9053 28.3333 40.3777 27.0463 40.7709 24.3874ZM33.9287 33.9803C33.0054 37.6993 26.7435 35.6883 24.7134 35.1842L26.359 28.5932C28.3891 29.1007 34.897 30.1036 33.9287 33.9803ZM34.8554 24.3337C34.0118 27.7167 28.8014 25.9966 27.1125 25.5757L28.6022 19.5996C30.2911 20.0205 35.7354 20.8052 34.8554 24.3337Z" fill="white"></path>
              </svg>
            </div>
            {/* Bottom */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 translate-y-1/2">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" id="svg-1285744891_2642">
                <g clipPath="url(#svg-1285744891_2642_clip0_1656_54025)">
                  <path d="M28.0023 55.6756C43.3613 55.6756 55.7176 43.3193 55.7176 27.9604C55.7176 12.6014 43.3613 0.245117 28.0023 0.245117C12.6434 0.245117 0.287109 12.6014 0.287109 27.9604C0.287109 43.3193 12.6434 55.6756 28.0023 55.6756Z" fill="#2775CA"></path>
                  <path d="M22.1135 44.4732C13.106 41.24 8.48673 31.1932 11.8358 22.301C13.568 17.4509 17.3789 13.7556 22.1135 12.0234C22.5755 11.7925 22.8064 11.4461 22.8064 10.8685V9.25187C22.8064 8.78986 22.5755 8.44342 22.1135 8.32812C21.9979 8.32812 21.767 8.32812 21.6515 8.44342C10.6809 11.9078 4.67588 23.5715 8.14029 34.542C10.2189 41.0088 15.1847 45.9746 21.6515 48.0532C22.1135 48.2841 22.5755 48.0532 22.6908 47.5912C22.8064 47.4759 22.8064 47.3603 22.8064 47.1295V45.5125C22.8064 45.1661 22.4599 44.7044 22.1135 44.4732ZM34.3545 8.44342C33.8925 8.21255 33.4304 8.44342 33.3151 8.90543C33.1996 9.02101 33.1996 9.1363 33.1996 9.36745V10.9841C33.1996 11.4461 33.546 11.9078 33.8924 12.139C42.8999 15.3722 47.5192 25.419 44.1701 34.3112C42.4379 39.1613 38.627 42.8566 33.8924 44.5888C33.4304 44.8197 33.1996 45.1661 33.1996 45.7437V47.3603C33.1996 47.8223 33.4304 48.1688 33.8924 48.2841C34.008 48.2841 34.2389 48.2841 34.3545 48.1688C45.325 44.7044 51.33 33.0407 47.8656 22.0702C45.787 15.4878 40.7057 10.5221 34.3545 8.44342Z" fill="white"></path>
                  <path d="M35.6246 32.3489C35.6246 28.3072 33.1996 26.9214 28.3494 26.3441C24.885 25.8821 24.1921 24.9583 24.1921 23.3414C24.1921 21.7245 25.347 20.6855 27.6565 20.6855C29.7351 20.6855 30.89 21.3784 31.4674 23.1106C31.5829 23.457 31.9294 23.6879 32.2758 23.6879H34.1233C34.5853 23.6879 34.9318 23.3414 34.9318 22.8797V22.7641C34.4697 20.2235 32.3911 18.2604 29.7351 18.0295V15.258C29.7351 14.796 29.3887 14.4496 28.8114 14.334H27.0792C26.6172 14.334 26.2707 14.6804 26.1552 15.258V17.914C22.6908 18.376 20.4968 20.6855 20.4968 23.5726C20.4968 27.3834 22.8063 28.8845 27.6565 29.4621C30.89 30.0394 31.9294 30.7323 31.9294 32.58C31.9294 34.4278 30.3125 35.698 28.1185 35.698C25.1159 35.698 24.0765 34.4275 23.7301 32.6953C23.6148 32.2336 23.2684 32.0024 22.9219 32.0024H20.9586C20.4968 32.0024 20.1504 32.3489 20.1504 32.8109V32.9265C20.6121 35.8133 22.4599 37.8919 26.2707 38.4695V41.241C26.2707 41.7028 26.6172 42.0492 27.1945 42.1648H28.9267C29.3887 42.1648 29.7351 41.8183 29.8507 41.241V38.4695C33.3151 37.8919 35.6246 35.4668 35.6246 32.3489Z" fill="white"></path>
                </g>
                <defs>
                  <clipPath id="svg-1285744891_2642_clip0_1656_54025">
                    <rect width="55.4305" height="55.4305" fill="white" transform="translate(0.287109 0.245117)"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            {/* Left-Top */}
            <div className="absolute left-0 top-[15%] -translate-x-1/2 -translate-y-1/2">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" id="svg-71927325_924">
                <path d="M28.1889 55.7996C43.4956 55.7996 55.9041 43.3911 55.9041 28.0844C55.9041 12.7777 43.4956 0.369141 28.1889 0.369141C12.8822 0.369141 0.473633 12.7777 0.473633 28.0844C0.473633 43.3911 12.8822 55.7996 28.1889 55.7996Z" fill="#627EEA"></path>
                <path d="M29.0518 7.29785V22.6625L42.0381 28.4654L29.0518 7.29785Z" fill="white" fillOpacity="0.602"></path>
                <path d="M29.0515 7.29785L16.0635 28.4654L29.0515 22.6625V7.29785Z" fill="white"></path>
                <path d="M29.0518 38.4223V48.8623L42.0467 30.8838L29.0518 38.4223Z" fill="white" fillOpacity="0.602"></path>
                <path d="M29.0515 48.8623V38.4206L16.0635 30.8838L29.0515 48.8623Z" fill="white"></path>
                <path d="M29.0518 36.0057L42.0381 28.4654L29.0518 22.666V36.0057Z" fill="white" fillOpacity="0.2"></path>
                <path d="M16.0635 28.4654L29.0515 36.0057V22.666L16.0635 28.4654Z" fill="white" fillOpacity="0.602"></path>
              </svg>
            </div>
            {/* Left-Bottom */}
            <div className="absolute left-0 bottom-[15%] -translate-x-1/2 translate-y-1/2">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" id="svg-336209360_924">
                <path d="M27.8734 55.4305C43.1801 55.4305 55.5887 43.0219 55.5887 27.7152C55.5887 12.4085 43.1801 0 27.8734 0C12.5667 0 0.158203 12.4085 0.158203 27.7152C0.158203 43.0219 12.5667 55.4305 27.8734 55.4305Z" fill="#F3BA2F"></path>
                <path d="M21.1459 24.951L27.8738 18.2231L34.6051 24.9544L38.5199 21.0397L27.8738 10.3936L17.2311 21.0362L21.1459 24.951ZM10.5518 27.7156L14.4665 23.8008L18.3813 27.7156L14.4665 31.6304L10.5518 27.7156ZM21.1459 30.4802L27.8738 37.208L34.6051 30.4767L38.5199 34.3897L27.8738 45.0376L17.2311 34.3949L17.2259 34.3897L21.1459 30.4802ZM37.3662 27.7156L41.281 23.8008L45.1958 27.7156L41.281 31.6304L37.3662 27.7156ZM31.844 27.7121H31.8474V27.7156L27.8738 31.6892L23.9053 27.7225L23.8984 27.7156L23.9053 27.7104L24.5999 27.014L24.9377 26.6763L27.8738 23.7419L31.8457 27.7138L31.844 27.7121Z" fill="white"></path>
              </svg>
            </div>
            {/* Right-Top */}
            <div className="absolute right-0 top-[15%] translate-x-1/2 -translate-y-1/2">
              <Image src="/blue-white.png" alt="right-top" width={56} height={56} />
            </div>
            {/* Right-Bottom */}
            <div className="absolute right-0 bottom-[15%] translate-x-1/2 translate-y-1/2">
              <Image src="/three-blue.png" alt="right-bottom" width={56} height={56} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div>
          <AnimatedButton>Find out more</AnimatedButton>
        </div>
      </div>





      {/* ================= SECOND CARD (INFINITE SCROLLER) ================= */}
      <div className="h-[100vh] w-full bg-[#FF7557] rounded-2xl p-6 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-[30px] leading-[1.1]">
            Explore the best of Web3
          </h2>
          <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>

        {/* Infinite Scroller */}
        <div
          className="scroller flex-1 flex items-center"
          data-direction="left"
          data-speed="fast"
        >
          <div className="scroller__inner flex gap-4">
            {images.map((src, idx) => (
              <div
                key={idx}
                className="relative w-[200px] h-[300px] shrink-0 rounded-xl overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`slide-${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div>
          <AnimatedButton>Discover</AnimatedButton>
        </div>
      </div>


      {/* third (hexagon) */}
      <div className="h-[100vh] w-full bg-[#90B7CB] rounded-2xl flex flex-col justify-between p-6">
        {/* Top row */}
        <div className="flex justify-between items-center">
          <div className="text-white text-lg sm:text-xl md:text-2xl lg:text-[30px] font-semibold leading-[1.1] max-w-[80%]">
            Distribution to millions of esports superfans
          </div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>

        {/* Hexagon with overlay avatars */}

        <div className="flex justify-center items-center">
          <motion.div
            ref={hexRef}
            variants={fadeUp}
            initial="hidden"
            animate={hexControls}
            className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]"
          >
            <svg width="0" height="0">
              <clipPath id="roundedHex" clipPathUnits="objectBoundingBox">
                <path d="M0.539 0.196a0.08 0.08 0 0 0-0.078 0L0.258 0.314A0.08 0.08 0 0 0 0.216 0.386v0.234a0.08 0.08 0 0 0 0.042 0.072l0.203 0.117a0.08 0.08 0 0 0 0.078 0l0.203-0.117a0.08 0.08 0 0 0 0.042-0.072V0.386a0.08 0.08 0 0 0-0.042-0.072L0.539 0.196Z" />
              </clipPath>
            </svg>
            <Image
  src="/dog.avif"
  alt="dog"
  fill
  className="object-cover"
  style={{ clipPath: "url(#roundedHex)" }}
/>


            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-[17%] left-[17%] lg:top-[30%] lg:left-[15%] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
              <Image src="/robot.avif" alt="robot" fill className="object-cover" />
            </div>
            <div className="absolute translate-x-1/2 translate-y-1/2 bottom-[17%] right-[17%] lg:bottom-[30%] lg:right-[15%] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
              <Image src="/boy.avif" alt="boy" fill className="object-cover" />
            </div>
          </motion.div>
        </div>

        {/* CTA button */}
        <div>
          <AnimatedButton>Portal Esports</AnimatedButton>
        </div>
      </div>




      {/* fourth (wallet grid) */}
      <div className="h-[100vh] w-full bg-[#F6F6F6] rounded-2xl flex flex-col p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-black text-lg sm:text-xl md:text-2xl lg:text-[28px] font-semibold leading-[1.1] max-w-[70%]">
            Seamless wallet for billions of users
          </h2>
          <div className="h-2 w-2 rounded-full bg-black"></div>
        </div>

        <div className="flex flex-1 justify-center items-center">
          <AnimatedGrid />
        </div>

        <div>
          <AnimatedButton>Find out more</AnimatedButton>
        </div>
      </div>
    </div>
  );
}
