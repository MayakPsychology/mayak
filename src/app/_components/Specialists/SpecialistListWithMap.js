'use client';

import React, { useEffect, useState } from 'react';
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
import Loading from '@/app/loading';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function SpecialistListWithMap({ mapMode, className }) {
  const searchParams = useSearchParams();
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const handleCardHover = id => {
    setHoveredCardId(id);
  };

  const handleCardLeave = () => {
    setHoveredCardId(null);
  };

  const cardStyle = 'max-w-[900px] rounded-3xl border-2 border-gray-200 px-4 py-5 lg:mx-auto h-full';

  const { data, isLoading, isSuccess } = usePaginatedEntries(searchParams);
  const totalCount = data?.pages?.length && data.pages[0].metaData?.totalCount;

  const [pointsList, setPointsList] = useState(null);

  useEffect(() => {
    const points = data?.pages[0]?.data
      ?.map(entry => {
        const entryData = entry.specialist ? entry.specialist : entry.organization;
        return entryData?.addresses ? addressesToPoints(entryData?.addresses) : undefined;
      })
      ?.reduce((acc, curr) => acc.concat(curr), []);
    setPointsList(points);
  }, [data]);

  if (isLoading) return <Loading />;

  const isNoMatches = !isLoading && (!data?.pages?.length || totalCount === 0);

  if (isNoMatches) return <NoMatches />;

  return (
    <div className={cn('p-0', className)}>
      {totalCount && (
        <p className="hidden font-bold uppercase text-primary-600 md:block">{`Знайдено: ${totalCount} ${getProperEnding(totalCount)}`}</p>
      )}
      <div className="mt-5 lg:grid lg:h-[900px] lg:grid-cols-5 lg:grid-rows-1 lg:gap-2">
        <div className="relative grid h-[500px] place-content-center overflow-hidden rounded-3xl lg:col-span-2 lg:col-start-4 lg:h-full">
          {pointsList && <Map points={pointsList} className="absolute bottom-0 left-0 top-0 w-full" />}
        </div>
        <div className="block lg:hidden">
          <Slider
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            breakpoints={{
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
            }}
            className="mb-10 mt-5 md:mb-12"
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
          <motion.ul className="hidden flex-col gap-4 overflow-scroll pr-5 lg:col-span-3 lg:row-start-1 lg:flex">
            {isSuccess &&
              data.pages?.map(page =>
                page.data?.map(entry => {
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
