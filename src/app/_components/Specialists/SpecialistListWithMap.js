'use client';

import React, { useState } from 'react';
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
import { NoInfoToShow } from '@components/NoInfoToShow';
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

  if (isLoading) return <Loading />;

  const isNoMatches = !isLoading && (!data?.pages?.length || totalCount === 0);

  if (isNoMatches)
    return (
      <div className="mt-4 flex flex-col gap-4 lg:mt-8 lg:gap-8">
        <div className="flex flex-col gap-2 text-p4 font-bold uppercase lg:flex-row lg:gap-1">
          <p className=" text-system-error">Результатів не Знайдено.</p>
          {searchParams.get('query')?.length > 0 && (
            <p className=" text-primary-600">Перевірте правильність написання запиту</p>
          )}
        </div>
        <NoInfoToShow text="збігів" />
      </div>
    );

  return (
    <div className={cn('p-0', className)}>
      {totalCount && (
        <p className="hidden font-bold uppercase text-primary-600 md:block">{`Знайдено: ${totalCount} ${getProperEnding(totalCount)}`}</p>
      )}
      <div className="mt-5 lg:grid lg:h-[750px] lg:grid-cols-5 lg:grid-rows-1 lg:gap-2">
        <div className="relative grid h-[500px] place-content-center rounded-3xl bg-primary-300 lg:col-span-2 lg:col-start-4 lg:h-full">
          <span>Map</span>
          <MapLink mapMode={mapMode} className="absolute bottom-auto left-3 top-3 translate-x-0" />
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
    </div>
  );
}

SpecialistListWithMap.propTypes = {
  className: PropTypes.string,
  mapMode: PropTypes.bool,
};
