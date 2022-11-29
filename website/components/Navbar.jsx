import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import images from '../assets';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:w-dark bg-white dark:bg-w-black-1 w-grey-1">
      <div className="flex flex-1 flex-row justify-between">
        <Link href="/">
          <div className="flexCenter md:hidden cursor-pointer " onClick={() => {}}>
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="dark:text-white text-w-black-1 font-semibold text-lg ml-1">
              GrandMaster
            </p>
          </div>
        </Link>
        <Link href="/">
          <div className="hidden md:flex" onClick={() => {}}>
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
          </div>
        </Link>

        <div className="flex flex-initial flex-row justify-end">
          <div className="flex items-center mr-2">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              onChange={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
            />
            <label htmlFor="checkbox" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label">
              <i className="fas fa-sun" />
              <i className="fas fa-moon" />
              <div className="w-3 h-3 absolute bg-white rounded-full ball" />
            </label>
          </div>
        </div>

        <div>
          MENU ITEMS
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
