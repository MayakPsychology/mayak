'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
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

export function SpecialistListWithMap({ mapMode, className }) {
  const searchParams = useSearchParams();
  const [pointsList, setPointsList] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [mapMarkerPopupOpen, setMapMarkerPopupOpen] = useState(null);
  const isLargeScreen = useMediaQuery(`(min-width: ${screens.lg})`);
  const [swiper, setSwiper] = useState(null);

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

  // const handleSwiperOnSlideChange = i => {
  //   if (pointsList) {
  //     const { specialistId } = pointsList.filter((point, index) => index === i)[0];
  //     setHoveredCardId(specialistId);
  //   }
  // };

  const { data, isLoading, isSuccess } = usePaginatedEntries(searchParams);
  const totalCount = data?.pages?.length && data.pages[0].metaData?.totalCount;

  useEffect(() => {
    const points = data?.pages[0]?.data
      ?.map(entry => {
        const isOrganization = entry.organization;
        const entryData = isOrganization ? entry.organization : entry.specialist;
        const addressPrimary = entryData.addresses[0];

        if (!addressPrimary) {
          return [];
        }

        return addressesToPoints([addressPrimary]).map(address => ({
          ...address,
          specialistId: entryData.id,
        }));
      })
      ?.reduce((acc, curr) => acc.concat(curr), []);

    setPointsList(points);
  }, [data]);

  const ulRef = useRef(null);

  const cashedLiItemHeightsList = useMemo(() => {
    if (ulRef?.current) {
      return Array.from(ulRef?.current.children).map(child => ({
        id: child.getAttribute('id'),
        height: child.clientHeight,
      }));
    }

    return [];
  }, [ulRef?.current, data]);

  const handleActiveCard = specialistId => {
    setHoveredCardId(specialistId);
    setMapMarkerPopupOpen(!!specialistId);

    const selectedLiIndex = cashedLiItemHeightsList?.findIndex(child => child.id === specialistId);

    if (!isLargeScreen && selectedLiIndex !== -1) {
      slideTo(selectedLiIndex);
    }
    const slicedList = cashedLiItemHeightsList.slice(0, selectedLiIndex);
    const height = slicedList.length
      ? slicedList
        .slice(0, selectedLiIndex)
        .map(child => child.height)
        .reduce((acc, cur) => cur + acc, 0)
      : 0;

    if (specialistId) {
      // gap is required to compensate the distance between card items
      const gap = 16;
      ulRef.current.scrollTo({
        top: height + slicedList.length * gap,
        behavior: 'smooth',
      });
    }
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
            onSlideChange={swiperCore => {
              const { activeIndex } = swiperCore;
              const slideRef = swiperCore.slides[activeIndex];
              const specialistId = slideRef.getAttribute('id');
              setHoveredCardId(specialistId);
            }}
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
            ref={ulRef}
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
                      className={cn({ 'mb-[500px]': index === page.data.length - 1 })}
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
