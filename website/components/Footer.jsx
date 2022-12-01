import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import images from '../assets';
import Button from './Button';

const FooterLinks = ({ heading, items }) => (
  <div className="flex-1 justify-start items-start">
    <h3 className="font-poppins dark:text-white text-w-black-1 font-semibold text-xl mb-10">
      {heading}
    </h3>
    {items.map((item, index) => (
      <p
        key={index}
        className="font-poppins  dark:text-white text-w-black-1  font-normal text-base cursor-pointer dark:hover:text-secondary hover:text-secondary my-3  transition-all ease-in-out"
      >
        {item}
      </p>
    ))}
  </div>
);
const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="flexCenter flex-col border-t dark:border-w-black-1 border-w-grey-1 sm:py-8 py-16">
      <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image src={images.logo02} width={32} height={32} alt="logo" />
            <p className="dark:text-white text-w-black-1 font-semibold text-lg ml-1">
              DOMINION
            </p>
          </div>
          <p className="font-poppins dark:text-white text-w-black-1 font-semibold text-base mt-6">
            Get the latest Updates
          </p>
          <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-w-black-2 bg-white border dark:border-w-black-2 border-w-grey-2 rounded-md">
            <input
              type="email"
              placeholder="Your Email"
              className="h-full flex-1 w-full dark:bg-w-black-2 bg-white px-4 rounded-md dark:text-white text-w-black-1 font-normal text-xws minglg:text-lg outlint-none"
            />
            <Button
              btnName="Subscribe"
              styles="h-full px-4 rounded-md"
              onClick={() => {}}
            />
          </div>
        </div>
        {/* 2nd column */}
        <div className="flex flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
          <FooterLinks
            heading="Dominion"
            items={['Home', 'Education', 'Signals', 'Defi']}
          />
          <FooterLinks
            heading="Support"
            items={[
              'Terms of Service',
              'Legal',
              'Privacy Policy',
              'Contact Us',
            ]}
          />
        </div>
      </div>
      <div className="flexCenter w-full mt-5 border-t dark:border-w-black-1 border-w-grey-1 sm:px-4 px-16 ">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7 ">
          <p className="font-poppins dark:text-white text-w-black-1 font-semibold text-base">
            Dominion, Inc. All Right Reserved.
          </p>
          <div className="flex flex-row sm:mt-4">
            {[
              images.twitter,
              images.discord,
              images.instagram,
              images.telegram,
            ].map((image, index) => (
              <div
                className="mx-2 cursor-pointer"
                key={index}
              >
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
