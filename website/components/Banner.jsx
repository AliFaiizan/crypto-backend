import React from 'react';
import { motion } from 'framer-motion';

const Banner = ({ name, styles, substyles }) => (
  <div
    className={`relative w-full flex items-center z-0 overflow-hidden gradient ${styles} `}
  >
    <p className={` ${substyles} font-bold text-5xl xs:text-xl font-poppins leading-70`}>
      {name}
    </p>
    <motion.div
      animate={{ x: [100, 50, -70, 100], y: [50, 100, 50], scale: 1 }}
      transition={{
        duration: 40,
        delay: 0.3,
        repeat: Infinity,
      }}
      initial={{ scale: 1 }}
      className="absolute w-48 h-48 sm:w-32 sm:-32 rounded-full white-bg -top-9 -left-16 "
    />
    <motion.div
      animate={{ x: [-100, 50, 80, -100], y: [50, -90, 120, 50] }}
      transition={{
        duration: 50,
        delay: 0.3,
        repeat: Infinity,
      }}
      className="absolute w-72 h-72 sm:w-32 sm:h-32 rounded-full white-bg -bottom-24 -right-16 "
    />
  </div>
);

export default Banner;
