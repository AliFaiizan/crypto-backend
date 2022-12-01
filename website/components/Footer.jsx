import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import images from '../assets';
import { Button } from '.';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="flexCenter flex-col border-t dark:border-w-black-1 border-w-grey-1 sm:py-8 py-16">
      <div className="flexCenter w-full mt-5 border-t dark:border-w-black-1 border-w-grey-1 sm:px-4 px-16 ">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7 ">
          <p className="font-poppins dark:text-white text-w-black-1 font-semibold text-base">Dominion, Inc. All Right Reserved.</p>
          <div className="flex">
            {[images.twitter, images.discord, images.instagram, images.telegram].map((image, index) => (
              <div className="mx-2 cursor-pointer" key={index}>
                <Image
                  src={image}
                  width={20}
                  alt="social"
                  className={theme === 'light' && 'filter invert'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
