import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Banner from '../components/Banner';
import CreatorCard from '../components/CreatorCard';
import images from '../assets';
import { makeId } from '../utils/makeId';

const Home = () => {
  const [hideButtons, setHideButtons] = useState(false);
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const theme = useTheme();

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 200;
    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;
    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };
  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => window.removeEventListener('resize', isScrollable);
  });

  return (
    <div className="flex justify-center sm:px-1 p-12">
      <div className="w-full md:w-4/5">
        <Banner
          name="Discover The Best Online Crypto Community"
          substyles="md:text-4xl sm:text-2xl sx:text-xl text-left"
          styles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        <div>
          <h1 className="font-poppins text-color text-2xl minlg:text-4xl font-semibold ml-4 sx:ml-0">
            Creators
          </h1>
          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <CreatorCard
                  key={`creator-card-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}`]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEths={10 - i * 0.5}
                />
              ))}
              {!hideButtons && (
              <>
                <div
                  onClick={() => handleScroll('left')}
                  className="absolute w-8 h-8 minlg:w-12 min:h-12 top-45 cursor-pointer left-0"
                >
                  <Image
                    src={images.left}
                    alt="lefticon"
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>
                <div
                  onClick={() => handleScroll('right')}
                  className="absolute w-8 h-8 minlg:w-12 min:h-12 top-45 cursor-pointer right-0"
                >
                  <Image
                    src={images.right}
                    alt="righticon"
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>
              </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
