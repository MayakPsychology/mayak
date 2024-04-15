import PropTypes from 'prop-types';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import { useEffect, useRef } from 'react';

export { SwiperSlide as Slide } from 'swiper/react';

export function Slider({ swipeToIndex = 0, children, className, ...swiperProps }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current.swiper.slideTo(swipeToIndex);
  }, [swipeToIndex]);

  return (
    <Swiper {...swiperProps} wrapperClass={className} ref={swiperRef} cssMode>
      {children}
    </Swiper>
  );
}

Slider.propTypes = {
  swipeToIndex: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
  swiperProps: PropTypes.object,
};
