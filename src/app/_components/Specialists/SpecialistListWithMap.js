'use client';

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { usePaginatedEntries } from '@hooks';
import { useSearchParams } from 'next/navigation';
import { Slide, Slider } from '@components/Slider';
import { Pagination } from 'swiper/modules';
import { LayoutGroup, motion } from 'framer-motion';
import { cn } from '@utils/cn';
import { MapLink } from '@components/MapLink';
import { ShortCardWrapper } from '@components/CardSpecialist/ShortCardWrapper';
import { getProperEnding } from '@components/Specialists/utils';
import { NoMatches } from '@components/Specialists/NoMatches';
import { addressesToPoints } from '@utils/common';
import { Map } from '@components/Map';
import { useMediaQuery } from '@mui/material';
import Loading from '@/app/loading';
import { screens } from '@/app/styles/tailwind/ui';
import { useWindowResize } from '@/app/_hooks/useWindowResize';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

const cardStyle = 'max-w-[900px] rounded-3xl border-2 border-gray-200 px-4 py-5 lg:mx-auto h-full';
const sliderBreakpoints = {
  360: {
    slidesPerView: 1,
    spaceBetween: 24,
  },
  640: {
    slidesPerView: 1.25,
    spaceBetween: 16,
  },
  768: {
    slidesPerView: 1.5,
    spaceBetween: 14,
  },
};

const getMappedPointsList = list =>
  list
    ?.map(entry => {
      const isOrganization = entry.organization;
      const entryData = isOrganization ? entry.organization : entry.specialist;
      // const addressPrimary = entryData.addresses[0];
      //
      // if (!addressPrimary) {
      //   return [];
      // }

      return addressesToPoints(entryData.addresses).map(address => ({
        ...address,
        specialistId: entryData.id,
      }));
    })
    ?.reduce((acc, curr) => acc.concat(curr), []);

export function SpecialistListWithMap({ mapMode, className }) {
  const searchParams = useSearchParams();
  const [pointsList, setPointsList] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [mapMarkerPopupOpen, setMapMarkerPopupOpen] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const [listItemHeightsList, setListItemHeightsList] = useState(null);

  const isLargeScreen = useMediaQuery(`(min-width: ${screens.lg})`);
  const { width: screenWidth } = useWindowResize();

  const slideTo = index => {
    if (swiper) swiper.slideTo(index);
  };

  const handleCardHover = id => {
    if (mapMarkerPopupOpen) return;
    setHoveredCardId(id);
  };

  const handleCardLeave = () => {
    if (mapMarkerPopupOpen) return;
    setHoveredCardId(null);
  };

  const { data, isLoading, isSuccess } = usePaginatedEntries(searchParams);
  const totalCount = data?.pages?.length && data.pages[0].metaData?.totalCount;

  useEffect(() => {
    const points = getMappedPointsList(data?.pages[0]?.data);
    setPointsList(points);
  }, [data]);

  const specialistCardsListRef = useRef(null);

  useEffect(() => {
    setHoveredCardId(null);

    if (specialistCardsListRef?.current) {
      specialistCardsListRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    const heights = specialistCardsListRef?.current
      ? Array.from(specialistCardsListRef?.current.children).map(child => ({
        id: child.getAttribute('id'),
        height: child.clientHeight,
      }))
      : [];
    setListItemHeightsList(heights);
  }, [screenWidth, data]);

  const handleActiveCard = specialistId => {
    setHoveredCardId(specialistId);
    setMapMarkerPopupOpen(!!specialistId);

    const selectedListItemIndex = listItemHeightsList?.findIndex(child => child.id === specialistId);

    if (!isLargeScreen && selectedListItemIndex !== -1) {
      slideTo(selectedListItemIndex);
    }

    const slicedList = listItemHeightsList.slice(0, selectedListItemIndex);
    const height = slicedList.length
      ? slicedList
        .slice(0, selectedListItemIndex)
        .map(child => child.height)
        .reduce((acc, cur) => cur + acc, 0)
      : 0;

    if (specialistId) {
      // gap is required to compensate the distance between card items
      const gap = 16;
      specialistCardsListRef.current.scrollTo({
        top: height + slicedList.length * gap,
        behavior: 'smooth',
      });
    }
  };

  const handleOnSLideChange = ({ activeIndex, slides }) => {
    const slideRef = slides[activeIndex];
    const specialistId = slideRef.getAttribute('id');
    setHoveredCardId(specialistId);
  };

  if (isLoading) return <Loading />;

  const isNoMatches = !isLoading && (!data?.pages?.length || totalCount === 0);

  if (isNoMatches) return <NoMatches />;

  return (
    <div className={cn('p-0', className)}>
      {totalCount && (
        <p className="hidden font-bold uppercase text-primary-600 md:block">{`Знайдено: ${totalCount} ${getProperEnding(totalCount)}`}</p>
      )}
      <div className="mt-5  lg:grid lg:h-[900px] lg:grid-cols-5 lg:grid-rows-1 lg:gap-2">
        <div className="relative grid h-[500px] place-content-center overflow-hidden rounded-xl lg:col-span-2 lg:col-start-4 lg:h-full lg:rounded-3xl">
          {pointsList && (
            <Map
              points={pointsList}
              setActiveSpecialist={handleActiveCard}
              activeSpecialistId={hoveredCardId}
              className="absolute bottom-0 left-0 top-0 w-full"
            />
          )}
        </div>
        <div className="block lg:hidden">
          <Slider
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            breakpoints={sliderBreakpoints}
            className="mb-10 mt-5 md:mb-12"
            onSwiper={setSwiper}
            onSlideChange={handleOnSLideChange}
          >
            {isSuccess &&
              data.pages?.map(page =>
                page.data?.map(entry => {
                  const type = entry.organizationId ? 'organization' : 'specialist';
                  const entryData = entry[type];
                  return (
                    <Slide id={entryData.id} key={entryData.id} className="!h-auto">
                      <ShortCardWrapper data={entryData} type={type} className={cardStyle} isHoveredOn={false} />
                    </Slide>
                  );
                }),
              )}
          </Slider>
        </div>

        <LayoutGroup>
          <motion.ul
            className="hidden flex-col gap-4 overflow-scroll pr-5 lg:col-span-3 lg:row-start-1 lg:flex"
            ref={specialistCardsListRef}
          >
            {isSuccess &&
              data.pages?.map(page =>
                page.data?.map((entry, index) => {
                  const type = entry.organizationId ? 'organization' : 'specialist';
                  const entryData = entry[type];

                  return (
                    <motion.li
                      layout="position"
                      transition={{ position: { duration: 0.6, type: 'spring' } }}
                      id={entryData.id}
                      key={entryData.id}
                      onMouseEnter={() => handleCardHover(entryData.id)}
                      onMouseLeave={handleCardLeave}
                      className={cn({ 'mb-[600px]': index === page.data.length - 1 })}
                    >
                      <ShortCardWrapper
                        data={entryData}
                        type={type}
                        className={cardStyle}
                        isHoveredOn={hoveredCardId === entryData.id}
                      />
                    </motion.li>
                  );
                }),
              )}
          </motion.ul>
        </LayoutGroup>
      </div>
      <MapLink mapMode={mapMode} className="sticky bottom-20 z-[25] mx-auto my-10 hidden max-w-max lg:block" />
    </div>
  );
}

SpecialistListWithMap.propTypes = {
  className: PropTypes.string,
  mapMode: PropTypes.bool,
};
