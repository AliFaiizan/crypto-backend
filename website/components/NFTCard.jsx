import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import images from '../assets';

const NFTCard = ({ nft }) => (
  <Link href={{ pathname: '/nfts/detail', query: nft }}>
    <div className=" flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-w-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md ">
      <div title="NFT" className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden ">
        <Image
          src={nft.image || images[`nft${nft.i}`]}
          alt={`nft${nft.i}`}
          fill
        />
      </div>
      <div className="mt-3 flex flex-col ">
        <p
          title="Nft Name"
          className="font-poppins text-color font-semibold minlg:text-xl text-sm"
        >
          {nft.name}
        </p>
        <div className="flexBetween mt-1 minlg:md-3 flex-row xs:flex-col xs:items-start xs:mt-3">
          <p
            title="Price"
            className="font-poppins text-color font-semibold minlg:text-lg text-xs"
          >
            {nft.price.toFixed(2)} <span className="normal">ETH</span>
          </p>
          <p
            title="owner"
            className="font-poppins text-color font-semibold text-xs minlg:text-lg"
          >
            {nft.seller}
          </p>
        </div>
      </div>
    </div>
  </Link>
);

export default NFTCard;

