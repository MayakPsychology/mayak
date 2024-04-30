import PropTypes from 'prop-types';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export { SwiperSlide as Slide } from 'swiper/react';

export const Slider = forwardRef(({ swipeToIndex = 0, children, className, ...swiperProps }, ref) => {
  const swiperRef = useRef(null);
  useImperativeHandle(ref, () => swiperRef.current.swiper, []);

  useEffect(() => {
    swiperRef.current.swiper.slideTo(swipeToIndex);
  }, [swipeToIndex]);

  return (
    <Swiper {...swiperProps} wrapperClass={className} ref={swiperRef}>
      {children}
    </Swiper>
  );
})

Slider.displayName = 'Slider';

Slider.propTypes = {
  swipeToIndex: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
  swiperProps: PropTypes.object,
};
