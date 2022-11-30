import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import images from '../assets';
import Button from './Button';

const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0: return '/';
      case 1: return '/nfts/create';
      case 2: return '/nfts/detail';
      default: return '/';
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && 'flex-col h-full'
      }`}
    >
      {['Home', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-w-dark mx-3 ${active === item
            ? 'dark:text-white text-w-black-1'
            : 'dark:text-w-grey-3 text-w-grey-2'} `}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  const hasConnected = true;
  return hasConnected ? (
    <Button
      btnName="Create"
      styles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');
        router.push('/nfts/create');
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      styles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');
      }}
    />
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('Home');
  const router = useRouter();
  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b  dark:w-dark bg-white dark:bg-w-black-1 w-grey-1">
      <div className="flex flex-1 flex-row justify-Start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer "
            onClick={() => {}}
          >
            <Image
              src={images.logo02}
              width={32}
              height={32}
              alt="logo"
            />
            <p className="dark:text-white text-w-black-1 font-semibold text-lg ml-1">
              DOMINION
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
      </div>
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
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>
        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} />
          <div className="ml-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
