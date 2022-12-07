
import React from 'react';
import Button from './Button';

const SignalCard = ({ signal }) => (
  <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-185 minmd:min-w-256 minlg:min-w-327 dark:bg-w-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md  relative">
    <div className="flex-row flexBetween">
      <div className=" mr-3 border dark:border-w-black-2 border-w-grey-1 p-1 rounded-lg">
        <p
          title="Created At"
          className="font-poppins text-color minlg:text-xl text-sm"
        >
          {signal.createdAt}
        </p>
      </div>
      <div className="border dark:border-w-black-2 border-w-grey-1  p-1 rounded-lg">
        <p
          title="Current price"
          className="font-poppins text-color minlg:text-xl text-sm  "
        >
          {signal.price}000000$
        </p>
      </div>
    </div>
    <div className="flex flex-col flexCenter mt-1">
      <img width={50} height={50} src={signal.icon} />
      <p className="font-poppins text-color font-semibold minlg:text-xl text-sm mt-3">
        {signal.name}
      </p>
    </div>

    <div className=" ">
      <p className=" buycolor font-poppins minlg:text-xl text-sm border dark:border-w-black-2 border-w-grey-1 mt-3 p-1 rounded-lg">
        buy : {signal.entry}$
      </p>
    </div>

    {signal.targets.map((target, index) => (
      <div className=" border dark:border-w-black-2 border-w-grey-1 mt-3 p-1 rounded-lg">
        <p className="buycolor  font-poppins minlg:text-xl text-sm  ">
          target {index + 1} : {target}$
        </p>
      </div>
    ))}
    <div className=" border dark:border-w-black-2 border-w-grey-1 mt-3 p-1 rounded-lg">
      <p className="sellcolor  font-poppins minlg:text-xl text-sm  ">
        stop : {signal.stop}$ - {signal.stop + 0.12}$
      </p>
    </div>
    <div className="flex w-full mt-5">
      <Button btnName="More Info" styles="w-full rounded-md" />
    </div>
  </div>
);

export default SignalCard;
