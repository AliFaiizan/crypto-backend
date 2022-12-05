import React from 'react';
import Image from 'next/image';

import images from '../assets';

const CreatorCard = ({ rank, creatorName, creatorImage, creatorEths }) => (
  <div className="min-w-190 sm:w-10  minlg:min-2-240 dark:bg-w-black-3 bg-white border dark:border-w-black-3 border-w-grey-1 rounded-3xl flex flex-col p-4 m-4">
    <div className="w-8 h-8 minlg:w-10 minlg:h-10 rgradient flexCenter rounded-full">
      <p className="font-poppins font-semibold text-white min:lg:text-lg">
        {rank}
      </p>
    </div>

    <div className="my-2 flex justify-center">
      <div className="relative w-20 h-20 minlg:28 minlg:h-28">
        <Image
          src={creatorImage}
          alt="creator"
          fill
          className="rounded-full"
        />
        <div className="absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0">
          <Image
            src={images.tick}
            alt="tick"
            fill
            className="rounded-full"
          />
        </div>
      </div>
    </div>

    <p className="font-poppins font-semibold text-color text-center text-lg minlg:text-xl">
      {creatorName}
    </p>
    <p className="font-poppins font-semibold text-color text-center     text-lg minlg:text-xl mt-1">
      {creatorEths.toFixed(2)} <span className="font-normal">ETH</span>
    </p>
  </div>
);

export default CreatorCard;
